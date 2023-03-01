import { useState, useEffect } from "react";
import Image from "next/image";
import { PokeListSchema, type TPokeList } from "~/types";
import { useRouter } from "next/router";

export const PokeListContainer = () => {
  const [pokemons, setPokemons] = useState<TPokeList["results"]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const { push } = useRouter();

  useEffect(() => {
    /**
     * Fetches the list of pokemons from the PokeAPI
     */
    const getPokemons = async () => {
      try {
        setLoading(true);

        const data = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
        ).then(async (response) => PokeListSchema.parse(await response.json()));

        setPokemons(data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError({
          isError: true,
          message: "An error occurred while fetching the list of pokemons",
        });
      }
    };

    void getPokemons();

    return () => {
      setPokemons([]);
    };
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  const goBack = () => {
    setOffset((prevOffset) => prevOffset - 20);
  };

  return (
    <div className="m-5 rounded-md">
      <div className="flex flex-row flex-wrap">
        {!loading &&
          !error.isError &&
          pokemons &&
          pokemons.map((pokemon) => {
            const { name, url } = pokemon;
            const imageKey = url.split("/")[6] as string;

            return (
              <div
                className="mx-auto my-5 cursor-pointer rounded-3xl border-2 border-solid border-black bg-slate-800 p-3"
                title={`Click to see details of ${name}`}
                key={name}
                onClick={() => {
                  void push(`/pokemon/${imageKey}`);
                }}
              >
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageKey}.png`}
                  alt={name}
                  width={300}
                  height={300}
                />
                <h2 className="text-center text-2xl font-semibold text-white">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </h2>
              </div>
            );
          })}
      </div>

      {!loading && error.isError && (
        <p className="text-center text-3xl font-semibold text-red-600">
          {error.message}
        </p>
      )}

      {loading && (
        <p className="text-center text-3xl font-semibold text-black">
          Loading...
        </p>
      )}

      <div className="mx-5 flex flex-row items-center">
        {!loading && (
          <button
            className="my-5 mx-3 rounded-md border-2 border-solid border-black bg-green-600 p-3 text-lg text-white"
            title="Load more Pokemons"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}

        {!loading && offset > 0 && (
          <button
            className="my-5 mx-3 rounded-md border-2 border-solid border-black bg-blue-600 p-3 text-lg text-white"
            title="Load previous Pokemons"
            onClick={goBack}
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};
