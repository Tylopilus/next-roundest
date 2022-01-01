import Image from 'next/image';

import { InferQueryOutput } from '$pages/api/trpc/[trpc]';

type PokemonFromServer = InferQueryOutput<'getPokemonByID'>;
export const PokeCard = ({
  pokemon,
  voteFunction,
}: {
  pokemon: PokemonFromServer;
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
