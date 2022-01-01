import Head from 'next/head';
import Image from 'next/image';

import { getOptionsForVote } from '$utils/getRandomPokemon';
import { trpc } from '$utils/trpc';
import type { NextPage } from 'next';
import { useState } from 'react';
import { PokeCard } from '$components/PokeCard';

const Home: NextPage = () => {
  const [ids, idsSet] = useState(() => getOptionsForVote());
  const [first, second] = ids;
  const firstPokemon = trpc.useQuery(['getPokemonByID', { id: first }]);
  const secondPokemon = trpc.useQuery(['getPokemonByID', { id: second }]);

  const voteForPokemon = (id: number) => {
    console.log('Voting for pokemon with id: ', id);
    idsSet(getOptionsForVote());
  };
  return (
    <div>
      <Head>
        <title>Which Pokemon is the roundest?</title>
        <meta name="description" content="Vote for the roundest pokemon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-800 flex flex-col h-screen justify-center items-center">
        <h1 className="text-5xl text-white">Which pokemon is rounder?</h1>

        <div className="flex gap-8 items-center mt-4 h-[288px]">
          {firstPokemon.isLoading || secondPokemon.isLoading ? (
            <div className="text-white text-xl">Loading...</div>
          ) : (
            <>
              <PokeCard
                pokemon={firstPokemon.data!}
                voteFunction={voteForPokemon}
              />
              <div className="text-white text-2xl hidden sm:block">vs</div>
              <PokeCard
                pokemon={secondPokemon.data!}
                voteFunction={voteForPokemon}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
