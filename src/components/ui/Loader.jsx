import React from 'react';
import '../../styles/loader.css';

const Loader = ({ size = 'medium' }) => {
  return (
    <div className={`loader ${size}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;