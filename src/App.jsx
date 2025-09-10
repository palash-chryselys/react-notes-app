import { useState, useEffect } from 'react';
import NoteInput from './components/NoteInput';
import NotesList from './components/NotesList';
import Quote from './components/Quote';

const STORAGE_KEY = 'react-notes-app';

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load notes on mount, then save whenever they change
  useEffect(() => {
    if (!isLoaded) {
      // Load from localStorage on first render
      try {
        const savedNotes = localStorage.getItem(STORAGE_KEY);
        if (savedNotes) {
          const parsedNotes = JSON.parse(savedNotes);
          setNotes(parsedNotes);
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      }
      setIsLoaded(true);
    } else {
      // Save to localStorage on subsequent changes
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (error) {
        console.error('Error saving notes:', error);
      }
    }
  }, [notes, isLoaded]);

  const addNote = (newNote) => {
    console.log('Adding new note:', newNote);
    setNotes(prevNotes => {
      const updatedNotes = [newNote, ...prevNotes];
      console.log('Updated notes array:', updatedNotes);
      return updatedNotes;
    });
  };

  const deleteNote = (noteId) => {
    console.log('Deleting note with ID:', noteId);
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  };

  const editNote = (noteId, newText) => {
    console.log('Editing note:', noteId, newText);
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId
          ? { ...note, text: newText, updatedAt: new Date().toLocaleDateString() }
          : note
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-6xl">📝</span>
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              My Notes App
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-md mx-auto">
            Capture your thoughts and get inspired every day
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <NoteInput onAddNote={addNote} />
            <NotesList 
              notes={notes} 
              onDeleteNote={deleteNote} 
              onEditNote={editNote} 
            />
          </div>

          <div className="lg:col-span-1">
            <Quote />
          </div>
        </div>

        <footer className="text-center mt-16 text-white/70">
          <p className="text-sm">
            Built with React, Vite & Tailwind CSS ✨
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
