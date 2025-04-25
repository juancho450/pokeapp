import { useAbility } from '../hooks/usePokemon';

interface AbilityDetailsProps {
  url: string;
  onBack: () => void;
}

const AbilityDetails = ({ url, onBack }: AbilityDetailsProps) => {
  const { ability, loading, error } = useAbility(url);

  const getAbilityEffect = () => {
    if (!ability) return '';
  
    const abilityeffect = ability.effect_entries.find(entry => entry.language.name === 'en');
    return abilityeffect ? abilityeffect.effect : 'No hay descripción disponible.';
  };

  return (
    <div className="text-center">
      <button 
        onClick={onBack}
        className="inline-flex items-center px-3 py-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver
      </button>

      {loading && (
        <div className="py-10 flex flex-col items-center">
          <div className="pokeball-spin h-12 w-12 mb-4 relative">
            <div className="h-full w-full rounded-full border-4 border-gray-900 bg-white relative">
              <div className="absolute inset-x-0 top-1/2 h-2 bg-gray-900"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-900"></div>
            </div>
          </div>
          <p className="text-gray-600">Cargando detalles de la habilidad...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {ability && (
        <div className='mt-10'>
          <div className="-m-6 mb-6 p-4 bg-blue-600 text-center">
            <h2 className="text-2xl font-bold capitalize mb-0 text-white drop-shadow-md">
              {ability.name}
            </h2>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-5 shadow-sm mb-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b border-blue-100 pb-2">
              Efecto
            </h3>
            <div className="text-gray-700 text-left leading-relaxed">
              <p className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-blue-400 before:rounded-full">
                {getAbilityEffect()}
              </p>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 italic">
            ID de habilidad: {ability.id}
          </div>
        </div>
      )}
    </div>
  );
};

export default AbilityDetails; 