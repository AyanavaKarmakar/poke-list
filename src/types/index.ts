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
