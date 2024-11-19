import React from "react";

interface TitleProps {
  title: string;
  description: string;
}

const Title: React.FC<TitleProps> = ({ title, description }) => {
  return (
    <h1 className="text-3xl font-bold text-gray-800">
      {title}: <span >{description}</span>
    </h1>
  );
};

export default Title;
