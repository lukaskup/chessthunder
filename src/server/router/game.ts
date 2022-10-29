import { Events } from "../../constants/events";
import {
  createGameSchema,
  Game,
  sendMoveSchema,
  Move,
  moveSubSchema,
} from "./../../constants/schemas";

import { createRouter } from "./context";
import * as trpc from "@trpc/server";
import { v4 as uuidv4 } from "uuid";

export const gameRouter = createRouter()
  .mutation("createGame", {
    input: createGameSchema,
    resolve: async ({ ctx, input }) => {
      const game: Game = {
        id: uuidv4(),
      };

      ctx.eventEmitter.emit(Events.CREATE_GAME, game);

      await prisma?.game.create({ data: game });

      return true;
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
