import React from 'react';

type BadgeType = 'discount' | 'neutral' | 'success' | 'warning';

interface BadgeProps {
  children: React.ReactNode;
  type?: BadgeType;
}

export const Badge = ({ children, type = 'discount' }: BadgeProps) => {
  const styles: Record<BadgeType, string> = {
    // Tu gradiente específico para descuentos
    discount: "bg-gradient-to-r from-brand-500 to-brand-700 text-white",
    neutral: "bg-neutral-200 text-neutral-700",
    success: "bg-success text-white", // definiste success en tailwind.config
    warning: "bg-warning text-white"
  };

  return (
    <span className={`${styles[type]} text-xs font-bold px-2 py-1 rounded shadow-sm inline-block`}>
      {children}
    </span>
  );
};