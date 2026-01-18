import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg transition-all duration-200';
  
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground',
    disabled: 'opacity-50 cursor-not-allowed'
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      type={type as 'button' | 'submit' | 'reset' | undefined}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? variantStyles.disabled : 'cursor-pointer'} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
