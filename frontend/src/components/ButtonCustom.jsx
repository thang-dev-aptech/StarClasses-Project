import React from "react";

export const ButtonCustom = ({
  text = "Button",
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button onClick={onClick} className={` ${className}`} {...props}>
      {text}
    </button>
  );
};
