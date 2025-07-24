import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function useModal(
  { appId }: { appId: string } = { appId: "app" }
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    if (isModalOpen) {
      hideModal();
    } else {
      showModal();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!dialogRef.current) {
      return;
    }

    if (dialogRef.current && !dialogRef.current.contains(target)) {
      hideModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return {
    showModal,
    hideModal,
    isModalOpen,
    modalRef: dialogRef,
    toggleModal,
    Overlay: () =>
      createPortal(<div id="overlay"></div>, document.getElementById(appId)!),
  };
}
