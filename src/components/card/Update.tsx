import Link from "next/link";
import { SlPencil } from "react-icons/sl";

export function UpdateBtn({ onUpdateClick }: { onUpdateClick: () => void }) {
  return (
    <button
      type="button"
      className="btn-transparent cursor-pointer"
      onClick={onUpdateClick}
      aria-label="Abrir tela de edição"
    >
      <SlPencil
        className="cursor-pointer"
        aria-hidden={true}
        focusable={false}
      />
    </button>
  );
}

export function UpdateLink({ updateRoute }: { updateRoute: string }) {
  return (
    <Link
      href={updateRoute}
      className="btn-transparent cursor-pointer"
      aria-label="Ir para a tela de edição"
    >
      <SlPencil
        className="cursor-pointer"
        aria-hidden={true}
        focusable={false}
      />
    </Link>
  );
}
