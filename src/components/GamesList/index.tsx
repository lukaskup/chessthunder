import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";

//TODO create GameMode interface and example data
export const GamesList: NextPage = () => {
  const { data: games } = trpc.useQuery(["api.gamesList"]);
  return (
    <div className="border border-slate-300/20 rounded">
      {games &&
        games.map((game: any) => {
          return <div key={game.player}>{game.player}</div>;
        })}
    </div>
  );
};
