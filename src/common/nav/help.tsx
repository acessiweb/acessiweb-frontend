import useModal from "@/hooks/useModal";
import { useScreenType } from "@/hooks/useScreenType";
import { createPortal } from "react-dom";
import { IoHelp } from "react-icons/io5";
import { SlClose } from "react-icons/sl";

type HelpProps = {
  appId: string;
};

export default function Help({ appId }: HelpProps) {
  const {
    showModal,
    hideModal,
    isModalOpen,
    isOverlayActive,
    modalRef,
    Overlay,
  } = useModal({ appId });
  const { isDesktop } = useScreenType();

  return (
    <>
      <div className="nav__help">
        <button
          onClick={showModal}
          aria-label="Abrir atalhos por teclado"
          title="Ajuda"
          aria-pressed={isModalOpen}
          className={`${isDesktop && "btn-icon"}`}
        >
          <IoHelp aria-hidden={true} focusable={false} />
        </button>
        <dialog
          className="modal"
          ref={modalRef}
          aria-label="Atalhos por teclado"
          aria-modal={true}
        >
          <div>
            <div>
              Você está no Acessiweb, que irá te auxiliar com a acessibilidade
              em seus projetos
            </div>
            <div>Comandos para utilizar com teclado</div>
            <div>
              <div>TAB</div>
            </div>
          </div>
          <button
            onClick={hideModal}
            aria-label="Fechar atalhos por teclado"
            title="Fechar"
            autoFocus={true}
          >
            <SlClose aria-hidden={true} focusable={false} />
          </button>
        </dialog>
      </div>
      {isOverlayActive && <Overlay />}
    </>
  );
}
