import useModal from "@/hooks/useModal";
import { useScreenType } from "@/hooks/useScreenType";
import { IoHelp } from "react-icons/io5";
import { SlClose } from "react-icons/sl";
import { useHotkeys } from "react-hotkeys-hook";
import { symbolMap } from "../utils/voice-commands";

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

  const toggleModal = () => {
    if (isModalOpen) {
      hideModal();
    } else {
      showModal();
    }
  };

  useHotkeys("h", toggleModal);

  return (
    <>
      <div className="nav__help">
        <button
          onClick={showModal}
          aria-label="Abrir painel de atalhos do sistema"
          title="Ajuda H"
          className={`${isDesktop && "btn-icon"}`}
          aria-haspopup="dialog"
          aria-expanded={isModalOpen}
          aria-controls="help-modal"
        >
          <IoHelp aria-hidden={true} focusable={false} />
        </button>
        <dialog
          className="modal"
          ref={modalRef}
          aria-label="Painel de atalhos do sistema"
          aria-modal={true}
          id="help-modal"
        >
          <div className="nav__help__modal__content">
            <div className="nav__help__modal__content__header">
              Você está no Acessiweb, que irá te auxiliar com a acessibilidade
              em seus projetos
            </div>
            <div className="nav__help__modal__content__section">
              <h3 id="commands-section-title" className="heading-3">
                Comandos para utilizar com teclado
              </h3>
              <div
                className="nav__help__modal__content__section__commands"
                aria-labelledby="commands-section-title"
              >
                <div>
                  <div>H</div>
                  <div>Acessar painel de ajuda</div>
                </div>
                <div>
                  <div>T</div>
                  <div>Acessar teclado virtual</div>
                </div>
                <div>
                  <div>SHIFT + H</div>
                  <div>Acessar homepage</div>
                </div>
              </div>
            </div>
            <div className="nav__help__modal__content__section">
              <h3 id="commands-voice-section-title" className="heading-3">
                Comandos para utilizar com voz
              </h3>
              <div
                className="nav__help__modal__content__section__commands"
                aria-labelledby="commands-voice-section-title"
              >
                {Object.entries(symbolMap).map(([key, value], i) => (
                  <div key={i}>
                    <div>{key}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={hideModal}
            aria-label="Fechar painel de atalhos do sistema"
            title="Fechar H"
            autoFocus={true}
            style={{ cursor: "pointer" }}
          >
            <SlClose aria-hidden={true} focusable={false} />
          </button>
        </dialog>
      </div>
      {isOverlayActive && <Overlay />}
    </>
  );
}
