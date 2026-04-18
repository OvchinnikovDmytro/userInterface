const Register = ({ regData, setRegData, handleRegister }) => {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl max-w-sm mx-auto animate-slideUp">
      <h3 className="font-black text-2xl text-emerald-900 mb-6 uppercase text-center">Реєстрація</h3>
      <form onSubmit={handleRegister} className="space-y-3">
        <input type="text" placeholder="Ім'я" value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} className="w-full p-4 border rounded-2xl outline-none focus:border-emerald-500" />
        <input type="email" placeholder="Email" value={regData.email} onChange={e => setRegData({...regData, email: e.target.value})} className="w-full p-4 border rounded-2xl outline-none focus:border-emerald-500" />
        <input type="password" placeholder="Пароль" value={regData.password} onChange={e => setRegData({...regData, password: e.target.value})} className="w-full p-4 border rounded-2xl outline-none focus:border-emerald-500" />
        <select value={regData.sex} onChange={e => setRegData({...regData, sex: e.target.value})} className="w-full p-4 border rounded-2xl outline-none focus:border-emerald-500 text-gray-500">
          <option value="">Оберіть стать</option>
          <option value="Чоловік">Чоловік</option>
          <option value="Жінка">Жінка</option>
        </select>
        <input type="date" value={regData.dob} onChange={e => setRegData({...regData, dob: e.target.value})} className="w-full p-4 border rounded-2xl outline-none focus:border-emerald-500 text-gray-500" />
        <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 mt-4">Зареєструватися</button>
      </form>
    </div>
  );
};

export default Register;