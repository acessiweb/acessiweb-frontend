"use client";

import { CardBtnProps } from "@/types/card";

export function CardBtn({
  mainText,
  secondaryText,
  children,
  onClick,
}: CardBtnProps) {
  return (
    <article className="card cursor-pointer">
      <div
        className="card__content cursor-pointer"
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick(e)}
        tabIndex={0}
        role="button"
        aria-label={`Clique para acessar ${mainText}`}
      >
        <h3 className="heading-3 cursor-pointer">{mainText}</h3>
        {secondaryText && <p className="cursor-pointer">{secondaryText}</p>}
      </div>
      <div className="card__buttons">{children}</div>
    </article>
  );
}
