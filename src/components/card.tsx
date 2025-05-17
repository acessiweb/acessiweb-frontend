"use client";

import { useSecPage } from "@/context/sec-page";
import Link from "next/link";
import { ReactNode } from "react";

export type CardProps = {
  registerId?: string;
  mainText: string;
  secondaryText?: string;
  readRoute?: string;
  children: ReactNode;
};

export default function Card({
  registerId,
  mainText,
  secondaryText,
  readRoute,
  children,
}: CardProps) {
  const { setIsOpen } = useSecPage();

  const handleSecPage = () => {
    setIsOpen(true);
    document.body.classList.add("two-pages");
  };

  const CardText = () => {
    return (
      <div className="card__desc">
        <span>{mainText}</span>
        {secondaryText && <span>{secondaryText}</span>}
      </div>
    );
  };

  return (
    <article className="card">
      {readRoute && (
        <Link
          className="card-link"
          href={`${readRoute?.replace("[id]", registerId!)}`}
          onClick={handleSecPage}
        >
          <CardText />
        </Link>
      )}
      {!readRoute && <CardText />}
      {children}
    </article>
  );
}
