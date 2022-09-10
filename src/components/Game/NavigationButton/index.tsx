import Image from "next/image";

interface NavigationButtonProps {
  iconSrc: string;
  iconAlt: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const NavigationButton = ({
  iconSrc,
  iconAlt,
  onClick,
  disabled,
}: NavigationButtonProps) => {
  return (
    <div
      className={`p-4 flex justify-center ${disabled ? "" : "cursor-pointer"}`}
    >
      <Image
        className={`icon ${
          disabled ? "disabled" : ""
        } h-8 w-8 rounded-full m-auto`}
        style={{ margin: "auto" }}
        src={iconSrc}
        width={32}
        height={32}
        alt={iconAlt}
        onClick={onClick}
      />
    </div>
  );
};
