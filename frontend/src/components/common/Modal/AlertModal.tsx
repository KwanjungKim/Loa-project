import React from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

// styles
import styles from "./AlertModal.module.scss";
import { LargeButton } from "../Button";
import { Typography } from "@mui/material";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const AlertModal = ({ text, onClose, onConfirm, ...props }: Props) => {
  return (
    <div className={styles.wrapper} {...props}>
      <div>
        <ClearRoundedIcon
          style={{ cursor: "pointer" }}
          htmlColor="var(--dark)"
          onClick={onClose}
        />
      </div>
      <Typography color={"var(--dark)"}>{text}</Typography>
      <LargeButton
        variant="contained"
        onClick={() => {
          onConfirm ? onConfirm() : onClose();
        }}
      >
        확인
      </LargeButton>
    </div>
  );
};

export default AlertModal;
