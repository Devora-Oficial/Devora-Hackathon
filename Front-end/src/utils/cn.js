// utils/cn.js

// Função utilitária para combinar classes CSS
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}