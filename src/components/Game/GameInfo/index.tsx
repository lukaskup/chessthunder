import Image from "next/image";
import BoltIcon from "../../../assets/icons/BoltIcon.svg";

interface PlayerInfo {
  color: "black" | "white";
  name: string;
  rank: number;
}

const PlayerInfo = ({ color, name, rank }: PlayerInfo) => {
  return (
    <div className="flex gap-2">
      <div
        className={`h-3 w-3 border-2 rounded-full translate-y-[7px] ${
          color === "white" ? "bg-white" : ""
        }`}
      />
      <div className={"text-md"}>
        {name} ({rank})
      </div>
    </div>
  );
};

export const GameInfo = () => {
  return (
    <div className="border rounded-md p-3 pl-0">
      <div className="grid grid-cols-5">
        <div className="grid col-span-1">
          <Image
            className={`absolute icon`}
            style={{ margin: "auto" }}
            src={BoltIcon}
            width={32}
            height={32}
            alt={"game mode icon"}
          />
        </div>
        <div className="col-span-4">
          <div className="text-sm font-bold">2+1 · CASUAL · BULLET</div>
          <div className="text-sm">right now</div>
        </div>
      </div>
      <div className="mt-3 pl-3">
        <PlayerInfo color="white" name="isuckatchess123" rank={1123} />
        <PlayerInfo color="black" name="isuckatchess123" rank={1123} />
      </div>
    </div>
  );
};
