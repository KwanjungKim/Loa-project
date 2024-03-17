import { DefaultSvgProps } from ".";

interface Props extends DefaultSvgProps {}

export default function BurgerSvg({
  color = "rgba(var(--font), 1)",
  ...props
}: Props) {
  return (
    <svg
      fill={color}
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19 10.625H1v-1.25h18v1.25Zm0-7.875H1V4h18V2.75ZM19 16H1v1.25h18V16Z"></path>
    </svg>
  );
}
