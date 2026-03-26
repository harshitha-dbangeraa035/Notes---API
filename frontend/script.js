const API_URL = "http://localhost:5000/api/notes";

// Load notes on page load
window.onload = getNotes;

// GET NOTES
async function getNotes() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  data.forEach(note => {
    container.innerHTML += `
      <div class="note">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <div class="actions">
          <button class="edit" onclick="editNote('${note._id}', '${note.title}', '${note.content}')">Edit</button>
          <button class="delete" onclick="deleteNote('${note._id}')">Delete</button>
        </div>
      </div>
    `;
  });
}

// ADD NOTE
async function addNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (!title || !content) {
    alert("Please fill all fields");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, content })
  });

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  getNotes();
}

// DELETE NOTE
async function deleteNote(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  getNotes();
}

// EDIT NOTE
function editNote(id, oldTitle, oldContent) {
  const newTitle = prompt("Edit title:", oldTitle);
  const newContent = prompt("Edit content:", oldContent);

  if (newTitle && newContent) {
    updateNote(id, newTitle, newContent);
  }
}

// UPDATE NOTE
async function updateNote(id, title, content) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, content })
  });

  getNotes();
}