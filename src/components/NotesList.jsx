import { useState } from 'react';

const NotesList = ({ notes, onDeleteNote, onEditNote }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      onEditNote(id, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  if (notes.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl shadow-lg text-center">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-gray-600">No notes yet. Add your first note above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">
          Your Notes ({filteredNotes.length})
        </h2>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 w-full sm:w-64"
        />
      </div>
      
      <div className="grid gap-4">
        {filteredNotes.map((note) => (
          <div key={note.id} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
            {editingId === note.id ? (
              <div className="space-y-4">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-3 border-2 border-indigo-500 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  rows="3"
                />
                <div className="flex gap-2 justify-end">
                  <button 
                    onClick={() => handleSaveEdit(note.id)} 
                    className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                  <button 
                    onClick={handleCancelEdit} 
                    className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-800 leading-relaxed mb-3 break-words">
                  {note.text}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {note.createdAt}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(note)} 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Edit note"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onDeleteNote(note.id)} 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete note"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      
      {filteredNotes.length === 0 && searchTerm && (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="text-4xl mb-2">🔍</div>
          <p className="text-gray-600">No notes found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default NotesList;
