import Link from "next/link";
import { KeyboardEventHandler, MouseEventHandler, ReactNode } from "react";

type CardProps = {
  isLink: boolean;
  mainText: string;
  secondaryText?: string;
  children?: ReactNode;
  readRoute?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler;
};

export default function Card({
  isLink,
  mainText,
  children,
  onClick = () => {},
  onKeyDown = () => {},
  readRoute = "",
  secondaryText,
}: CardProps) {
  return (
    <article className="card cursor-pointer">
      {isLink ? (
        <Link className="card__content" href={readRoute}>
          <h3 className="heading-3 cursor-pointer">{mainText}</h3>
          <div className="card__buttons">{children}</div>
        </Link>
      ) : (
        <div
          className="card__content cursor-pointer"
          onClick={onClick}
          onKeyDown={(e) => e.key === "Enter" && onKeyDown(e)}
          tabIndex={0}
          role="button"
          aria-label={`Clique para acessar ${mainText}`}
        >
          <h3 className="heading-3 cursor-pointer">{mainText}</h3>{" "}
          <div className="card__buttons">{children}</div>
        </div>
      )}
      {secondaryText && <p className="cursor-pointer">{secondaryText}</p>}
    </article>
  );
}
