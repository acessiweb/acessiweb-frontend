import useModal from "@/hooks/useModal";
import { useScreenType } from "@/hooks/useScreenType";
import { IoHelp } from "react-icons/io5";
import { SlClose } from "react-icons/sl";
import { useHotkeys } from "react-hotkeys-hook";
import { symbolMap } from "../../utils/voice-commands";
import React from "react";

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
    toggleModal,
  } = useModal({ appId });
  const { isDesktop } = useScreenType();
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
              <dl aria-labelledby="commands-section-title">
                <dt>H</dt>
                <dd>Acessar painel de ajuda</dd>

                <dt>T</dt>
                <dd>Acessar teclado virtual</dd>

                <dt>SHIFT + H</dt>
                <dd>Acessar homepage</dd>

                <dt>TAB</dt>
                <dd>Navegar pelos elementos da página</dd>

                <dt>BARRA DE ESPAÇO (SPACE)</dt>
                <dd>Ativar/desativar estado</dd>

                <dt>ENTER</dt>
                <dd>Executar ação ou navegar</dd>

                <dt>SHIFT+ALT+S</dt>
                <dd style={{ display: "flex", flexDirection: "column" }}>
                  Pesquisa por voz{" "}
                  <small>
                    Se o campo de pesquisa da header estiver aberto ela será
                    priorizada.
                  </small>
                </dd>

                <dt>E</dt>
                <dd style={{ display: "flex", flexDirection: "column" }}>
                  Expandir segunda tela{" "}
                  <small>Função disponível no desktop</small>
                </dd>

                <dt>SHIFT+F</dt>
                <dd style={{ display: "flex", flexDirection: "column" }}>
                  Fechar segunda tela{" "}
                  <small>Função disponível no desktop</small>
                </dd>

                <dt>F</dt>
                <dd>Abrir menu de filtros disponíveis</dd>

                <dt>V</dt>
                <dd>Alternar visualização dos cards</dd>
              </dl>
            </div>
            <div className="nav__help__modal__content__section">
              <h3 id="commands-voice-section-title" className="heading-3">
                Comandos para utilizar com voz
              </h3>
              <dl aria-labelledby="commands-voice-section-title">
                {Object.entries(symbolMap).map(([key, value], i) => (
                  <React.Fragment key={`symbol-${i}`}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          </div>
          <button
            onClick={hideModal}
            aria-label="Fechar painel de atalhos do sistema"
            title="Pressione a tecla H"
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
