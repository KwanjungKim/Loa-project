import React from "react";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

export default function Header({ ...props }: Props) {
  return <div {...props}>index</div>;
}
