import React from "react";
type InputProps = {
  type: string;
  placeholder: string;
  className?: string;
};
const Input = ({ type, placeholder, className }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`ml-2 py-1 px-3 text-sm rounded-lg  w-40 h-[30px] bg-gradient-to-r from-gray-500 to-primary-color ${className}`}
    />
  );
};
export default Input;
