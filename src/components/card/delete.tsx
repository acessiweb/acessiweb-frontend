"use client";

import useModal from "@/hooks/useModal";
import { CardDeleteProps } from "@/types/card";
import { createPortal } from "react-dom";
import { SlTrash } from "react-icons/sl";

export default function CardDelete({
  onDelete,
  registerId,
  registerName,
}: CardDeleteProps) {
  const { Overlay, hideModal, isModalOpen, modalRef, showModal } = useModal();

  const handleConfirmation = () => {
    if (onDelete) {
      onDelete(registerId);
      hideModal();
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn-transparent btn-delete"
        aria-label="Ação de deletar"
        onClick={showModal}
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        aria-controls="delete-modal"
      >
        <SlTrash aria-hidden={true} focusable={false} />
      </button>
      {isModalOpen &&
        createPortal(
          <dialog
            className="modal"
            ref={modalRef}
            aria-label="Confirmar ação de deletar"
            aria-modal={true}
            id="delete-modal"
          >
            <p>Tem certeza que deseja excluir &quot;{registerName}&quot;?</p>
            <div className="buttons">
              <button
                className="btn-transparent delete"
                onClick={handleConfirmation}
              >
                Sim
              </button>
              <button
                className="btn-transparent not-delete"
                onClick={hideModal}
              >
                Cancelar
              </button>
            </div>
          </dialog>,
          document.getElementById("app")!
        )}
      {isModalOpen && <Overlay />}
    </>
  );
}
