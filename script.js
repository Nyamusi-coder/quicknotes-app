// 1. Select elements
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const clearAllBtn = document.querySelector('#clear-all-btn');

// 2. Notes array (load from localStorage or start empty)
let notes = JSON.parse(localStorage.getItem('quicknotes')) || [];

// 3. Render function (uses createElement and textContent, NO innerHTML for user text)
function render(notesToRender = notes) {
    notesList.innerHTML = ''; // Clear current list safely (we only use innerHTML to empty the parent)
    
    if (notesToRender.length === 0) {
        const emptyMsg = document.createElement('li');
        emptyMsg.textContent = searchInput.value ? "No notes match your search." : "You have no notes yet.";
        emptyMsg.style.color = "#666";
        emptyMsg.style.fontStyle = "italic";
        notesList.appendChild(emptyMsg);
    } else {
        notesToRender.forEach(note => {
            const li = document.createElement('li');
            li.className = `note-item category-${note.category}`;
            
            const textP = document.createElement('p');
            textP.textContent = note.text; // SAFE: No innerHTML for user text
            
            const metaP = document.createElement('p');
            metaP.className = 'note-meta';
            metaP.textContent = `${note.category.toUpperCase()} | ${note.createdAt}`;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteNote(note.id));
            
            li.appendChild(textP);
            li.appendChild(metaP);
            li.appendChild(deleteBtn);
            notesList.appendChild(li);
        });
    }
    
    updateCount();
}

// 4. Update Count Message
function updateCount() {
    const count = notes.length;
    if (count === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (count === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${count} notes.`;
    }
}

// 5. Add Note with Validation
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = noteInput.value.trim();
    const category = noteCategory.value;
    
    // Validation
    if (text === '') {
        errorMessage.textContent = "Please type a note first.";
        return;
    }
    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }
    
    // Clear error if valid
    errorMessage.textContent = '';
    
    // Create note object
    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };
    
    notes.push(newNote);
    saveNotes();
    render();
    
    // Clear input
    noteInput.value = '';
});

// 6. Delete Note
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    render();
}

// 7. Search Feature
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredNotes = notes.filter(note => note.text.toLowerCase().includes(searchTerm));
    render(filteredNotes);
});

// 8. Save to localStorage
function saveNotes() {
    localStorage.setItem('quicknotes', JSON.stringify(notes));
}

// 9. Bonus: Clear All
clearAllBtn.addEventListener('click', () => {
    if (confirm("Delete all notes?")) {
        notes = [];
        saveNotes();
        render();
    }
});

// 10. Initial Render on page load
render();