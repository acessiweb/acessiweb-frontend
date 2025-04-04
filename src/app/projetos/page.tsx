"use client";

import CardList from "@/components/card-list";
import { useProjects } from "@/context/projects";
import Link from "next/link";

export default function Projects() {
  const { projects, deleteProject } = useProjects();

  return (
    <div className="projects">
      <div className="projects__header">
        <h1 className="heading-1">Meus projetos</h1>
        <Link className="btn-link-default" href="/projetos/cadastrar">
          Cadastrar
        </Link>
      </div>
      <CardList
        data={projects}
        errorMsg="Oops! Você ainda não possui projetos."
        hasUpdate={true}
        hasDelete={true}
        onDelete={deleteProject}
        updateRoute="/projetos/[id]/editar"
      />
    </div>
  );
}
