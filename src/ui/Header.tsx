import pokeballImage from '../assets/pokeball.png';

const Header = () => {
  return (
    <header className="bg-[#ee1515] text-white py-3 shadow-lg relative">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={pokeballImage} alt="PokeApp" className="w-12 h-12" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider">PokeApp</h1>
        </div>

      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-black"></div>
    </header>
  );
};

export default Header; 