import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pokemon, PokemonListResponse, Ability } from '../interfaces/Pokemon';

export const usePokemonList = (limit: number = 10, offset: number = 0) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<PokemonListResponse>(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        setTotal(data.count);

        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await axios.get<Pokemon>(pokemon.url);
            return response.data;
          })
        );

        setPokemons(pokemonData);
        setLoading(false);
        setError(null);
      } catch {
        setError('Error al cargar los Pokémon');
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [limit, offset]);

  return { pokemons, loading, error, total };
};

export const usePokemonSearch = (name: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchPokemon = async () => {
      if (!name.trim()) {
        setPokemon(null);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get<Pokemon>(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        setPokemon(response.data);
        setLoading(false);
        setError(null);
      } catch {
        setError('Pokémon no encontrado');
        setPokemon(null);
        setLoading(false);
      }
    };

    searchPokemon();
  }, [name]);

  return { pokemon, loading, error };
};

export const useAbility = (url: string) => {
  const [ability, setAbility] = useState<Ability | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbility = async () => {
      if (!url) return;

      try {
        setLoading(true);
        const response = await axios.get<Ability>(url);
        setAbility(response.data);
        setLoading(false);
        setError(null);
      } catch {
        setError('Error al cargar la habilidad');
        setLoading(false);
      }
    };

    fetchAbility();
  }, [url]);

  return { ability, loading, error };
}; 