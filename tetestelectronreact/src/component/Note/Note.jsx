import React, { useState, useEffect } from 'react';

const isElectron = window && window.process && window.process.type;
let ipcRenderer;

if (isElectron) {
  ipcRenderer = window.require('electron').ipcRenderer;
}

const Note = () => {
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');

  const [savedNotes, setSavedNotes] = useState([{title : "rere", content : "content"}]);
  const [error, setError] = useState(null);

   useEffect(() =>{
    const getSavedNotes = async () => {
      try {
       const notes = await window.data.read();
       console.log(notes);
       setSavedNotes(notes)
      } catch (err) {
        setError(err);
      }
    };

    getSavedNotes();

    // Cleanup event listeners when the component is unmounted
    
  }, []); 
  const handleNoteChange = (event) => {
    setNoteContent(event.target.value);
  };

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  
  const handleSaveNote = () => {
    try {
      if (ipcRenderer && noteContent.trim() !== '') {
        ipcRenderer.send('save-note', noteContent);
        setNoteContent('')
      }
      setNoteContent('')
      setNoteTitle('')
      setSavedNotes( savedNotes.concat({content : noteContent, title : noteTitle}));

    } catch (err) {
      setError(err);
    }
  };

  const saveNotesFile = async ()  =>{
    await window.data.write(savedNotes);
    await window.notif.send();
    console.log("save file");
  } 

  return (
    <div>
      <h2>Notes</h2>
      <textarea
        rows="4"
        cols="50"
        value={noteContent}
        onChange={handleNoteChange}
        placeholder="Write your note here..."
      />
      <textarea
        rows="4"
        cols="50"
        value={noteTitle}
        onChange={handleTitleChange}
        placeholder="Write your note here..."
      />
      <br />
      <button onClick={handleSaveNote}>Add Note</button>
      <button onClick={saveNotesFile}>Save Note in file </button>

      {error && <div>Error: {error.message}</div>}

      <div>
        <h3>Saved Notes</h3>
        <ul>
          {savedNotes.map((note, index) => (
            <div key={index}> 
            <h2>Content {note.content}</h2>
            <h3>Titre {note.title} </h3>
              </div> 
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Note;