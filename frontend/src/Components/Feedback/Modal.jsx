import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const StyledModal = ({ children }) => (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      borderRadius: "var(--border-radius-lg)",
      padding: "2.8rem 2.5rem",
      transition: "all 0.5s",
    }}
    className="shadow-xl"
  >
    {children}
  </div>
);

const Overlay = ({ children }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      backgroundColor: "var(--backdrop-color)",
      backdropFilter: "blur(4px)",
      zIndex: 1000,
      transition: "all 0.5s",
    }}
  >
    {children}
  </div>
);

const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "none",
      border: "none",
      padding: "0.4rem",
      borderRadius: "var(--border-radius-sm)",
      transform: "translateX(0.8rem)",
      transition: "all 0.2s",
      position: "absolute",
      top: "1.2rem",
      right: "1.9rem",
    }}
  >
    {children}
  </button>
);

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>;
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      console.log("Windows name: " + opensWindowName);
      open(opensWindowName);
    },
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  console.dir(children); // children is ViewReview component or the modal that will show up

  const ref = useOutsideClick(close);

  if (name !== openName) return null;
  // else return null;

  // return createPortal(
  //   <Overlay>
  //     <StyledModal ref={ref}>
  //       <Button onClick={close}>
  //         <FontAwesomeIcon icon={faXmark} />
  //       </Button>

  //       {/* <div>{cloneElement(children, { onCloseModal: close })}</div> */}
  //     </StyledModal>
  //   </Overlay>,
  //   document.body
  // );
  console.dir(document.body);
  if (typeof document !== "undefined") {
    return createPortal(
      <Overlay>
        <StyledModal ref={ref}>
          <Button onClick={close}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </StyledModal>
      </Overlay>,
      document.body
    );
  } else {
    return null;
  }
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
