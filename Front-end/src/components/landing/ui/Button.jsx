// components/ui/Button.jsx
import React from 'react';
import { cn } from '../../utils/cn'; // Importa a utilidade

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow",
    ghost: "hover:bg-slate-100 text-slate-700",
    outline: "border border-slate-200 bg-transparent shadow-sm hover:bg-slate-100 text-slate-900",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow"
  };
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    icon: "h-9 w-9"
  };
  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});
Button.displayName = "Button";

export default Button;