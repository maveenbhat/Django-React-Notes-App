from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer


def getNotesList(request):
    notes = Note.objects.all().order_by('-updated')  # query method
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


def getNoteDetail(request, pk):
    notes = Note.objects.get(id=pk)  # query method
    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)


def createNote(request):
    data = request.data
    note = Note.objects.create(
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)


def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    # whatever new data we send in its gonna save it
    serializer = NoteSerializer(instance=note, data=data)
    if serializer.is_valid():  # we are throwing in the new values in the serializer
        serializer.save()  # and we are saving them

    return Response(serializer.data)


def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()

    return Response('Note was deleted!')
