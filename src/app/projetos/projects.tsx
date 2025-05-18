"use client";

import { useProjects } from "@/context/projects";
import useScreenSize from "@/hooks/useScreenSize";
import { MOBILE_SCREEN_SIZE, TABLET_SCREEN_SIZE } from "@/common/utils/var";
import { Breadcrumb } from "@/components/breadcrumb";
import ControlBarMobile from "@/components/control-bar-mobile";
import ControlBarDesktop from "@/components/control-bar-desktop";
import NoRegistersFound from "@/components/not-found";
import CardUpdateAndDelete from "@/common/card/update-and-delete";
import Card from "@/components/card";
import Search from "@/components/search";

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
    <div className="projects">
      {screenSize.width <= TABLET_SCREEN_SIZE && <Breadcrumb crumbs={crumbs} />}
      <h1 className="heading-1">Meus projetos</h1>
      {screenSize.width <= MOBILE_SCREEN_SIZE ? (
        <ControlBarMobile
          createBtnLink="/projetos/cadastrar"
          createBtnText="Criar projeto"
        />
      ) : (
        <ControlBarDesktop
          controls={
            <Search
              classname="search"
              placeholderText="Buscar por projeto..."
            />
          }
          createBtnLink="/projetos/cadastrar"
          createBtnText="Criar projeto"
          searchPlaceholderText="Buscar por projeto..."
        />
      )}

      {projects.length > 0 ? (
        <div className="grid">
          {projects.map((project, i) => (
            <div className="grid__item" key={i}>
              <Card
                readRoute="/projetos/[id]"
                mainText={project.name}
                registerId={project.id}
              >
                <CardUpdateAndDelete
                  onDelete={deleteProject}
                  updateRoute="/projetos/[id]/editar"
                  registerId={project.id}
                  registerName={project.name}
                />
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <NoRegistersFound errorMsg="Oops! Você ainda não possui projetos." />
      )}
    </div>
  );
}
