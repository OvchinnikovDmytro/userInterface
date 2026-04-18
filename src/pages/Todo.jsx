const Todo = ({ 
  myTasks, 
  newTaskText, 
  setNewTaskText, 
  handleAddTask, 
  handleToggleTask, 
  handleDeleteTask, 
  editingId, 
  setEditingId, 
  editingText, 
  setEditingText, 
  handleSaveEdit 
}) => {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl max-w-xl mx-auto animate-slideUp border border-emerald-50">
      <h3 className="font-black text-2xl text-emerald-900 mb-8 uppercase text-center tracking-tight">Мій список справ</h3>
      
      <div className="flex space-x-2 mb-8">
        <input 
          value={newTaskText} 
          onChange={e => setNewTaskText(e.target.value)}
          placeholder="Додати нову справу..."
          className="flex-1 p-4 border rounded-2xl outline-none focus:border-emerald-500 transition-all"
        />
        <button onClick={handleAddTask} className="bg-emerald-600 text-white px-6 rounded-2xl font-bold hover:bg-emerald-700 transition-all">Додати</button>
      </div>

      <div className="space-y-3">
        {myTasks.length > 0 ? myTasks.map((t, index) => (
          <div key={t.id} className="flex items-center p-5 bg-slate-50 rounded-2xl border border-gray-100 group">
            <button onClick={() => handleToggleTask(t.id)} className={`h-6 w-6 rounded-full border-2 border-emerald-300 mr-4 flex items-center justify-center ${t.completed ? 'bg-emerald-300' : 'bg-white'}`}>
              <div className={`h-2.5 w-2.5 rounded-full ${t.completed ? 'bg-emerald-700' : 'bg-transparent'}`}></div>
            </button>

            {editingId === t.id ? (
              <input value={editingText} onChange={e => setEditingText(e.target.value)} onBlur={() => handleSaveEdit(t.id)} autoFocus className="flex-1 bg-white border-b-2 border-emerald-500 outline-none" />
            ) : (
              <span className={`flex-1 font-semibold ${t.completed ? 'line-through text-gray-400' : 'text-emerald-900'}`}>{index + 1}. {t.title}</span>
            )}

            <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => { setEditingId(t.id); setEditingText(t.title); }} className="text-xs font-bold text-emerald-600">Edit</button>
              <button onClick={() => handleDeleteTask(t.id)} className="text-xs font-bold text-red-400">Delete</button>
            </div>
          </div>
        )) : <p className="text-center text-gray-400 py-10 italic">У вас поки немає справ...</p>}
      </div>
    </div>
  );
};

export default Todo;