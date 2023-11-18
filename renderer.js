const body = document.querySelector("body");

//page principale
let html = `<h1>Application de notes</h1>
            <button id="saveButton">Save</button>
            <form id="form">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title">
                <label for="text">Text:</label>
                <input type="text" name="text" id="text">
                <button type="submit" id="addNoteButton">Add Note</button>
            </form>
            <h2>notes</h2>
            <div id="notesBox"></div>
            `

body.innerHTML += html

//list of notes
let notes = []

async function initializeNotes(){
    notes = await window.data.read()
    notes.forEach(element => {
        const notesBox = document.getElementById("notesBox");
        const div = document.createElement("div");
        const h2 = document.createElement("h4");
        const h3 = document.createElement("h6");
        h2.innerText = 'Title : ' + element.title;
        h3.innerText = 'Text : '+ element.text;
        h2.appendChild(h3);
        div.style.border = '2px solid';
        div.appendChild(h2);
        notesBox.appendChild(div)
    });
}

initializeNotes()

const form = body.querySelector("form")
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const div = document.getElementById("info");
    const title = document.getElementById("title").value;
    const text =  document.getElementById("text").value;
    createNote(title,text);
})

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    await window.darkMode.toggle()
})

document.getElementById('saveButton').addEventListener('click', async () => {

    await window.data.write(notes)
    await window.notif.send();
})

function createNote(title,text){
    const notesBox = document.getElementById("notesBox");
    const div = document.createElement("div");
    const h2 = document.createElement("h4");
    const h3 = document.createElement("h6");
    h2.innerText = 'Title : ' + title;
    h3.innerText = 'Text : '+ text;
    h2.appendChild(h3);
    div.style.border = '2px solid';
    div.appendChild(h2);
    notesBox.appendChild(div)
    notes.push({title : title, text : text})
    return div
}
