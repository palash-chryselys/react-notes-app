import { useState } from 'react';

const NoteInput = ({ onAddNote }) => {
  const [noteText, setNoteText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      const newNote = {
        id: Date.now(),
        text: noteText.trim(),
        createdAt: new Date().toLocaleDateString()
      };
      onAddNote(newNote);
      setNoteText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <div className="flex gap-3">
        <input
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Enter your note..."
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
        />
        <button 
          type="submit" 
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Note
        </button>
      </div>
    </form>
  );
};

export default NoteInput;
