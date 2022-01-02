import { z } from 'zod';
import { PokemonClient } from 'pokenode-ts';
import { prisma } from '$/backend/utils/prisma';
import * as trpc from '@trpc/server';

export const appRouter = trpc
  .router()
  .query('getPokemonByID', {
    input: z.object({ id: z.number() }),
    async resolve({ input }) {
      const api = new PokemonClient();
      const pokemon = await api.getPokemonById(input.id);
      return { name: pokemon.name, sprites: pokemon.sprites, id: pokemon.id };
    },
  })
  .mutation('cast-vote', {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),
    async resolve({ input }) {
      const voteInDB = await prisma.vote.create({
        data: {
          votedFor: input.votedFor,
          votedAgainst: input.votedAgainst,
        },
      });
      return {
        success: true,
        vote: voteInDB,
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
