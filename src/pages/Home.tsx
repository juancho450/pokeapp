import PokemonList from '../components/PokemonList';
import Footer from '../ui/Footer';
import Header from '../ui/Header';


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <PokemonList />
      </main>
      <Footer />
    </div>
  );
};

export default Home; 