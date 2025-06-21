import { JSX, useState } from "react";
import { PiEyeSlashLight, PiEyeLight } from "react-icons/pi";

export default function usePassword(): {
  Eye: () => JSX.Element;
  hide: boolean;
  handlePassword: () => void;
} {
  const [hide, setHide] = useState(true);

  const handlePassword = () => {
    setHide((prev) => !prev);
  };

  const Eye = () => {
    if (hide) {
      return (
        <button
          type="button"
          className="btn-icon"
          onClick={handlePassword}
          aria-label="Ocultar senha"
          title="Ocultar senha"
        >
          <PiEyeLight aria-hidden={true} focusable={false} />
        </button>
      );
    }

    return (
      <button
        type="button"
        className="btn-icon"
        onClick={handlePassword}
        aria-label="Mostrar senha"
        title="Mostrar senha"
      >
        <PiEyeSlashLight aria-hidden={true} focusable={false} />
      </button>
    );
  };

  return {
    Eye,
    hide,
    handlePassword,
  };
}
