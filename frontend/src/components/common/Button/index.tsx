import { ButtonProps } from "@mui/material";

// components
import SmallButton from "./SmallButton";
import MediumButton from "./MediumButton";
import LargeButton from "./LargeButton";

export interface IButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export { SmallButton, MediumButton, LargeButton };
