import React from "react";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

export default function Nav({ ...props }: Props) {
  return <nav {...props}>navigation</nav>;
}
