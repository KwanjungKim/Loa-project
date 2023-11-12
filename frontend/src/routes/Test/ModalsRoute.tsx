import { useState } from "react";
import { SmallButton } from "../../components/common/Button";
import { Modal } from "@mui/material";
import { AlertModal } from "../../components/common/Modal";

const ModalsRoute = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  return (
    <div>
      <Modal open={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <AlertModal text="hello world" onClose={() => setIsAlertOpen(false)} />
      </Modal>
      <SmallButton onClick={() => setIsAlertOpen(true)}>Alert</SmallButton>
    </div>
  );
};

export default ModalsRoute;
