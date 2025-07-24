"use client";

import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { SlSizeFullscreen } from "react-icons/sl";

type SecondPageType = {
  title: string;
  children: React.ReactNode;
  onClick: () => void;
  fullScreenLink: string;
};

export default function SecondPage({
  title,
  children,
  onClick,
  fullScreenLink,
}: SecondPageType) {
  const router = useRouter();
  useHotkeys("E", () => router.push(fullScreenLink));
  useHotkeys("shift+f", onClick);

  return (
    <div className="sec-page">
      <div className="sec-page__header">
        <button
          className="btn-default cursor-pointer"
          onClick={onClick}
          aria-label="Fechar segunda tela"
          title="shift+f"
        >
          <KeyboardDoubleArrowRight
            className="cursor-pointer"
            aria-hidden={true}
            focusable={false}
          />
        </button>
        <h2 className="heading-2">{title}</h2>
        <Link
          aria-label="Expandir segunda tela"
          className="btn-default cursor-pointer"
          onClick={onClick}
          href={fullScreenLink}
          title="Pressione a tecla E"
        >
          <SlSizeFullscreen
            className="cursor-pointer"
            aria-hidden={true}
            focusable={false}
          />
        </Link>
      </div>
      {children}
    </div>
  );
}
