import { type FC, useState, useEffect } from "react";
import { PokeDetailSchema, type TPokeDetail } from "~/types";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  id: string;
}

export const PokemonDetails: FC<Props> = (props) => {
  const { id } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [details, setDetails] = useState<TPokeDetail>();

  const { push } = useRouter();

  useEffect(() => {
    /**
     * Fetches the details of a pokemon
     */
    const fetchPokeDetails = async () => {
      try {
        setLoading(true);

        if (id) {
          const data = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          ).then(async (response) =>
            PokeDetailSchema.parse(await response.json())
          );

          setDetails(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError({
          isError: true,
          message: "Something went wrong",
        });
      }
    };

    void fetchPokeDetails();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {!loading && !error.isError && details && (
        <div className="rounded-md bg-slate-800 p-12 text-white">
          <h2 className="text-center text-3xl">
            <span className="font-semibold">{"Name: "}</span>
            {details.name.charAt(0).toUpperCase() + details.name.slice(1)}
          </h2>

          <Image
            className="p-3"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={details.name}
            width={200}
            height={200}
          />

          <div className="flex flex-col items-center text-center text-3xl">
            <h2>
              <span className="font-semibold">{"Height: "}</span>
              {details.height}
            </h2>

            <h2>
              <span className="font-semibold">{"Weight: "}</span>
              {details.weight}
            </h2>

            <h2>
              <span className="font-semibold">{"Base XP: "}</span>
              {details.base_experience}
            </h2>
          </div>
        </div>
      )}

      <button
        className="my-5 mx-3 rounded-md border-2 border-solid border-black bg-blue-600 p-3 text-lg text-white"
        title="Go back to PokeList"
        onClick={() => void push("/")}
      >
        Go back
      </button>

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
    </div>
  );
};
