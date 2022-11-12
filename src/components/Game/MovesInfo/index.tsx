import { Move } from "../../../constants/schemas";
import { v4 as uuid4 } from "uuid";
import { useState } from "react";

interface MovesInfoProps {
  moves: Move[];
}

const Timer = () => {
  return (
    <div className="border rounded-md p-2 w-fit">
      <span className="text-4xl font-bold">05:00</span>
      <span className="text-xl font-bold">.00</span>
    </div>
  );
};

export const MovesInfo = ({ moves }: MovesInfoProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(60000);
  console.log(moves);
  // const [list, chunkSize] = [moves, 2];
  // const movesList = [...Array(Math.ceil(list.length / chunkSize))].map((_) =>
  //   list.splice(0, chunkSize)
  // );

  return (
    <div className="flex flex-col gap-4 h-full">
      <Timer />
      <div className="border rounded-md h-full">
        {/* {movesList.map((move) => (
          <div key={uuid4()} className="flex">
            <div>{movesList.indexOf(move) + 1}</div>
            <div>{move[0]?.message}</div>
            {move[1] ? <div>{move[1].message}</div> : ""}
          </div>
        ))} */}
      </div>
      <Timer />
    </div>
  );
};
