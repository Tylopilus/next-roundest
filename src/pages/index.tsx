import Head from 'next/head';
import Image from 'next/image';

import { getOptionsForVote } from '$utils/getRandomPokemon';
import { trpc } from '$utils/trpc';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Home: NextPage = (props: any) => {
  const [ids, idsSet] = useState<number[]>(props.ids);
  const [firstID, secondID] = ids;
  // const { data, isLoading } = trpc.useQuery(['hello', { text: 'lol' }]);
  const firstPokemon = trpc.useQuery(['getPokemonByID', { id: firstID }]);
  const secondPokemon = trpc.useQuery(['getPokemonByID', { id: secondID }]);
  useEffect(() => {
    idsSet(() => getOptionsForVote());
  }, []);
  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Head>
        <title>Which Pokemon is the roundest?</title>
        <meta name="description" content="Vote for the roundest pokemon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-800 flex flex-col h-screen justify-center items-center">
        <div className="flex gap-8 items-center">
          <div>
            <figure>
              <Image
                src={firstPokemon.data?.sprites.front_default!}
                alt="pokeball"
                width={200}
                height={200}
                className="bg-red-500"
              />
              <figcaption className="text-white text-center">
                {firstPokemon.data?.name}
              </figcaption>
            </figure>
            <button className="text-white text-center border rounded-lg py-2 px-4 mx-auto block mt-4">
              Vote
            </button>
          </div>
          <div className="text-white text-2xl hidden sm:block">vs</div>
          <div>
            <figure>
              <Image
                src={secondPokemon.data?.sprites.front_default!}
                alt="pokeball"
                width={200}
                height={200}
                className="bg-red-500"
              />
              <figcaption className="text-white text-center">
                {secondPokemon.data?.name}
              </figcaption>
            </figure>
            <button className="text-white text-center border rounded-lg py-2 px-4 mx-auto block mt-4">
              Vote
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [first, seconds] = getOptionsForVote();
  return {
    props: { ids: [first, seconds] },
  };
};
