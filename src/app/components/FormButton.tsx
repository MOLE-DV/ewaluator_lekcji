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
      bg-purple-700
      p-3
      px-6
      rounded-full
      hover:bg-white
      hover:text-purple-700
      focus:bg-white
      focus:text-purple-700
      border-2
      border-purple-700
      transition-colors
      duration-300
      cursor-pointer"
      value={text || "Przycisk"}
    />
  );
}
