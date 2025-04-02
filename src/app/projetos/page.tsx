"use client";

import CardList from "@/components/card-list";
import SecondPage from "@/components/second-page";
import { getProjects } from "@/data/projects";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isSecPageOpen, setIsSecPageOpen] = useState(false);

  useEffect(() => {
    const projs = getProjects();
    setProjects(projs ? JSON.parse(projs) : []);
  }, []);

  return (
    <div>
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
        />
      </div>
      {isSecPageOpen && (
        <SecondPage closeSecPage={() => setIsSecPageOpen(false)}></SecondPage>
      )}
    </div>
  );
}
