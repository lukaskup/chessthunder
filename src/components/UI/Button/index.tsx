import { IconType } from "react-icons/lib";

interface ButtonProps {
  content: string | JSX.Element;
  onClick: () => void;
  customClassName?: string;
}

export const Button = ({ content, onClick, customClassName }: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center border border-slate-300/10 hover:bg-slate-300/10 ease-in-out duration-300 text-gray-900 text-sm rounded-lg w-full p-3 ${customClassName}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
