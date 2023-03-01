import { z } from "zod";

export const PokeListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});

export type TPokeList = z.infer<typeof PokeListSchema>;

export const PokeDetailSchema = z.object({
  abilities: z.array(z.object({})),
  base_experience: z.number(),
  forms: z.array(z.object({})),
  game_indices: z.array(z.object({})),
  height: z.number(),
  held_items: z.array(z.object({})),
  id: z.number(),
  is_default: z.boolean(),
  location_area_encounters: z.string(),
  moves: z.array(z.object({})),
  name: z.string(),
  order: z.number(),
  past_types: z.array(z.object({})),
  species: z.object({}),
  sprites: z.object({}),
  stats: z.array(z.object({})),
  types: z.array(z.object({})),
  weight: z.number(),
});

export type TPokeDetail = z.infer<typeof PokeDetailSchema>;
