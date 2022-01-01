const MAX_POKEMON = 151;
export const getRandomPokemon = (notThis?: number): number => {
  const random = Math.floor(Math.random() * MAX_POKEMON) + 1;
  if (random !== notThis) {
    return random;
  }
  return getRandomPokemon(random);
};

export const getOptionsForVote = () => {
  const first = getRandomPokemon();
  const second = getRandomPokemon(first);
  return [first, second];
};
