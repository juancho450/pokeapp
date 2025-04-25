import PokemonList from '../components/PokemonList';
import pokeballImage from '../assets/pokeball.png';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#ee1515] text-white py-3 shadow-lg relative">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={pokeballImage} alt="PokeApp" className="w-12 h-12" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-wider">PokeApp</h1>
          </div>

        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-black"></div>
      </header>

      <main>
        <PokemonList />
      </main>

      <footer className="bg-gray-800 text-white py-6 relative">
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#ee1515]"></div>
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <img src={pokeballImage} alt="PokeApp" className="w-10 h-10" />
          </div>

          <p className="text-sm mt-2 text-gray-400">PokeApp &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Home; 