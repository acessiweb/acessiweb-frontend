"use client";

import { ButtonDefault } from "@/common/styles/button";
import { Heading1 } from "@/common/styles/heading";
import SecondPage from "@/components/second-page";
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

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  margin: 0 auto;
  row-gap: ${(props) => props.theme.spacing.sm};

  > span {
    font-weight: ${(props) => props.theme.fontWeight.semibold};
  }

  > img {
    object-fit: contain;
    width: 100%;
  }
`;

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isSecPageOpen, setIsSecPageOpen] = useState(false);

  useEffect(() => {
    setProjects([]);
  }, []);

  return (
    <div>
      <ProjectsWrapper>
        <ProjectsWrapperHeader>
          <Heading1>Meus projetos</Heading1>
          <ButtonDefault onClick={() => setIsSecPageOpen(true)}>
            Cadastrar
          </ButtonDefault>
        </ProjectsWrapperHeader>
        <div>
          {projects.length > 0 ? (
            <div></div>
          ) : (
            <NotFoundWrapper>
              <span>Oops! Você ainda não possui projetos.</span>
              <img src="acessibility-1.png" />
            </NotFoundWrapper>
          )}
        </div>
      </ProjectsWrapper>
      {isSecPageOpen && (
        <SecondPage closeSecPage={() => setIsSecPageOpen(false)}></SecondPage>
      )}
    </div>
  );
}
