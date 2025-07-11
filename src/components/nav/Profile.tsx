import ProfileIcon from "../icons/Profile";
import { useState } from "react";
import Logout from "./Logout";
import Settings from "./Settings";

export default function Profile() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={`nav__profile ${showMenu ? "nav__profile--menu-shown" : ""}`}
    >
      <button
        aria-label="Abrir opções de deslogar e configurações"
        className="btn-icon"
        onClick={() => setShowMenu((prev) => !prev)}
        aria-haspopup="menu"
        aria-controls={showMenu ? "logout-and-settings" : undefined}
        aria-expanded={showMenu}
      >
        <ProfileIcon aria-hidden={true} />
      </button>
      {showMenu && (
        <ul
          role="menu"
          id="logout-and-settings"
          aria-label="Opções de deslogar e configurações"
        >
          <li role="menuitem">
            <Settings link="/config/perfil" />
          </li>
          <li role="menuitem">
            <Logout />
          </li>
        </ul>
      )}
    </div>
  );
}
