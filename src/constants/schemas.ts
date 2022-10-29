import z from "zod";

export const createGameSchema = z.object({
  id: z.string(),
});

const gameSchema = z.object({
  id: z.string(),
});

export type Game = z.TypeOf<typeof gameSchema>;

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
