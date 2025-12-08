"use client";

type Props = {
  type: string;
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  minLength?: number;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  denyRegex?: RegExp;
  allowSpaces?: boolean;
};

export default function Input({
  type,
  id,
  name,
  placeholder,
  className,
  onChange,
  minLength,
  maxLength,
  required,
  denyRegex,
  allowSpaces = true,
}: Props) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onBeforeInput={(e: any) => {
        if (
          e.data &&
          ((denyRegex && denyRegex.test(e.data)) ||
            (!allowSpaces && e.data === " "))
        ) {
          e.preventDefault();
        }
      }}
      onChange={onChange}
      className={`border border-purple-500 rounded-full p-3 px-5 w-100 outline-none placeholder: text-purple-600 ${className} bg-white`}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
    />
  );
}
