import axios from 'axios';
import { Pokemon, PokemonListResponse, Ability } from '../interfaces/Pokemon';

const API_URL = 'https://pokeapi.co/api/v2';

const api = axios.create({
  baseURL: API_URL,
});

export const pokemonApi = {
  getPokemonList: async (limit: number = 10, offset: number = 0) => {
    const { data } = await api.get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
    
    const pokemonData = await Promise.all(
      data.results.map(async (pokemon) => {
        const response = await api.get<Pokemon>(pokemon.url);
        return response.data;
      })
    );
    
    return {
      pokemons: pokemonData,
      total: data.count
    };
  },
  
  getPokemon: async (name: string): Promise<Pokemon> => {
    if (!name.trim()) {
      throw new Error('Nombre de Pokémon requerido');
    }
    
    const { data } = await api.get<Pokemon>(`/pokemon/${name.toLowerCase()}`);
    return data;
  },
  
  getAbility: async (url: string): Promise<Ability> => {
    if (!url) {
      throw new Error('URL de habilidad requerida');
    }
    
    const { data } = await api.get<Ability>(url);
    return data;
  }
}; 