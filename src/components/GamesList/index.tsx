import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";

//TODO create GameMode interface and example data
export const GamesList: NextPage = () => {
  const { data: games } = trpc.useQuery(["api.gamesList"]);
  return (
    <div className="border border-slate-300/20 rounded px-6 sm:px-12 py-6">
      <table className="table-fixed text-left w-full">
        <thead className="font-bold border-b border-slate-300/40">
          <tr>
            <th>Player</th>
            <th className="text-center">Mode</th>
            <th className="text-right">Rating</th>
          </tr>
        </thead>
        <tbody>
          {games &&
            games.map((game: any) => {
              return (
                <tr
                  key={game.player}
                  className="border-b border-slate-300/20 h-12 last:border-0 hover:bg-slate-300/10 ease-in-out duration-300 cursor-pointer"
                >
                  <td className="text-ellipsis overflow-hidden">
                    {game.player}
                  </td>
                  <td className="text-center">{game.mode}</td>
                  <td className="text-right">{game.rating}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
