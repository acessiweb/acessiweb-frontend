import useModal from "@/hooks/useModal";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { SlLogin } from "react-icons/sl";

export default function Person() {
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
        className="nav__person"
      >
        <IoPersonOutline aria-hidden={true} focusable={false} />
        <dialog
          className="modal"
          ref={modalRef}
          aria-modal={true}
          aria-label="Opções de login e cadastro"
        >
          <Link href="" aria-label="Ir para tela de login">
            <SlLogin aria-hidden={true} focusable={false} />
          </Link>
          <Link
            href=""
            className="add-account"
            aria-label="Ir para tela de criação de conta"
          >
            <IoPersonOutline aria-hidden={true} focusable={false} />
            <span>&#43;</span>
          </Link>
        </dialog>
      </button>
      {isOverlayActive && <Overlay />}
    </>
  );
}
