"use client";

import { ReactElement } from "react";

type Props = {
  text?: string;
  icon?: ReactElement;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

function Button({ text, onClick, className, type = "button", icon }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white  
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
      cursor-pointer
      ${className}`}
    >
      {text || icon || "Przycisk"}
    </button>
  );
}

export default Button;
