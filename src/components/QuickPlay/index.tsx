import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { v4 as uuidv4 } from "uuid";

export const QuickPlay = () => {
  const router = useRouter();

  const { data: modes } = trpc.useQuery(["api.gameModes"]);
  const { mutateAsync } = trpc.useMutation(["game.createGame"]);

  const createGame = () => {
    const gameId = uuidv4();
    const game = {
      id: gameId,
    };

    mutateAsync(game).then(() => {
      router.push(`/game/${gameId}`);
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {modes &&
        modes.map((mode: any) => (
          <div
            key={mode}
            className="border border-slate-300/20 rounded aspect-square flex items-center justify-center hover:bg-slate-300/10 ease-in-out duration-300 cursor-pointer"
            onClick={createGame}
          >
            <span className="text-xl">{mode}</span>
          </div>
        ))}
    </div>
  );
};
