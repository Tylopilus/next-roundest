import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import type { NextPage } from 'next';

import { getOptionsForVote } from '$utils/getRandomPokemon';
import { trpc } from '$utils/trpc';
import { useState } from 'react';
import { PokeCard } from '$components/PokeCard';

const Home: NextPage = () => {
  const [ids, idsSet] = useState(() => getOptionsForVote());
  const [first, second] = ids;
  const firstPokemon = trpc.useQuery(['getPokemonByID', { id: first }]);
  const secondPokemon = trpc.useQuery(['getPokemonByID', { id: second }]);

  const voteMutation = trpc.useMutation(['cast-vote']);
  const voteForPokemon = (votedFor: number, votedAgainst: number) => {
    voteMutation.mutate({
      votedFor,
      votedAgainst,
    });
    idsSet(getOptionsForVote());
  };
  return (
    <div>
      <Head>
        <title>Which Pokemon is the roundest?</title>
        <meta name="description" content="Vote for the roundest pokemon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center h-screen pb-8 bg-gray-800">
        <section className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-5xl text-white">Which pokemon is rounder?</h1>

          <div className="flex gap-8 items-center mt-4 h-[288px]">
            {firstPokemon.isLoading || secondPokemon.isLoading ? (
              <div className="text-xl text-white">
                <Image src="/puff.svg" width={100} height={100} />
              </div>
            ) : (
              <>
                <PokeCard
                  pokemon={firstPokemon.data!}
                  voteFunction={() => voteForPokemon(first, second)}
                />
                <div className="hidden text-2xl text-white sm:block">vs</div>
                <PokeCard
                  pokemon={secondPokemon.data!}
                  voteFunction={() => voteForPokemon(second, first)}
                />
              </>
            )}
          </div>
        </section>
        <section>
          <Link href="/results">
            <a className="text-white text-md">Show results</a>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Home;
