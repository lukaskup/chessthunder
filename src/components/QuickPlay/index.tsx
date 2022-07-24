import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";

//TODO create GameMode interface and example data
export const QuickPlay: NextPage = () => {
  const { data: modes } = trpc.useQuery(["api.gameModes"]);
  return (
    <div className="grid grid-cols-3 gap-4">
      {modes &&
        modes.map((mode: any) => (
          <div
            key={mode}
            className="border border- rounded h-48 flex items-center justify-center"
          >
            {mode}
          </div>
        ))}
    </div>
  );
};
