import { useScreenType } from "@/hooks/useScreenType";
import { signOut } from "next-auth/react";
import { SlLogout } from "react-icons/sl";

export default function Logout() {
  const { isDesktop } = useScreenType();

  return (
    <button
      className={`nav__logout ${isDesktop && "btn-icon"} cursor-pointer`}
      aria-label="Deslogar"
      onClick={() => signOut()}
    >
      <SlLogout
        className="cursor-pointer"
        aria-hidden={true}
        focusable={false}
      />
    </button>
  );
}
