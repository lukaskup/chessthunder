import { Events } from "../../constants/events";
import {
  createGameSchema,
  sendMoveSchema,
  Move,
  moveSubSchema,
  defaultGame,
} from "./../../constants/schemas";

import type { Game, UserGame } from "@prisma/client";

import { createRouter } from "./context";
import * as trpc from "@trpc/server";
import { v4 as uuidv4 } from "uuid";
import z from "zod";

export const gameRouter = createRouter()
  .mutation("createGame", {
    input: createGameSchema,
    resolve: async ({ ctx, input }) => {
      const game: Game = {
        id: input.id,
        ...defaultGame,
      };

      const position = !!Math.round(Math.random()) ? "WHITE" : "BLACK";

      if (ctx.session?.user?.id) {
        const userGame: UserGame = {
          id: uuidv4(),
          gameId: input.id,
          position: position,
          sessionId: uuidv4(),
          userId: ctx.session?.user?.id,
        };
        //@ts-ignore
        await prisma?.userGame.create({ data: userGame });
      }

      ctx.eventEmitter.emit(Events.CREATE_GAME, game);

      //@ts-ignore
      await prisma?.game.create({ data: game });

      return true;
    },
  })
  .query("getGame", {
    input: z.object({ id: z.string() }),
    resolve: async ({ ctx, input }) => {
      return await prisma?.game.findUnique({ where: { id: input.id } });
    },
  })
  .mutation("sendMove", {
    input: sendMoveSchema,
    resolve: async ({ ctx, input }) => {
      const move: Move = {
        id: uuidv4(),
        gameId: input.gameId,
        message: input.move,
        sentAd: new Date(),
        senderId: ctx.session?.user?.id || "anonymous",
      };

      ctx.eventEmitter.emit(Events.SEND_MOVE, move);

      return move;
    },
  })
  .subscription("onSendMove", {
    input: moveSubSchema,
    resolve: ({ ctx, input }) => {
      return new trpc.Subscription<Move>((emit) => {
        function onMove(data: Move) {
          if (input.gameId === data.gameId) {
            emit.data(data);
          }
        }

        ctx.eventEmitter.on(Events.SEND_MOVE, onMove);

        return () => {
          ctx.eventEmitter.off(Events.SEND_MOVE, onMove);
        };
      });
    },
  });
