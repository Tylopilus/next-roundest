import Head from 'next/head';
import Link from 'next/link';

const Results = () => {
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

      <main className="flex flex-col items-center justify-center h-screen pb-8 bg-gray-800">
        <section className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-5xl text-white">Results</h1>

          <div className="flex gap-8 items-center mt-4 h-[288px]"></div>
        </section>
        <section>
          <Link href="/">
            <a className="text-white text-md">Back to voting</a>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Results;
