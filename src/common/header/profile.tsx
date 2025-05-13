import useModal from "@/hooks/useModal";
import Link from "next/link";
import { SlLogout, SlSettings } from "react-icons/sl";
import ProfileIcon from "../icons/profile";

export default function Profile() {
  const { showModal, isModalOpen, isOverlayActive, modalRef, Overlay } =
    useModal();

  return (
    <>
      <button
        aria-label="Abrir opções de login e cadastro"
        title="Conta de usuário"
        aria-pressed={isModalOpen}
        style={{ position: "relative" }}
        onClick={showModal}
        className="header__profile"
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
          <button title="Deslogar" aria-label="Deslogar">
            <SlLogout aria-hidden={true} focusable={false} />
          </button>
        </dialog>
      </button>
      {isOverlayActive && <Overlay />}
    </>
  );
}
