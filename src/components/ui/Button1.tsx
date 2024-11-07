import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "large";
  children: React.ReactNode;
}

const Button = (props: IButtonProps) => {
  const { size = "large", children, className, ...remaining } = props;

  const sizeClasses = {
    large: "text-xl py-4 px-8",
    small: "text-base py-3 px-6",
  };

  return (
    <button
      className={`  items-center justify-center ring-1 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${sizeClasses[size]} ${className}`}
      {...remaining}
    >
      {children}
    </button>
  );
};

export default Button;
