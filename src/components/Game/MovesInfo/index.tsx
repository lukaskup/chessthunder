import { Move } from "../../../constants/schemas";
import { v4 as uuid4 } from "uuid";
import { useState } from "react";
import { Button } from "../../UI/Button";
import SwapIcon from "../../../assets/icons/SwapIcon.svg";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon.svg";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon.svg";
import DoubleArrowRightIcon from "../../../assets/icons/DoubleArrowRightIcon.svg";
import DoubleArrowLeftIcon from "../../../assets/icons/DoubleArrowLeftIcon.svg";
import Image from "next/image";
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

const chunk = (arr: Move[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const MovesInfo = ({ moves }: MovesInfoProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(60000);
  const movesList = chunk(moves, 2);
  return (
    <div className="flex flex-col gap-4 h-full">
      <Timer />
      <div className="border rounded-md h-full">
        <div className="flex">
          <Button
            content={<Image src={SwapIcon} alt="swap icon" />}
            customClassName="rounded-none"
          />
          <Button
            content={<Image src={DoubleArrowLeftIcon} alt="swap icon" />}
            customClassName="rounded-none"
          />
          <Button
            content={<Image src={ArrowLeftIcon} alt="swap icon" />}
            customClassName="rounded-none"
          />
          <Button
            content={<Image src={ArrowRightIcon} alt="swap icon" />}
            customClassName="rounded-none"
          />
          <Button
            content={<Image src={DoubleArrowRightIcon} alt="swap icon" />}
            customClassName="rounded-none"
          />
        </div>
        {movesList.map((move) => (
          <div key={uuid4()} className="grid grid-cols-12">
            <div className="col-span-2 w-8 text-center border-r">
              {movesList.indexOf(move) + 1}
            </div>
            <div className="col-span-5 text-center">{move[0]?.message}</div>
            {move[1] ? (
              <div className="col-span-5 text-center">{move[1].message}</div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <Timer />
    </div>
  );
};
