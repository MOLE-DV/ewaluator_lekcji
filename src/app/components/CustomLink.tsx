"use client";
import Link from "next/link";
import { ReactElement } from "react";

type Props = {
  text?: string;
  href: string;
  icon?: ReactElement;
  className?: string;
};

function CustomLink({ text, href, className, icon }: Props) {
  return (
    <Link
      href={href}
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
    </Link>
  );
}

export default CustomLink;
