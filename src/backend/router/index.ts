import { z } from 'zod';
import { PokemonClient } from 'pokenode-ts';
import { prisma } from '$/backend/utils/prisma';
import * as trpc from '@trpc/server';

export const appRouter = trpc
  .router()
  .query('getPokemonByID', {
    input: z.object({ id: z.number() }),
    async resolve({ input }) {
      const pokemonApi = new PokemonClient();
      // const pokemon = await pokemonApi.getPokemonById(input.id);
      const pokemon = await prisma.pokemon.findFirst({
        where: { id: input.id },
      });
      if (!pokemon) {
        throw new Error('Pokemon not found');
      }
      return pokemon;
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
          votedForId: input.votedFor,
          votedAgainstId: input.votedAgainst,
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
