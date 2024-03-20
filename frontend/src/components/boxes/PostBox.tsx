import React from "react";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function PostBox({ children, ...props }: Props) {
  return <div {...props}>{children}</div>;
}
