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
      className={` bg-background text-foreground hover:bg-accent shadow-[inset_0_0_0_2px] shadow-foreground-light active:shadow-foreground rounded-xl ${sizeClasses[size]} ${className}`}
      {...remaining}
    >
      {children}
    </button>
  );
};

export default Button;
