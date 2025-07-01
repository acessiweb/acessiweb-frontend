"use client";

import { capitalize } from "@/utils/string";
import Link from "next/link";

export type BreadcrumbProps = {
  crumbs: {
    desc: string;
    link: string;
  }[];
};

export function Breadcrumb({ crumbs }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((crumb, i) => (
          <li
            aria-current={crumbs.length - 1 === i ? "page" : undefined}
            key={i}
            id={`breadcrumb-${i}`}
          >
            <Link
              href={crumb.link}
              style={{ fontWeight: crumbs.length - 1 === i ? 700 : 400 }}
            >
              {capitalize(crumb.desc)}
            </Link>
            {crumbs.length - 1 !== i ? <span role="none">&#47;</span> : ""}
          </li>
        ))}
      </ol>
    </nav>
  );
}
