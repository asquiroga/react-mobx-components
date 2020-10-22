import React from "react";
import { createPortal } from "react-dom";

const GlobalModal = ({ text }: { text: string }) => {
  return createPortal(<span>{text}</span>, document.getElementById("modals"));
};

export default GlobalModal;
