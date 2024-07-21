import React from "react";
import "./Modal.css";
import CloseButton from "../close-button/CloseButton";

interface ModalProps {
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  // Add your component logic here

  return (
    <div className={`modal-container`}>
      <div className="modal-header">
        <CloseButton />
      </div>
      <div className="modal-content">{props.children}</div>
    </div>
  );
};

export default Modal;
