import { createRouter } from "./context";
import { z } from "zod";

export const apiRouter = createRouter().query("gameModes", {
  async resolve({ ctx }) {
    return ["1+0", "2+1", "3+0", "3+2", "5+0", "5+3", "10+0", "10+5", "Custom"];
  },
});
