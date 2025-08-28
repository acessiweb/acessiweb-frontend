"use client";

import { CardLinkProps } from "@/types/card";
import Link from "next/link";

export default function CardLink({
  mainText,
  secondaryText,
  children,
  readRoute,
}: CardLinkProps) {
  return (
    <article className="card">
      <Link className="card__content" href={readRoute}>
        <h3 className="heading-3 cursor-pointer">{mainText}</h3>
        <div className="card__buttons">{children}</div>
      </Link>
      {secondaryText && <p>{secondaryText}</p>}
    </article>
  );
}
