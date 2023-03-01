import { type FC, useState, useEffect } from "react";
import { PokeDetailSchema, type TPokeDetail } from "~/types";
import Image from "next/image";

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
    <div>
      <h1>PokeDetails</h1>

      {!loading && !error.isError && details && (
        <div>
          <h2>Name: {details.name}</h2>

          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={details.name}
            width={200}
            height={200}
          />

          <h2>Height: {details.height}</h2>
          <h2>Weight: {details.weight}</h2>

          <h2>Base XP: {details.base_experience}</h2>
        </div>
      )}

      {loading && <p>Loading...</p>}

      {!loading && error.isError && <p>{error.message}</p>}
    </div>
  );
};
