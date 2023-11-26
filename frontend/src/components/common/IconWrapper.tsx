import React from "react";

interface IIconWrapperProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const IconWrapper = ({ children, ...props }: IIconWrapperProps) => {
  return (
    <button
      style={{
        background: "inherit",
        border: "none",
        borderSpacing: 0,
        color: "inherit",
        fontFamily: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        lineHeight: "inherit",
        listStyle: "none outside none",
        margin: 0,
        padding: 0,
        textAlign: "inherit",
        textDecoration: "none",
        textIndent: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      tabIndex={0}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconWrapper;
