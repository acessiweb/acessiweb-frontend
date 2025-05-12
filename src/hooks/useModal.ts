import { ACTIVE_MODAL_CLASS, NOT_ACTIVE_MODAL_CLASS } from "@/common/utils/var";
import { useEffect, useRef, useState } from "react";
import useOverlay from "./useOverlay";
import useOutsideClick from "./useOutsideClick";

export default function useModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {
    isActive: isOverlayActive,
    Overlay,
    setIsActive: setIsOverlayActive,
  } = useOverlay();
  const { outsideClicked } = useOutsideClick(dialogRef, ACTIVE_MODAL_CLASS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addActive = (el: HTMLElement) => {
    if (el) {
      el.classList.add(ACTIVE_MODAL_CLASS);
      el.classList.remove(NOT_ACTIVE_MODAL_CLASS);
    }
  };

  const removeActive = (el: HTMLElement) => {
    if (el) {
      el.classList.add(NOT_ACTIVE_MODAL_CLASS);
      el.classList.remove(ACTIVE_MODAL_CLASS);
    }
  };

  const cleanPrevActiveModal = () => {
    const modalActive = document.querySelector<HTMLDialogElement>(
      `.${ACTIVE_MODAL_CLASS}`
    );

    if (modalActive) {
      removeActive(modalActive);
    }
  };

  const showModal = () => {
    cleanPrevActiveModal();
    addActive(dialogRef.current!);
    setIsModalOpen(true);
    setIsOverlayActive(true);
  };

  const hideModal = () => {
    removeActive(dialogRef.current!);
    setIsModalOpen(false);
    setIsOverlayActive(false);
  };

  useEffect(() => {
    if (outsideClicked) {
      hideModal();
    }
  }, [outsideClicked]);

  return {
    showModal,
    hideModal,
    isModalOpen,
    isOverlayActive,
    Overlay,
    modalRef: dialogRef,
  };
}
