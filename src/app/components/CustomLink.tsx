"use client";
import Link from "next/link";

type Props = {
  text?: string;
  href: string;
  className?: string;
};

function CustomLink({ text, href, className }: Props) {
  return (
    <Link
      href={href}
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
      duration-300 ${className}`}
    >
      {text || "Przycisk"}
    </Link>
  );
}

export default CustomLink;
