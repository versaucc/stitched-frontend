import React from 'react';

interface TransparentTextBoxProps {
  children: React.ReactNode;
  className?: string;
}

const TransparentTextBox: React.FC<TransparentTextBoxProps> = ({ children, className = '' }) => (
  <div
    className={`absolute top-0 left-0 px-1 py-1 bg-black bg-opactity-60 text-white text-sm z-10 ${className}`}
    style={{ pointerEvents: 'none' }}
  >
    {children}
  </div>
);

export default TransparentTextBox;