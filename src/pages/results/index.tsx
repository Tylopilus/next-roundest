import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { prisma } from '$/backend/utils/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { getWinrate } from '$utils/getWinrate';

const Results = ({
  pokemon,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <title>Which Pokemon is the roundest - results</title>
        <meta
          name="description"
          content="See results of which pokemon is the roundest"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center mt-12 text-white">
        <h1 className="text-5xl">Results</h1>
        <Link href="/">
          <a className="mt-4 underline">Go back to voting</a>
        </Link>
        <div className="w-full px-4 md:px-16 md:w-96">
          <table className="w-full mt-8">
            <thead>
              <tr>
                <th className="text-center">Pokemon</th>
                <th className="text-right">Votes</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .sort(
                  (a, b) =>
                    getWinrate(b._count.votedFor, b._count.votedAgainst) -
                    getWinrate(a._count.votedFor, a._count.votedAgainst)
                )
                .map((p) => (
                  <tr key={p.id}>
                    <td className="flex items-center">
                      <Image
                        src={p.spriteUrl}
                        width="100"
                        height="100"
                        alt={p.name}
                      />
                      {p.name}
                    </td>
                    <td className="text-right">
                      {getWinrate(
                        p._count.votedFor,
                        p._count.votedAgainst
                      ).toFixed(2)}
                      %
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Results;

export const getStaticProps = async () => {
  const pokemonOrderedByVotes = await prisma.pokemon.findMany({
    orderBy: {
      votedFor: { _count: 'desc' },
    },
    select: {
      id: true,
      name: true,
      spriteUrl: true,
      _count: {
        select: {
          votedFor: true,
          votedAgainst: true,
        },
      },
    },
  });
  return {
    props: { pokemon: pokemonOrderedByVotes },
    revalidate: 60,
  };
};
