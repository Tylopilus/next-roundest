import { trpc } from '$utils/trpc';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['hello', { text: 'lol' }]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data) return <div>{data?.greeting}</div>;
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
                src="/images/pokeball.png"
                alt="pokeball"
                width={200}
                height={200}
                className="bg-red-500"
              />
              <figcaption className="text-white text-center">
                Roundest Pokemon
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
                src="/images/pokeball.png"
                alt="pokeball"
                width={200}
                height={200}
                className="bg-red-500"
              />
              <figcaption className="text-white text-center">
                Roundest Pokemon
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
