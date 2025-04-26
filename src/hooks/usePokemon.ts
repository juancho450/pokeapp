import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { pokemonApi } from '../services/pokemonApi';

export const usePokemonList = (limit: number = 10, offset: number = 0) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.pokemonList(limit, offset),
    queryFn: () => pokemonApi.getPokemonList(limit, offset),
    staleTime: 5 * 60 * 1000,
  });

  return {
    pokemons: data?.pokemons || [],
    total: data?.total || 0,
    loading: isLoading,
    error: error instanceof Error ? error.message : null
  };
};

export const usePokemonSearch = (name: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.pokemon(name),
    queryFn: () => pokemonApi.getPokemon(name),
    enabled: !!name.trim(),
    staleTime: 10 * 60 * 1000,
    retry: false
  });

  return {
    pokemon: data || null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null
  };
};

export const useAbility = (url: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.ability(url),
    queryFn: () => pokemonApi.getAbility(url),
    enabled: !!url,
    staleTime: 30 * 60 * 1000,
  });

  return {
    ability: data || null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null
  };
}; 