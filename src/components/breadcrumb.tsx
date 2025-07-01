"use client";

import { capitalize } from "@/common/utils/string";
import Link from "next/link";

interface BreadcrumbType {
  crumbs: {
    desc: string;
    link: string;
  }[];
}

export function Breadcrumb({ crumbs }: BreadcrumbType) {
  return (
    <div className="breadcrumb">
      {crumbs.map((crumb, i) => (
        <div key={i}>
          <span className="breadcrumb__link-desc">
            <Link href={crumb.link}>{capitalize(crumb.desc)}</Link>
          </span>
          {crumbs.length - 1 !== i ? <span>&#47;</span> : ""}
        </div>
      ))}
    </div>
  );
}
