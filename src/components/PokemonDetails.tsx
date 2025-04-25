import { Pokemon } from '../interfaces/Pokemon';

interface PokemonDetailsProps {
  pokemon: Pokemon;
  onAbilityClick: (abilityUrl: string) => void;
}

const PokemonDetails = ({ pokemon, onAbilityClick }: PokemonDetailsProps) => {
  const mainType = pokemon.types[0]?.type.name || 'normal';
  const typeColorClass = `type-${mainType}`;
  
  return (
    <div className="text-center">
      <div className={`-m-6 mb-6 p-4 ${typeColorClass} text-center relative`}>
        <h2 className="text-2xl font-bold capitalize mb-0 text-white drop-shadow-md">
          {pokemon.name}
        </h2>
      </div>
      
      <div className="flex justify-center mb-6 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gray-100 opacity-50"></div>
        </div>
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
          alt={pokemon.name}
          className="h-48 w-48 object-contain relative z-10 drop-shadow-lg" 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">Tipo</h3>
          <div className="flex justify-center gap-2 flex-wrap">
            {pokemon.types.map((typeInfo) => (
              <span 
                key={typeInfo.type.name}
                className={`px-3 py-1 rounded-full text-sm font-medium type-${typeInfo.type.name} capitalize shadow-sm`}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">Peso</h3>
          <p className="text-2xl font-bold text-gray-800">{pokemon.weight / 10} kg</p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">Habilidades</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {pokemon.abilities.map((abilityInfo) => (
            <button
              key={abilityInfo.ability.name}
              onClick={() => onAbilityClick(abilityInfo.ability.url)}
              className="px-4 py-3 bg-white hover:bg-blue-50 rounded-lg text-gray-800 
                         transition-colors capitalize font-medium border border-gray-200
                         flex items-center justify-center shadow-sm hover:shadow"
            >
              <span className="mr-2 w-2 h-2 rounded-full bg-blue-500"></span>
              {abilityInfo.ability.name}
              {abilityInfo.is_hidden && (
                <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-700">
                  Oculta
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3 italic">
          Haz clic en una habilidad para ver sus efectos
        </p>
      </div>
    </div>
  );
};

export default PokemonDetails; 