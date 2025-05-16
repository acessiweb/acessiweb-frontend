"use client";

import CardList from "@/components/card-list";
import { useProjects } from "@/context/projects";
import Head from "@/components/head";
import useScreenSize from "@/hooks/useScreenSize";
import { MOBILE_SCREEN_SIZE, TABLET_SCREEN_SIZE } from "@/common/utils/var";
import { Breadcrumb } from "@/components/breadcrumb";
import ControlBarMobile from "@/components/control-bar-mobile";
import ControlBarDesktop from "@/components/control-bar-desktop";

export default function Projects() {
  const { projects, deleteProject } = useProjects();
  const { screenSize } = useScreenSize();

  const crumbs = [
    {
      desc: "PROJETOS",
      link: `/projetos`,
    },
    {
      desc: "PROJETOS",
      link: `/projetos`,
    },
  ];

  return (
    <>
      <Head title="Meus projetos" />
      <div className="projects">
        {screenSize.width <= TABLET_SCREEN_SIZE && (
          <Breadcrumb crumbs={crumbs} />
        )}
        <h1 className="heading-1">Meus projetos</h1>
        {screenSize.width <= MOBILE_SCREEN_SIZE ? (
          <ControlBarMobile
            createBtnLink="/projetos/cadastrar"
            createBtnText="Criar projeto"
          />
        ) : (
          <ControlBarDesktop
            createBtnLink="/projetos/cadastrar"
            createBtnText="Criar projeto"
            searchPlaceholderText="Buscar por projeto..."
          />
        )}

        <CardList
          data={projects}
          errorMsg="Oops! Você ainda não possui projetos."
          hasUpdate={true}
          hasDelete={true}
          onDelete={deleteProject}
          updateRoute="/projetos/[id]/editar"
          readRoute="/projetos/[id]"
        />
      </div>
    </>
  );
}
