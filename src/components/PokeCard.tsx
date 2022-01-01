import Image from 'next/image';
import type { Pokemon, PokemonSprites } from 'pokenode-ts';

export const PokeCard = ({
  pokemon,
  voteFunction,
}: {
  pokemon: { name: string; sprites: PokemonSprites; id: number };
  voteFunction: (id: number) => void;
}) => (
  <div>
    <figure>
      <Image
        src={pokemon.sprites.front_default!}
        alt="pokeball"
        width={200}
        height={200}
      />
      <figcaption className="text-white text-center capitalize">
        {pokemon.name}
      </figcaption>
    </figure>
    <button
      className="text-white text-center border rounded-lg py-2 px-4 mx-auto block mt-4"
      onClick={() => voteFunction(pokemon.id)}>
      Vote
    </button>
  </div>
);
