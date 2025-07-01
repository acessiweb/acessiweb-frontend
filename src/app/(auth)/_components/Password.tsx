import { ReactNode } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

type PasswordProps = {
  children: ReactNode;
  hide: boolean;
  handlePassword: () => void;
};

export default function Password({
  children,
  hide,
  handlePassword,
}: PasswordProps) {
  useHotkeys("S", handlePassword);

  return (
    <div className="password">
      {children}
      {hide ? (
        <button
          type="button"
          className="btn-icon"
          onClick={handlePassword}
          aria-label="Ocultar senha"
          title="Pressione a tecla S"
          aria-keyshortcuts="S"
        >
          <PiEyeLight aria-hidden={true} focusable={false} />
        </button>
      ) : (
        <button
          type="button"
          className="btn-icon"
          onClick={handlePassword}
          aria-label="Mostrar senha"
          title="Pressione a tecla S"
          aria-keyshortcuts="S"
        >
          <PiEyeSlashLight aria-hidden={true} focusable={false} />
        </button>
      )}
    </div>
  );
}
