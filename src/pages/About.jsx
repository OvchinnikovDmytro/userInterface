import logoImg from '../assets/logo.png';

const About = () => {
  return (
    <div className="bg-white p-12 rounded-[3rem] shadow-xl max-w-xl mx-auto text-center animate-slideUp border border-emerald-50">
      <h3 className="font-black text-3xl text-emerald-900 mb-8 uppercase tracking-tighter">About Emerald</h3>
      <div className="flex justify-center mb-12">
          <img src={logoImg} alt="Logo" className="h-56 w-auto rounded-[2.5rem] shadow-xl border border-emerald-100 object-cover" />
      </div>
      <p className="text-emerald-900/60 font-medium leading-relaxed px-4">
        Це персональний менеджер завдань нового покоління. Ваші дані захищені, а список справ завжди під рукою.
      </p>
    </div>
  );
};

export default About;