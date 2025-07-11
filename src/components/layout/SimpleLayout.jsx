import React from 'react';
import '../../styles/layout.css';

const SimpleLayout = ({ children }) => {
  return (
    <div className="simple-layout">
      <main className="main-content">{children}</main>
    </div>
  );
};

export default SimpleLayout;