import React, { useState, useEffect } from 'react';
import './Note.css'


const Note = () => {
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');

  const [savedNotes, setSavedNotes] = useState([{title : "rere", content : "content"}]);

   useEffect(() =>{
    const getSavedNotes = async () => {

       const notes = await window.data.read();
       setSavedNotes(notes)
     
    };

    getSavedNotes();
    
  }, []); 
  const handleNoteChange = (event) => {
    setNoteContent(event.target.value);
  };

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  
  const handleSaveNote = () => {
    
      setNoteContent('')
      setNoteTitle('')
      setSavedNotes( savedNotes.concat({content : noteContent, title : noteTitle}));

  };

  const saveNotesFile = async ()  =>{
    await window.data.write(savedNotes);
    await window.notif.send();
    console.log("save file");
  } 

  return (
    <div class = 'container'>
      <h2>Notes</h2>



      <div className ='container' >
      <textarea
        rows="2"
        cols="50"
        value={noteTitle}
        onChange={handleTitleChange}
        placeholder="Write your title here..."
        className='input-container'
      />
      <br></br>
      <textarea
        rows="4"
        cols="50"
        value={noteContent}
        onChange={handleNoteChange}
        placeholder="Write your content here..."
      />
      </div>
      <br />
      <button onClick={handleSaveNote}>Add Note</button>
      <button onClick={saveNotesFile}>Save Note in file </button>


      <div>
        <h3 class = 'container'>Saved Notes</h3>
        <ul id="listOfNotes">
          {savedNotes.map((note, index) => (
            <div key={index}> 
            <h2>Titre {note.title} </h2>
            <h3>Content {note.content}</h3>            
              </div> 
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Note;
