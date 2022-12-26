import React, { useState, useEffect } from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = ({ match, history }) => {

    let noteId = match.params.id //This is gonna give us the note id

    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()

    }, [noteId])

    let getNote = async () => { // this is gonna call the db
        if (noteId === 'new') return

        let response = await fetch(`/api/notes/${noteId}/`) // we are getting the note id from url and then making the request
        let data = await response.json()
        setNote(data) // updating the state
    }
    let createNote = async () => {
        fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })

    }

    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })

    }

    let deleteNote = async () => {
        fetch(`/api/notes/${noteId}/`, {
            method: "DELETE",
            'headers': {
                'Content-Type': 'application/json'
            }
        })

        history.push('/')
    }

    let handleSubmit = () => {
        if (noteId !== 'new' && note.body === '') {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId === 'new' && note.body !== null) {
            createNote()
        }
        history.push('/')
    }

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }))


    }

    return (
        <div className="note">
            <div className="note-header">

                <h3 onClick={handleSubmit}><ArrowLeft /></h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit} >Done</button>
                )}



            </div>
            {/* onChange: as every change we are calling the onChange method and we are updating the state */}
            <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
        </div >
    )
}

export default NotePage