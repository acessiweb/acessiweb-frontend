import { isAdmin, isCommonUser, isVisitor } from "@/common/utils/authorization";
import { useSession } from "@/context/auth";
import { usePathname } from "next/navigation";
import { IoPersonOutline, IoHelp } from "react-icons/io5";
import {
  SlHome,
  SlBasket,
  SlLogin,
  SlSettings,
  SlLogout,
} from "react-icons/sl";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { useCart } from "@/context/cart";
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";

function Home() {
  return (
    <Link href="/">
      <SlHome />
    </Link>
  );
}

function Cart() {
  const { guidelinesTotal } = useCart();

  return (
    <Link href="/projetos/cadastrar" className="cart-count">
      <SlBasket />
      <span>{guidelinesTotal}</span>
    </Link>
  );
}

function Person({
  setShowKeyboardKeysModal,
  showKeyboardKeysModal,
  setShowAccountModal,
  showAccountModal,
}: {
  setShowAccountModal: Dispatch<SetStateAction<boolean>>;
  showAccountModal: boolean;
  setShowKeyboardKeysModal: Dispatch<SetStateAction<boolean>>;
  showKeyboardKeysModal: boolean;
}) {
  const handleToggle = () => {
    setShowAccountModal((prev) => !prev);

    if (showKeyboardKeysModal) {
      setShowKeyboardKeysModal(false);
    }
  };

  return (
    <button style={{ position: "relative" }} onClick={handleToggle}>
      <IoPersonOutline />
      {showAccountModal && (
        <div className="modal">
          <Link href="">
            <SlLogin />
          </Link>
          <Link href="" className="add-account">
            <IoPersonOutline />
            <span>&#43;</span>
          </Link>
        </div>
      )}
    </button>
  );
}

function Help({
  setShowKeyboardKeysModal,
  showKeyboardKeysModal,
  setShowAccountModal,
  showAccountModal,
}: {
  setShowKeyboardKeysModal: Dispatch<SetStateAction<boolean>>;
  showKeyboardKeysModal: boolean;
  setShowAccountModal: Dispatch<SetStateAction<boolean>>;
  showAccountModal: boolean;
}) {
  const handleToggle = () => {
    setShowKeyboardKeysModal((prev) => !prev);

    if (showAccountModal) {
      setShowAccountModal(false);
    }
  };

  return (
    <div className="header-mobile__help">
      <button onClick={handleToggle}>
        <IoHelp />
      </button>
      {showKeyboardKeysModal && (
        <div className="modal">
          <div>
            Você está no Acessiweb, que irá te auxiliar com a acessibilidade em
            seus projetos
          </div>
          <div>Habilitar Leitor de Tela</div>
          <div>Comandos para utilizar com teclado</div>
        </div>
      )}
    </div>
  );
}

function Settings({ link }: { link: string }) {
  return (
    <Link href={link}>
      <SlSettings />
    </Link>
  );
}

function Logout() {
  return (
    <button>
      <SlLogout />
    </button>
  );
}

export default function HeaderMobile() {
  const pathname = usePathname();
  const { accessType } = useSession();
  const [showKeyboardKeysModal, setShowKeyboardKeysModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  if (pathname.includes("admin") && isAdmin(accessType)) {
    return (
      <header className="header-mobile">
        <div>
          <Home />
          <button className="add-guideline">
            <PiPersonArmsSpreadLight />
            <span>&#43;</span>
          </button>
          <Help
            setShowKeyboardKeysModal={setShowKeyboardKeysModal}
            showKeyboardKeysModal={showKeyboardKeysModal}
            setShowAccountModal={setShowAccountModal}
            showAccountModal={showAccountModal}
          />
          <Settings link="" />
          <Logout />
        </div>
      </header>
    );
  }

  if (!pathname.includes("admin") && isCommonUser(accessType)) {
    return (
      <header className="header-mobile">
        <div>
          <Home />
          <Cart />
          <Help
            setShowKeyboardKeysModal={setShowKeyboardKeysModal}
            showKeyboardKeysModal={showKeyboardKeysModal}
            setShowAccountModal={setShowAccountModal}
            showAccountModal={showAccountModal}
          />
          <Settings link="" />
          <Logout />
        </div>
      </header>
    );
  }

  if (!pathname.includes("admin") && isVisitor(accessType)) {
    return (
      <header className="header-mobile">
        <div>
          <Home />
          <Cart />
          <Help
            setShowKeyboardKeysModal={setShowKeyboardKeysModal}
            showKeyboardKeysModal={showKeyboardKeysModal}
            setShowAccountModal={setShowAccountModal}
            showAccountModal={showAccountModal}
          />
          <Person
            setShowAccountModal={setShowAccountModal}
            showAccountModal={showAccountModal}
            setShowKeyboardKeysModal={setShowKeyboardKeysModal}
            showKeyboardKeysModal={showKeyboardKeysModal}
          />
          <Settings link="" />
        </div>
      </header>
    );
  }
}
