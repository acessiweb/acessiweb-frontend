import useModal from "@/hooks/useModal";
import Link from "next/link";
import { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { SlLogin } from "react-icons/sl";

export default function Person() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={`nav__person ${showMenu ? "nav__profile--menu-shown" : ""}`}
    >
      <button
        aria-label="Abrir opções de login e cadastro"
        onClick={() => setShowMenu((prev) => !prev)}
        aria-haspopup="menu"
        aria-controls={showMenu ? "login-and-register" : undefined}
        aria-expanded={showMenu}
      >
        <IoPersonOutline aria-hidden={true} focusable={false} />
      </button>
      {showMenu && (
        <ul
          role="menu"
          id="login-and-register"
          aria-label="Opções de login e cadastro"
        >
          <li role="menuitem">
            <Link href="/auth/logar" aria-label="Ir para tela de login">
              <SlLogin aria-hidden={true} focusable={false} />
            </Link>
          </li>
          <li role="menuitem">
            <Link
              href="/auth/criar-conta"
              className="add-account"
              aria-label="Ir para tela de criação de conta"
            >
              <IoPersonOutline aria-hidden={true} focusable={false} />
              <span aria-hidden={true}>&#43;</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
