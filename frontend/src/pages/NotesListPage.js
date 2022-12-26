import React, { useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'


const NotesListPage = () => {

  let [notes, setNotes] = useState([]) // Initial state of this component page - this stat which can access by notes

  useEffect(() => {

    getNotes()

  }, [])

  let getNotes = async () => {
    let response = await fetch('/api/notes/') // get the notes 
    let data = await response.json() // convert the response to json and store in data
    setNotes(data) // update the state
  }

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => ( // looping through all notes 
          <ListItem key={index} note={note} />
        ))}

      </div>
      <AddButton />
    </div>
  )
}

export default NotesListPage