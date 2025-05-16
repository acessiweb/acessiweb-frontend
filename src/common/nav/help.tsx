import useModal from "@/hooks/useModal";
import useScreenSize from "@/hooks/useScreenSize";
import { IoHelp } from "react-icons/io5";
import { SlClose } from "react-icons/sl";
import { TABLET_SCREEN_SIZE } from "../utils/var";

export default function Help() {
  const {
    showModal,
    hideModal,
    isModalOpen,
    isOverlayActive,
    Overlay,
    modalRef,
  } = useModal();
  const { screenSize } = useScreenSize();

  return (
    <>
      <div className="nav__help">
        <button
          onClick={showModal}
          aria-label="Abrir atalhos por teclado"
          title="Ajuda"
          aria-pressed={isModalOpen}
          className={`${screenSize.width >= TABLET_SCREEN_SIZE && "btn-icon"}`}
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
