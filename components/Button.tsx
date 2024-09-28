import React, { FC } from "react";
interface ButtonProps {
  text: string;
  className?: string;
  fromColor?: string;
  toColor?: string;
  bgGradientColor?: string;
  bgColor?: string;
  textColor?: string;
}
const Button: FC<ButtonProps> = ({
  text,
  className = "",
  fromColor = "secondary-color", // Default
  toColor = "primary-color", // Default
  bgColor = "",
  textColor = "text-gray-900", // Default text color
}) => {
  return (
    <button
      className={`h-[30px] px-3 py-1 rounded-lg text-sm 
        bg-gradient-to-r
        from-${fromColor} 
        to-${toColor}
        ${bgColor} ${className}
        ${textColor}`}
    >
      {text}
    </button>
  );
};

export default Button;
