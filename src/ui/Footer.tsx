import pokeballImage from '../assets/pokeball.png';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-[#ee1515]"></div>
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-4">
          <img src={pokeballImage} alt="PokeApp" className="w-10 h-10" />
        </div>

        <p className="text-sm mt-2 text-gray-400">PokeApp &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer; 