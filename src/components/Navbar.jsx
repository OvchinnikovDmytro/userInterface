const Navbar = ({ activeTab, navItems, handleNavClick }) => {
  return (
    <nav className="flex w-full bg-emerald-600 shadow-xl sticky top-0 z-50">
      {navItems.map((item) => (
        <button 
          key={item.id} 
          onClick={() => handleNavClick(item.id)} 
          className={`flex-1 py-6 text-[11px] font-black uppercase tracking-[0.2em] border-r border-emerald-500 last:border-r-0 transition-all
            ${activeTab === item.id ? 'bg-emerald-800 text-white shadow-inner' : 'text-emerald-100 hover:bg-emerald-500 hover:text-white'}`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;