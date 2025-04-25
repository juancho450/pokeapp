import { Pokemon } from '../interfaces/Pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const mainType = pokemon.types[0]?.type.name || 'normal';
  const typeColorClass = `type-${mainType}`;

  return (
    <div className="pokemon-card rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105">
    
      <div className={`h-2 ${typeColorClass}`}></div>
      
      <div className="p-4 bg-white">
      
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold capitalize text-gray-800">{pokemon.name}</h2>
        </div>
        
 
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-32 h-32 rounded-full border-8 border-gray-900 bg-white relative">
              <div className="absolute inset-x-0 top-1/2 h-8 bg-gray-900"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-4 border-gray-900"></div>
            </div>
          </div>
          
       
          <div className="flex justify-center cursor-pointer relative z-10">
            <img 
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
              alt={pokemon.name} 
              className="h-40 w-40 object-contain drop-shadow-lg transition-transform hover:scale-110"
            />
          </div>
        </div>
        
       
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types.map((typeInfo) => (
            <span 
              key={typeInfo.type.name}
              className={`px-3 py-1 rounded-full text-sm font-medium type-${typeInfo.type.name} capitalize`}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
        
        <div className="text-center mt-3 text-xs text-gray-500">
          Doble click para ver detalles
        </div>
      </div>
    </div>
  );
};

export default PokemonCard; 