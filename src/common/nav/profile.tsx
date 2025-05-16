import useModal from "@/hooks/useModal";
import Link from "next/link";
import { SlLogout, SlSettings } from "react-icons/sl";
import ProfileIcon from "../icons/profile";
import useScreenSize from "@/hooks/useScreenSize";
import { TABLET_SCREEN_SIZE } from "../utils/var";

export default function Profile() {
  const { showModal, isModalOpen, isOverlayActive, modalRef, Overlay } =
    useModal();
  const { screenSize } = useScreenSize();

  return (
    <>
      <button
        aria-label="Abrir opções de login e cadastro"
        title="Conta de usuário"
        aria-pressed={isModalOpen}
        style={{ position: "relative" }}
        onClick={showModal}
        className={`nav__profile ${
          screenSize.width <= TABLET_SCREEN_SIZE && "btn-icon"
        }`}
      >
        <ProfileIcon aria-hidden={true} focusable={false} />
        <dialog
          className="modal"
          ref={modalRef}
          aria-modal={true}
          aria-label="Opções de login e cadastro"
        >
          <Link aria-label="Ir para as configurações" href="">
            <SlSettings aria-hidden={true} focusable={false} />
          </Link>
          <div role="button" title="Deslogar" aria-label="Deslogar">
            <SlLogout aria-hidden={true} focusable={false} />
          </div>
        </dialog>
      </button>
      {isOverlayActive && <Overlay />}
    </>
  );
}
