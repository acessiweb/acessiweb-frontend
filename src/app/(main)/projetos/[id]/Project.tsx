"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Project as ProjectType } from "@/types/project";
import Link from "next/link";

type ProjectProps = {
  project: ProjectType;
  isSecPage?: boolean;
  crumbs?: {
    desc: string;
    link: string;
  }[];
};

export default function Project({
  project,
  isSecPage = false,
  crumbs,
}: ProjectProps) {
  return (
    <div className="read-page read-project">
      {!isSecPage && crumbs && <Breadcrumb crumbs={crumbs} />}
      <h1 className="heading-1">{project.name}</h1>
      <p>{project.description}</p>
      {project.guidelines && project.guidelines.length > 0 && (
        <div className="grid" id="guidelines-grid">
          {project.guidelines.map((guide) => (
            <div className="grid__item" key={guide.id}>
              <Link
                href={`/diretrizes/${guide.id}`}
                className="card cursor-pointer"
              >
                <h3 className="cursor-pointer">{guide.name}</h3>
                <p className="cursor-pointer">{guide.description}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
      <p>{project.feedback}</p>
    </div>
  );
}
