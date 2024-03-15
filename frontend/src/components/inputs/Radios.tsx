import React from "react";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

export default function Radios({ title, children, ...props }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
      {...props}
    >
      <div>{title}</div>
      {children}
    </div>
  );
}

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

Radios.Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, ...props },
  ref,
) {
  return (
    <div>
      <input type="radio" {...props} ref={ref} />
      <label htmlFor={props.id}>{label}</label>
    </div>
  );
});
