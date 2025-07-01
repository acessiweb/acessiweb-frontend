"use client";

import NoRegistersFound from "@/components/NotFound";
import useSecPage from "@/hooks/useSecPage";
import EditProject from "./[id]/editar/EditProject";
import SecondPage from "@/components/SecondPage";
import { CardLinkUpdateAndDelete } from "@/components/CardLink";
import { CardBtnUpdateAndDelete } from "@/components/CardBtn";
import { useScreenType } from "@/hooks/useScreenType";
import { useQuery } from "@tanstack/react-query";
import { getProject, getProjects } from "@/routes/projects";
import { Project as ProjectType } from "@/types/project";
import { useState } from "react";
import usePagination from "@/hooks/usePagination";
import Project from "./[id]/Project";
import { useSession } from "next-auth/react";

export default function Projects() {
  const {
    isOpen: isSecPageOpen,
    setIsOpen: setIsSecPageOpen,
    getSecPageClass,
    setNode: setSecPageContent,
    node: secPageContent,
    setTitle: setSecPageTitle,
    title: secPageTitle,
    fullScreenLink,
    setFullScreenLink,
  } = useSecPage();
  const { isMobile, isTablet } = useScreenType();
  const [search, setSearch] = useState("");
  const [projsStored, setProjsStored] = useState<ProjectType[]>([]);
  const { isFromSearch, loadMore, onLoadLess, onLoadMore, offset } =
    usePagination({
      watchFromSearch: [search],
    });
  const { data } = useSession();

  const { data: projects, fetchStatus } = useQuery({
    queryKey: ["projects", search, offset, data],
    queryFn: async () => {
      const p = await getProjects({
        userId: data?.user.id,
        offset,
        keyword: search,
      });

      if ("data" in p) {
        if (projsStored.length === 0 || isFromSearch) {
          setProjsStored(p.data);
        } else if (fetchStatus === "fetching") {
          if (loadMore) {
            setProjsStored((projs) => {
              const prevProjs = [...projs];
              p.data.map((p) => prevProjs.push(p));
              return prevProjs;
            });
          } else {
            setProjsStored((projs) => {
              let prevProjs = [...projs];
              prevProjs.splice(
                projsStored.length - (projsStored.length - p.limit)
              );
              return prevProjs;
            });
          }
        }

        return p;
      }

      return null;
    },
  });

  const handleEditSecPage = async (id: string) => {
    if (data && data.user.id) {
      const project = await getProject(id);

      if ("id" in project) {
        setIsSecPageOpen(true);
        setSecPageTitle(project.name);
        setSecPageContent(
          <EditProject
            project={project}
            isSecPage={true}
            handleSecPageTitle={setSecPageTitle}
          />
        );
        setFullScreenLink(`/projetos/${id}/editar`);
      }
    }
  };

  //  const handleAddSecPage = () => {
  //    setIsSecPageOpen(true);
  //    setSecPageContent(
  //      <AddGuideline isSecPage={true} handleSecPageTitle={setSecPageTitle} />
  //    );
  //    setFullScreenLink("/admin/diretrizes/cadastrar");
  //  };

  const handleReadSecPage = async (id: string) => {
    if (data && data.user.id) {
      const project = await getProject(id);

      if ("id" in project) {
        setIsSecPageOpen(true);
        setSecPageContent(<Project project={project} />);
        setSecPageTitle(project.name);
        setFullScreenLink(`/projetos/${id}`);
      }
    }
  };

  return (
    <div className={getSecPageClass()}>
      <div className="projects">
        <h1 className="heading-1">Meus projetos</h1>
        {projsStored.length > 0 ? (
          <div className="grid">
            {projsStored.map((project, i) => (
              <div className="grid__item" key={i}>
                {isTablet ? (
                  <CardLinkUpdateAndDelete
                    mainText={project.name}
                    onDelete={() => {}}
                    readRoute={`/projetos/${project.id}`}
                    registerId={project.id}
                    registerName={project.name}
                    updateRoute={`/projetos/${project.id}/editar`}
                    secondaryText={project.description}
                  />
                ) : (
                  <CardBtnUpdateAndDelete
                    mainText={project.name}
                    onDelete={() => {}}
                    registerId={project.id}
                    registerName={project.name}
                    secondaryText={project.description}
                    onUpdateClick={() => handleEditSecPage(project.id)}
                    onClick={handleReadSecPage}
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
          fullScreenLink={fullScreenLink}
        >
          {secPageContent}
        </SecondPage>
      )}
    </div>
  );
}
