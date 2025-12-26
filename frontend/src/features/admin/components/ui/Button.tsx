import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) => {
  
  const baseStyle = "px-4 py-2 font-bold transition-all duration-200 rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Brand 500 es tu #ee2a2a. Shadow-button es tu sombra roja suave.
    primary: "bg-brand-500 text-white shadow-button hover:bg-brand-600 active:bg-brand-700",
    outline: "border border-neutral-300 text-neutral-700 hover:border-brand-500 hover:text-brand-500 bg-white shadow-card",
    ghost: "text-neutral-600 hover:bg-neutral-100 hover:text-brand-600"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};