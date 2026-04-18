const Home = ({ isLoggedIn, currentUser }) => {
  return (
    <div className="animate-fadeIn py-6 px-4 md:px-0">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold text-emerald-950 mb-4 tracking-tighter uppercase">Останні Новини</h2>
        <p className="text-emerald-700/60 font-semibold tracking-wide text-sm">Ласкаво просимо до оновленого сервісу Emerald Tasks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-[3rem] border border-emerald-100 shadow-xl shadow-emerald-950/5 hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-3xl p-3 bg-emerald-50 rounded-full border border-emerald-100">🎉</span>
            <h3 className="font-black text-2xl text-emerald-900 tracking-tight">Сервіс Emerald Tasks Відкрито!🎉</h3>
          </div>
          <p className="text-emerald-800/70 font-medium leading-relaxed">
            Вітаємо всіх! Ми офіційно запустили наш новий мінімалістичний TODO-менеджер.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[3rem] border border-emerald-100 shadow-xl shadow-emerald-950/5 hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-3xl p-3 bg-emerald-50 rounded-full border border-emerald-100">👤</span>
            <h3 className="font-black text-2xl text-emerald-900 tracking-tight">Персональні Списки Справ</h3>
          </div>
          <p className="text-emerald-800/70 font-medium leading-relaxed">
            Головна фіча — повна ізоляція даних. Кожен користувач має свій власний список завдань.
          </p>
        </div>
      </div>
      
      {isLoggedIn && (
        <div className="text-center mt-16 p-6 bg-emerald-100 rounded-full border border-emerald-200 inline-block shadow-lg shadow-emerald-950/5">
          <span className="text-emerald-950 font-black text-xl">🌿 Вітаємо знову, {currentUser?.name}!</span>
        </div>
      )}
    </div>
  );
};

export default Home;