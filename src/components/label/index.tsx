import React from 'react';

interface LabelProps {
  text: string;
  htmlFor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, className, style }) => {
  return (
    <label htmlFor={htmlFor} className={"pb-1 block text-sm font-medium leading-6 text-gray-900"} style={style}>
      {text}
    </label>
  );
};

export default Label;