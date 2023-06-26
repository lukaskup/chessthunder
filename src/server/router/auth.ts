import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";
import md5 from "md5";

export const authRouter = createRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .mutation("signup", {
    input: z.object({
      email: z.string().email(),
      name: z.string(),
      password: z.string(),
      passwordConfirm: z.string(),
    }),
    async resolve({ ctx }) {
      const { req, res } = ctx;
      if (!!!req) return res?.send(400);
      //@ts-ignore
      const user = req.body["0"].json;

      // if (user.password !== user.confirmPassword) return res?.send(400);

      await prisma?.user.create({
        data: {
          email: user.email,
          name: user.name,
          password: md5(user.password),
        },
      });

      return res?.send(200);
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("getSecretMessage", {
    async resolve({ ctx }) {
      return "You are logged in and can see this secret message!";
    },
  });
