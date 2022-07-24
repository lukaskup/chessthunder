import { createRouter } from "./context";

export const apiRouter = createRouter()
  .query("gameModes", {
    async resolve({ ctx }) {
      return [
        "1+0",
        "2+1",
        "3+0",
        "3+2",
        "5+0",
        "5+3",
        "10+0",
        "10+5",
        "Custom",
      ];
    },
  })
  .query("gamesList", {
    async resolve({ ctx }) {
      return [
        { player: "franke123", rating: 1235, mode: "2+1" },
        { player: "player1", rating: 1335, mode: "3+1" },
        { player: "Otakio", rating: 1435, mode: "10+1" },
        { player: "verylongnameofsomeuser", rating: 1535, mode: "5+3" },
        { player: "JanekWitkoski", rating: 1635, mode: "10+0" },
        { player: "sukkmakookk", rating: 1735, mode: "5+0" },
        { player: "duwapkayn", rating: 1835, mode: "1+0" },
        { player: "Sikorka", rating: 1935, mode: "1+1" },
        { player: "Ktostam", rating: 2235, mode: "6+9" },
        { player: "czemunie", rating: 3235, mode: "1+10" },
      ];
    },
  });
