import { type NextPage } from "next";
import Head from "next/head";
import { PokemonDetails } from "~/components";
import { useRouter } from "next/router";

const PokeId: NextPage = () => {
  const { query } = useRouter();
  const { pokeId } = query;

  return (
    <>
      <Head>
        <title>PokeDetails</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col justify-center">
        <h1 className="my-5 text-center text-6xl font-bold">PokeDetails</h1>

        <PokemonDetails id={pokeId as string} />
      </main>
    </>
  );
};

export default PokeId;
