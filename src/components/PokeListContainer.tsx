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
    <div>
      <h1>Pokemon List</h1>

      <div>
        {pokemons.map((pokemon) => {
          const { name, url } = pokemon;
          const imageKey = url.split("/")[6] as string;

          return (
            <div
              key={name}
              onClick={() => {
                void push(`/pokemon/${imageKey}`);
              }}
            >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageKey}.png`}
                alt={name}
                width={100}
                height={100}
              />
              <h2>{name}</h2>
            </div>
          );
        })}
      </div>

      {error.isError && <p>{error.message}</p>}

      {loading && <p>Loading...</p>}

      {!loading && <button onClick={handleLoadMore}>Load More</button>}

      {!loading && offset > 0 && <button onClick={goBack}>Go Back</button>}
    </div>
  );
};
