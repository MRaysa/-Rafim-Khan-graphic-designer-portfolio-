import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  href,
  target,
  rel,
  disabled = false,
  type = 'button',
  fullWidth = false,
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl focus:ring-pink-500",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white shadow-md hover:shadow-lg focus:ring-gray-500",
    outline: "border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white focus:ring-pink-500",
    ghost: "text-pink-500 hover:bg-pink-500/10 focus:ring-pink-500"
  };
  
  const sizeStyles = {
    sm: "text-xs py-2 px-3 rounded",
    md: "text-sm py-2.5 px-5 rounded-md",
    lg: "text-base py-3 px-6 rounded-md"
  };
  
  const disabledStyles = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
  const widthStyles = fullWidth ? "w-full" : "";
  
  const buttonClasses = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${disabledStyles} 
    ${widthStyles} 
    ${className}
  `;
  
  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );
  
  if (href && !disabled) {
    return (
      <a 
        href={href} 
        target={target} 
        rel={rel}
        className={buttonClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }
  
  return (
    <button 
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;