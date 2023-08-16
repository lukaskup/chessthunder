import { Session } from "./../../node_modules/.prisma/client/index.d";
import z from "zod";

export const createGameSchema = z.object({
  id: z.string(),
});

const gameSchema = z.object({
  id: z.string(),
});

export type Game = z.TypeOf<typeof gameSchema>;

const userGameSchema = z.object({
  id: z.string(),
  gameId: z.string(),
  userId: z.union([z.string(), z.undefined()]),
  sessionId: z.string(),
  position: z.enum(["BLACK", "WHITE"]),
});

export type UserGame = z.TypeOf<typeof userGameSchema>;

export const sendMoveSchema = z.object({
  gameId: z.string(),
  move: z.string(),
});

const moveSchema = z.object({
  id: z.string(),
  message: z.string(),
  gameId: z.string(),
  sentAd: z.date(),
  senderId: z.string(),
});

export type Move = z.TypeOf<typeof moveSchema>;

export const moveSubSchema = z.object({
  gameId: z.string(),
});

export const defaultGame = {
  endedAt: null,
  gameModeId: "test",
  moves: [],
  result: null,
  resultType: null,
  startedAt: new Date(),
  tournamentId: null,
};
