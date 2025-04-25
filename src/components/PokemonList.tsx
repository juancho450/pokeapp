import { useState } from 'react';
import { usePokemonList, usePokemonSearch } from '../hooks/usePokemon';
import PokemonCard from './PokemonCard';
import { Pokemon } from '../interfaces/Pokemon';
import PokemonDetails from './PokemonDetails';
import AbilityDetails from './AbilityDetails';
import Searchbar from '../ui/Searchbar';

const PokemonList = () => {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const LIMIT = 10;
  
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectedAbilityUrl, setSelectedAbilityUrl] = useState<string | null>(null);
  
  const { pokemons, loading, error, total } = usePokemonList(LIMIT, page * LIMIT);
  const { pokemon: searchedPokemon, loading: searchLoading, error: searchError } = usePokemonSearch(searchTerm);
  
  const totalPages = Math.ceil(total / LIMIT);
  
  const handlePrevPage = () => {
    setPage(prev => Math.max(0, prev - 1));
  };
  
  const handleNextPage = () => {
    setPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };
  
  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setSelectedAbilityUrl(null);
  };
  
  const handleAbilityClick = (abilityUrl: string) => {
    setSelectedAbilityUrl(abilityUrl);
  };
  
  const closeModal = () => {
    setSelectedPokemon(null);
    setSelectedAbilityUrl(null);
  };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Searchbar onSearch={handleSearch} />
      
      {(loading || searchLoading) && (
        <div className="text-center py-12">
          <div className="pokeball-spin mx-auto h-16 w-16 mb-6 relative">
            <div className="h-full w-full rounded-full border-4 border-gray-900 bg-white relative overflow-hidden">
              <div className="absolute inset-x-0 top-1/2 h-4 bg-gray-900"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-gray-900 z-10"></div>
            </div>
          </div>
          <p className="text-lg font-medium text-gray-600">Cargando Pokémon...</p>
        </div>
      )}
      
  
      {(error || searchError) && (
        <div className="max-w-md mx-auto bg-red-50 p-6 rounded-lg text-center my-8 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-medium text-red-700 mb-2">¡Ups! Algo salió mal</p>
          <p className="text-red-600">{error || searchError}</p>
        </div>
      )}
      
      {searchTerm && searchedPokemon && !searchLoading && (
        <div className="mb-8">
          <div className="text-center">
            <h2 className="inline-block text-xl font-bold mb-6 bg-[#ee1515] text-white px-6 py-2 rounded-full shadow-md">
              Resultado de búsqueda
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="w-64" onDoubleClick={() => handlePokemonClick(searchedPokemon)}>
              <PokemonCard pokemon={searchedPokemon} />
            </div>
          </div>
        </div>
      )}
      
      {!searchTerm && !loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {pokemons.map((pokemon: Pokemon) => (
              <div key={pokemon.id} onDoubleClick={() => handlePokemonClick(pokemon)}>
                <PokemonCard pokemon={pokemon} />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center items-center mt-10 mb-4">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={handlePrevPage}
                disabled={page === 0}
                className="px-6 py-3 rounded-l-full bg-[#3B5BA7] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Anterior
              </button>
              
              <div className="px-6 py-3 bg-gray-100 text-gray-800 font-medium border-t border-b border-gray-300 flex items-center">
                Página {page + 1} de {totalPages}
              </div>
              
              <button
                onClick={handleNextPage}
                disabled={page >= totalPages - 1}
                className="px-6 py-3 rounded-r-full bg-[#3B5BA7] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center"
              >
                Siguiente
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
      
      {selectedPokemon && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleBackdropClick}
        >
          <div 
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}  
          >
            <button 
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-700 hover:text-red-600 p-1 z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {selectedAbilityUrl ? (
              <AbilityDetails url={selectedAbilityUrl} onBack={() => setSelectedAbilityUrl(null)} />
            ) : (
              <PokemonDetails pokemon={selectedPokemon} onAbilityClick={handleAbilityClick} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonList; 