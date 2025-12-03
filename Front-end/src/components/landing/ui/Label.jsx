// components/ui/Label.jsx
import { cn } from '../../utils/cn'; // Importa a utilidade

const Label = ({ children, className, ...props }) => (
  <label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block text-slate-700", className)} {...props}>
    {children}
  </label>
);

export default Label;