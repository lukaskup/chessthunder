import Link from "next/link";
import { IconType } from "react-icons/lib";

interface ButtonProps {
  content: string | JSX.Element;
  onClick?: () => void;
  customClassName?: string;
  href?: string;
}

export const Button = ({
  content,
  onClick,
  customClassName,
  href,
}: ButtonProps) => {
  const className = `flex justify-center items-center border border-slate-300/10 hover:bg-slate-300/10 ease-in-out duration-300 text-gray-900 text-sm rounded-lg w-full p-3 ${customClassName}`;

  return href ? (
    <Link href={href}>
      <div className={className}>{content}</div>
    </Link>
  ) : (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
};
