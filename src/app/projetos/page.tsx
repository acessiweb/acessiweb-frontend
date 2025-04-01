"use client";

import { Heading1 } from "@/common/styles/heading";
import CardList from "@/components/card-list";
import SecondPage from "@/components/second-page";
import { getProjects } from "@/data/projects";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: ${(props) => props.theme.spacing.md};
`;

const ProjectsWrapperHeader = styled.div`
  display: flex;
  column-gap: ${(props) => props.theme.spacing.sm};
`;

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isSecPageOpen, setIsSecPageOpen] = useState(false);

  useEffect(() => {
    const projs = getProjects();
    setProjects(projs ? JSON.parse(projs) : []);
  }, []);

  return (
    <div>
      <ProjectsWrapper>
        <ProjectsWrapperHeader>
          <Heading1>Meus projetos</Heading1>
          <Link className="btn-link" href="/projetos/cadastrar">
            Cadastrar
          </Link>
        </ProjectsWrapperHeader>
        <CardList
          data={projects}
          errorMsg="Oops! Você ainda não possui projetos."
        />
      </ProjectsWrapper>
      {isSecPageOpen && (
        <SecondPage closeSecPage={() => setIsSecPageOpen(false)}></SecondPage>
      )}
    </div>
  );
}
