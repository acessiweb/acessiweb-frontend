"use client";

import { useProjects } from "@/context/projects";
import { Breadcrumb } from "@/components/breadcrumb";
import ControlBarMobile from "@/components/control-bar-mobile";
import ControlBarDesktop from "@/components/control-bar-desktop";
import NoRegistersFound from "@/components/not-found";
import Search from "@/components/search";
import useSecPage from "@/hooks/useSecPage";
import EditProject from "./[id]/editar/edit-project";
import SecondPage from "@/components/second-page";
import Project from "./[id]/project";
import { isMobile, isTablet } from "@/common/utils/size";
import { CardLinkUpdateAndDelete } from "@/components/card-link";
import { CardBtnUpdateAndDelete } from "@/components/card-btn";

export default function Projects() {
  const { projects, deleteProject } = useProjects();
  const {
    isOpen: isSecPageOpen,
    setIsOpen: setIsSecPageOpen,
    getSecPageClass,
    setNode: setSecPageContent,
    node: secPageContent,
    setTitle: setSecPageTitle,
    title: secPageTitle,
  } = useSecPage();

  const crumbs = [
    {
      desc: "PROJETOS",
      link: `/projetos`,
    },
  ];

  return (
    <div className={getSecPageClass()}>
      <div className="projects">
        {isTablet() && <Breadcrumb crumbs={crumbs} />}
        <h1 className="heading-1">Meus projetos</h1>
        {isMobile() ? (
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
                {isTablet() ? (
                  <CardLinkUpdateAndDelete
                    mainText={project.name}
                    onDelete={deleteProject}
                    readRoute=""
                    registerId={project.id}
                    registerName={project.name}
                    updateRoute={`/projetos/${project.id}/editar`}
                    secondaryText=""
                  />
                ) : (
                  <CardBtnUpdateAndDelete
                    mainText={project.name}
                    onDelete={deleteProject}
                    registerId={project.id}
                    registerName={project.name}
                    secondaryText=""
                    onUpdateClick={() => {
                      setIsSecPageOpen(true);
                      setSecPageContent(<EditProject />);
                      setSecPageTitle(`Editar ${project.name}`);
                    }}
                    onClick={() => {
                      setIsSecPageOpen(true);
                      setSecPageContent(
                        <Project
                          projectName={project.name}
                          projectDescription={project.description}
                          projectFeedback={project.feedback}
                        />
                      );
                      setSecPageTitle(project.name);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <NoRegistersFound errorMsg="Oops! Você ainda não possui projetos." />
        )}
      </div>
      {isSecPageOpen && (
        <SecondPage
          title={secPageTitle}
          onClick={() => setIsSecPageOpen(false)}
        >
          {secPageContent}
        </SecondPage>
      )}
    </div>
  );
}
