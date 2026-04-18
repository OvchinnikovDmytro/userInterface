const Profile = ({ currentUser, onLogout }) => {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl max-w-md mx-auto text-center animate-slideUp">
      <div className="text-6xl mb-6">👤</div>
      <h3 className="font-black text-2xl text-emerald-900 mb-6 uppercase">Профіль</h3>
      <div className="text-left bg-emerald-50/30 rounded-3xl border border-emerald-100 overflow-hidden shadow-inner">
         <div className="p-5 border-b border-emerald-100 flex justify-between items-center"><span className="font-bold text-emerald-700 text-[10px] uppercase tracking-widest">Ім'я</span> <span className="font-bold text-emerald-900">{currentUser?.name}</span></div>
         <div className="p-5 border-b border-emerald-100 flex justify-between items-center"><span className="font-bold text-emerald-700 text-[10px] uppercase tracking-widest">Email</span> <span className="font-bold text-emerald-900">{currentUser?.email}</span></div>
         <div className="p-5 border-b border-emerald-100 flex justify-between items-center"><span className="font-bold text-emerald-700 text-[10px] uppercase tracking-widest">Стать</span> <span className="font-bold text-emerald-900">{currentUser?.sex}</span></div>
         <div className="p-5 flex justify-between items-center"><span className="font-bold text-emerald-700 text-[10px] uppercase tracking-widest">Дата нар.</span> <span className="font-bold text-emerald-900">{currentUser?.dob}</span></div>
      </div>
      <button onClick={onLogout} className="mt-10 bg-white border border-red-100 text-red-500 px-10 py-3 rounded-2xl font-bold text-xs uppercase hover:bg-red-50 transition-all">Вийти з акаунту</button>
    </div>
  );
};

export default Profile;