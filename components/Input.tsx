import React, { FC } from "react";
type InputProps = {
  type: string;
  placeholder: string;
  className?: string;
  width?: string;
  fromColor?: string;
  toColor?: string;
  textColor?: string;
};
const Input: FC<InputProps> = ({
  type,
  placeholder,
  className,
  width = "",
  fromColor = "gray-500", // Default
  toColor = "primary-color", // Default
  textColor = "text-gray-50", // Default
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`ml-2 py-1 px-3 text-sm rounded-lg h-[30px] ${textColor} bg-gradient-to-r ${width} from-${fromColor} 
        to-${toColor} ${className}`}
    />
  );
};
export default Input;
