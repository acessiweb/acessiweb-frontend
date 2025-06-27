import { useScreenType } from "@/hooks/useScreenType";
import { usePathname } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { CiKeyboard } from "react-icons/ci";

type KeyboardNavProps = {
  onToggleKeyboard: () => void;
};

export default function KeyboardNav({ onToggleKeyboard }: KeyboardNavProps) {
  useHotkeys("T", onToggleKeyboard);
  const { isDesktop } = useScreenType();
  const pathname = usePathname();

  return (
    <button
      className={`${pathname.includes("auth") ? "auth" : "nav"}__keyboard ${
        isDesktop && "btn-icon"
      }`}
      onClick={onToggleKeyboard}
      aria-label="Alternar teclado virtual"
      title="Pressione a tecla T"
      aria-keyshortcuts="T"
    >
      <CiKeyboard aria-hidden={true} focusable={false} />
    </button>
  );
}
