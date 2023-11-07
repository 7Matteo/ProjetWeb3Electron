const information = document.getElementById('info')
information.innerText = `Cette application utilise Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), et Electron (v${versions.electron()})`

const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // Affichera 'pong'
}
  
func()






const body = document.querySelector("body");

// Create the form element
const form = document.createElement('form');
form.setAttribute('id', 'form')

// Create a label and input field for the title
const titleLabel = document.createElement('label');
titleLabel.setAttribute('for', 'title');
titleLabel.textContent = 'Title:';

const titleInput = document.createElement('input');
titleInput.setAttribute('type', 'text');
titleInput.setAttribute('name', 'title');
titleInput.setAttribute('id', 'title');

// Create a label and textarea for the text
const textLabel = document.createElement('label');
textLabel.setAttribute('for', 'text');
textLabel.textContent = 'Text:';

const textArea = document.createElement('input');
textArea.type = 'text';
textArea.setAttribute('name', 'text');
textArea.setAttribute('id','text')

// Create a submit button
const button = document.getElementById("button");
button.setAttribute('type', 'submit');
button.setAttribute('value', 'Submit');

// Append the form elements to the document
form.appendChild(titleLabel);
form.appendChild(titleInput);
form.appendChild(document.createElement('br')); // Line break
form.appendChild(textLabel);
form.appendChild(textArea);
form.appendChild(document.createElement('br')); // Line break
form.appendChild(button);

// Append the form to the document body
body.appendChild(form);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const div = document.getElementById("info");
    const title = document.getElementById("title").value;
    const text =  document.getElementById("text").value;

    const newNote = createNote(title,text);

    div.appendChild(newNote);
  } )

function createNote(title,text){
    const div = document.createElement("div");
    const h2 = document.createElement("h4");
    const h3 = document.createElement("h6");
    h2.innerText = 'Title : ' + title;
    h3.innerText = 'Text : '+ text;
    h2.appendChild(h3);
    div.style.border = '2px solid';
    div.appendChild(h2);
    return div
}