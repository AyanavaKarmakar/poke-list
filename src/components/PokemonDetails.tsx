import { type FC } from "react";

interface Props {
  id: string;
}

export const PokemonDetails: FC<Props> = (props) => {
  const { id } = props;

  return <>Details: {id}</>;
};
