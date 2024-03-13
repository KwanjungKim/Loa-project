import { AllHTMLAttributes } from "react";

export interface DefaultSvgProps extends AllHTMLAttributes<HTMLOrSVGElement> {
  color?: string;
  width?: string;
}
