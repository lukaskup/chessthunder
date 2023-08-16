import { Move } from "../../../constants/schemas";
import { v4 as uuid4 } from "uuid";
import { useState, useRef, useEffect } from "react";
import { Button } from "../../UI/Button";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDoubleArrow,
  MdSwapVert,
  MdUndo,
  MdFlag,
} from "react-icons/md";

import { TbHeartHandshake } from "react-icons/tb";
import { Game } from "@prisma/client";
interface MovesInfoProps {
  moves: Move[];
  moveBack: () => void;
  gameInfo: Game;
}

type Proposal = "TAKEBACK" | "DRAW";

const Timer = () => {
  return (
    <div className="border rounded-md p-2 w-fit">
      <span className="text-4xl font-bold">05:00</span>
      <span className="text-xl font-bold">.00</span>
    </div>
  );
};

const chunk = (arr: Move[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const MovesInfo = ({ moves, moveBack }: MovesInfoProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(60000);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [resignConfirmation, setResignConfirmation] = useState(false);
  const movesList = chunk(moves, 2);
  const bottomChatElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomChatElement.current?.scrollIntoView({ behavior: "smooth" });
  }, [bottomChatElement, moves]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <Timer />
      <div className="flex flex-col border rounded-md h-full">
        <div className="flex">
          <Button customClassName="!rounded-none">
            {<MdSwapVert size={20} />}
          </Button>
          <Button customClassName="!rounded-none">
            {
              <MdDoubleArrow
                size={18}
                style={{ transform: "rotate(180deg)" }}
              />
            }
          </Button>
          <Button customClassName="!rounded-none">
            {<MdKeyboardArrowLeft size={20} onClick={moveBack} />}
          </Button>
          <Button customClassName="!rounded-none">
            {<MdKeyboardArrowRight size={20} />}
          </Button>
          <Button customClassName="!rounded-none">
            {<MdDoubleArrow size={18} />}
          </Button>
        </div>
        <div className="flex flex-col grow max-h-36">
          <div className="overflow-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
            {movesList.map((move) => (
              <div key={uuid4()} className="grid grid-cols-12">
                <div className="col-span-2 w-8 text-center border-r">
                  {movesList.indexOf(move) + 1}
                </div>
                <Button customClassName="col-span-5 text-center !rounded-none !border-none !p-0">
                  {move[0]?.message}
                </Button>
                {move[1] ? (
                  <Button customClassName="col-span-5 text-center !rounded-none !border-none !p-0">
                    {move[1].message}
                  </Button>
                ) : (
                  ""
                )}
              </div>
            ))}
            <div ref={bottomChatElement} />
          </div>
        </div>
        <div className="flex">
          {resignConfirmation ? (
            <>do u want to resign?</>
          ) : proposal ? (
            <>some proposal</>
          ) : (
            <>
              <Button
                customClassName="!rounded-none"
                onClick={() => setProposal("TAKEBACK")}
              >
                {<MdUndo size={20} />}
              </Button>
              <Button
                customClassName="!rounded-none"
                onClick={() => setResignConfirmation(true)}
              >
                {<MdFlag size={20} />}
              </Button>
              <Button
                customClassName="!rounded-none"
                onClick={() => setProposal("TAKEBACK")}
              >
                {<TbHeartHandshake size={18} />}
              </Button>
            </>
          )}
        </div>
      </div>
      <Timer />
    </div>
  );
};
