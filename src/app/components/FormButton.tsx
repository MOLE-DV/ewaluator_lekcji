"use client";

type Props = {
  text?: string;
  onClick?: () => void;
  type: "submit" | "reset";
};

export default function Formbutton({ text, type }: Props) {
  return (
    <input
      type={type}
      className="text-white
      bg-purple-500
      p-2
      px-2
      md:px-6
      rounded-full
      hover:bg-white
      hover:text-purple-500
      focus:bg-white
      focus:text-purple-500
      border-2
      border-purple-500
      transition-colors
      duration-300
      cursor-pointer"
      value={text || "Przycisk"}
    />
  );
}
