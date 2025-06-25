import { useEffect, useRef, useState } from "react";
import useOutsideClick from "./useOutsideClick";
import { createPortal } from "react-dom";

const ACTIVE_MODAL_CLASS = "modal--active";
const NOT_ACTIVE_MODAL_CLASS = "modal--not-active";

export default function useModal(
  { appId }: { appId: string } = { appId: "app" }
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
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

  const toggleModal = () => {
    if (isModalOpen) {
      hideModal();
    } else {
      showModal();
    }
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
    modalRef: dialogRef,
    toggleModal,
    Overlay: () =>
      createPortal(<div id="overlay"></div>, document.getElementById(appId)!),
  };
}
