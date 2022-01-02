import Image from 'next/image';

import { InferQueryOutput } from '$pages/api/trpc/[trpc]';

type PokemonFromServer = InferQueryOutput<'getPokemonByID'>;
export const PokeCard = ({
  pokemon,
  voteFunction,
}: {
  pokemon: PokemonFromServer;
  voteFunction: () => void;
}) => (
  <div>
    <figure>
      <Image src={pokemon.spriteUrl} alt="pokeball" width={200} height={200} />
      <figcaption className="text-center text-white capitalize">
        {pokemon.name}
      </figcaption>
    </figure>
    <button
      className="block px-4 py-2 mx-auto mt-4 text-center text-white border rounded-lg"
      onClick={voteFunction}>
      Vote
    </button>
  </div>
);
