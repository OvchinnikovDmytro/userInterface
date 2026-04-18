const Login = ({ loginEmail, setLoginEmail, loginPassword, setLoginPassword, handleLogin }) => {
  return (
    <div className="bg-white p-12 rounded-[2.5rem] shadow-xl max-w-sm mx-auto animate-slideUp">
      <h3 className="font-black text-3xl text-emerald-900 mb-8 uppercase text-center">Вхід</h3>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="Email" required className="w-full p-4 border rounded-2xl outline-none focus:border-emerald-500" />
        <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="Пароль" required className="w-full p-4 border rounded-2xl outline-none focus:border-emerald-500" />
        <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-900/10">Увійти</button>
      </form>
    </div>
  );
};

export default Login;