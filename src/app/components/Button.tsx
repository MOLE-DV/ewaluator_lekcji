"use client";

type Props = {
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

function Button({ text, onClick, className, type = "button" }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white  
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
      cursor-pointer
      ${className}`}
    >
      {text || "Przycisk"}
    </button>
  );
}

export default Button;
