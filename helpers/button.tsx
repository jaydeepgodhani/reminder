import { ReactNode } from "react";

export default function Button({
  bgColor = "#f5f5ee",
  textColor = "white",
  onClick,
  children,
}: {
  bgColor?: string;
  textColor?: string;
  onClick: () => void;
  children: ReactNode;
}) {
  const colorclass =
    "rounded-lg md:rounded-full px-4 py-2 md:px-6 md:py-3 cursor-pointer hover:-translate-y-[1px] transition duration-150 ease-in-out active:-translate-y-0 active:opacity-75";

  return (
    <button
      onClick={onClick}
      className={colorclass}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: "2px solid black",
        boxSizing: "border-box",
      }}
    >
      {children}
    </button>
  );
}
