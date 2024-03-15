import { DefaultSvgProps } from ".";

interface Props extends DefaultSvgProps {
  type: "top" | "bottom" | "left" | "right";
}

export default function DirectionDownSvg({
  color = "rgba(var(--font), 1)",
  type = "bottom",
  ...props
}: Props) {
  return (
    <svg
      fill={color}
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform:
          type === "top"
            ? "rotate(180deg)"
            : type === "bottom"
            ? "rotate(0deg)"
            : type === "left"
            ? "rotate(90deg)"
            : "rotate(-90deg)",
      }}
      {...props}
    >
      <path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
    </svg>
  );
}
