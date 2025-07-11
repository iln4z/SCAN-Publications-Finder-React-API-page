import React from 'react';
import '../../styles/input.css';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  error = null,
  ...props
}) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'error' : ''}
        {...props}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Input;