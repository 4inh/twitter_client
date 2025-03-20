import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`border p-2 rounded w-full my-4 h-15 focus:border-blue-500 focus:outline-none ${className}`}
      {...props}
    />
  );
};

export default Input;

