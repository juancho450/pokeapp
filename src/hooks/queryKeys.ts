export const queryKeys = {
  pokemonList: (limit: number, offset: number) => ['pokemonList', limit, offset] as const,
  pokemon: (name: string) => ['pokemon', name] as const,
  ability: (url: string) => ['ability', url] as const,
}; 