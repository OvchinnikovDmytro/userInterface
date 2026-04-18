import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Todo from './pages/Todo';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import About from './pages/About';

function App() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [registeredUsers, setRegisteredUsers] = useState([
    { name: 'Адмін', email: 'a@a.com', password: '1', sex: 'Чоловік', dob: '2000-01-01' }
  ]);
  
  const [allTasks, setAllTasks] = useState([
    { id: 1, title: 'Завдання адміна', completed: false, ownerEmail: 'a@a.com' }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [newTaskText, setNewTaskText] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regData, setRegData] = useState({ name: '', email: '', password: '', sex: '', dob: '' });

  const navItems = [
    { id: 'HOME', label: 'Home', show: true },
    { id: 'TODO', label: 'TODO list', show: true },
    { id: 'PROFILE', label: 'Profile', show: isLoggedIn },
    { id: 'ABOUT', label: 'About', show: true },
    { id: 'LOGIN', label: 'Login', show: !isLoggedIn },
    { id: 'REGISTER', label: 'Register', show: !isLoggedIn },
  ].filter(item => item.show);

  const handleNavClick = (tabId) => {
    if (tabId === 'TODO' && !isLoggedIn) {
      alert('Будь ласка, увійдіть у систему!');
      setActiveTab('LOGIN');
    } else {
      setActiveTab(tabId);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = registeredUsers.find(u => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setActiveTab('HOME');
      setLoginEmail(''); setLoginPassword('');
    } else {
      alert('Невірні дані!');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regData.name || !regData.email || !regData.password) {
      alert('Заповніть поля!'); return;
    }
    setRegisteredUsers([...registeredUsers, regData]);
    setActiveTab('LOGIN');
  };

  const renderContent = () => {
    const props = {
      isLoggedIn, currentUser, myTasks: allTasks.filter(t => t.ownerEmail === currentUser?.email),
      newTaskText, setNewTaskText, editingId, setEditingId, editingText, setEditingText,
      loginEmail, setLoginEmail, loginPassword, setLoginPassword, regData, setRegData
    };

    switch (activeTab) {
      case 'HOME': return <Home {...props} />;
      case 'TODO': return <Todo {...props} 
        handleAddTask={() => {
          setAllTasks([...allTasks, { id: Date.now(), title: newTaskText, completed: false, ownerEmail: currentUser.email }]);
          setNewTaskText('');
        }}
        handleToggleTask={(id) => setAllTasks(allTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))}
        handleDeleteTask={(id) => setAllTasks(allTasks.filter(t => t.id !== id))}
        handleSaveEdit={(id) => {
          setAllTasks(allTasks.map(t => t.id === id ? { ...t, title: editingText } : t));
          setEditingId(null);
        }}
      />;
      case 'LOGIN': return <Login {...props} handleLogin={handleLogin} />;
      case 'REGISTER': return <Register {...props} handleRegister={handleRegister} />;
      case 'PROFILE': return <Profile currentUser={currentUser} onLogout={() => { setIsLoggedIn(false); setActiveTab('HOME'); }} />;
      case 'ABOUT': return <About />;
      default: return <Home {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar activeTab={activeTab} navItems={navItems} handleNavClick={handleNavClick} />
      <main className="p-6 md:p-12 flex-1 flex justify-center items-start">
        <div className="w-full max-w-4xl">{renderContent()}</div>
      </main>
      <footer className="p-10 text-center text-emerald-900/10 text-[9px] font-bold uppercase tracking-[0.5em]">
        Ovchinnikov Dmytro kv-51mn | 2026
      </footer>
    </div>
  );
}

export default App;