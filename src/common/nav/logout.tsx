import { SlLogout } from "react-icons/sl";

export default function Logout() {
  return (
    <button className="nav__logout" title="Deslogar" aria-label="Deslogar">
      <SlLogout aria-hidden={true} focusable={false} />
    </button>
  );
}
