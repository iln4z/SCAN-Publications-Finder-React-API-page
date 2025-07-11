import React from 'react';
import '../../styles/button.css';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const classNames = `btn ${variant} ${fullWidth ? 'full-width' : ''} ${className}`;

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;