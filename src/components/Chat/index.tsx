import Image from "next/image";
import { useState } from "react";
import SendIcon from "../../assets/icons/SendIcon.svg";

export const Chat = () => {
  const [message, setMessage] = useState<string>("");

  return (
    <div className="relative border rounded-md mt-2 h-full max-h-96 p-4">
      <div className="messages"></div>
      <div className="absolute flex bottom-4 margin-auto left-4 right-4 grid grid-cols-12">
        <input
          type="text"
          title="message"
          className="bg-main focus:outline-none text-white col-span-8"
          placeholder="type smth"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className="flex justify-end text-center col-span-4"
          aria-hidden="true"
        >
          <Image src={SendIcon} alt="send icon" height="24" width="24" />
        </button>
      </div>
    </div>
  );
};
