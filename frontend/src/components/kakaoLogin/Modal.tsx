import { createPortal } from "react-dom";
import { useState } from "react";

import HelpOutlineRounded from "@mui/icons-material/HelpOutlineRounded";

import AuthHelp from "./CharacterAuthModal";

const ModalPortal = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const el = document.getElementById("modal-potal") as HTMLElement;

  return (
    <>
      <HelpOutlineRounded onClick={() => setIsModal(true)} />
      {isModal &&
        createPortal(<AuthHelp onClose={() => setIsModal(false)} />, el)}
    </>
  );
};

export default ModalPortal;
