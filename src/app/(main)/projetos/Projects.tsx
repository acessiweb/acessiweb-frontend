"use client";

import useSecPage from "@/hooks/useSecPage";
import SecondPage from "@/components/SecondPage";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/routes/projects";
import { useState } from "react";
import usePagination from "@/hooks/usePagination";
import { useSession } from "next-auth/react";
import Search from "@/components/Search";

export default function Projects() {
  const {
    isOpen: isSecPageOpen,
    setIsOpen: setIsSecPageOpen,
    getSecPageClass,
    node: secPageContent,
    title: secPageTitle,
    fullScreenLink,
  } = useSecPage();
  // const { isTablet } = useScreenType();
  const [search, setSearch] = useState("");
  // const [projsStored, setProjsStored] = useState<ProjectType[]>([]);
  const { offset } = usePagination({});
  const { data } = useSession();

  useQuery({
    queryKey: ["projects", search, offset, data],
    queryFn: async () => {
      await getProjects({
        userId: data?.user.id,
        offset,
        keyword: search,
      });

      // if ("data" in p) {
      //   if (projsStored.length === 0) {
      //     setProjsStored(p.data);
      //   } else if (fetchStatus === "fetching") {
      //     if (onLoadMore) {
      //       setProjsStored((projs) => {
      //         const prevProjs = [...projs];
      //         p.data.map((p) => prevProjs.push(p));
      //         return prevProjs;
      //       });
      //     } else {
      //       setProjsStored((projs) => {
      //         const prevProjs = [...projs];
      //         prevProjs.splice(
      //           projsStored.length - (projsStored.length - p.limit)
      //         );
      //         return prevProjs;
      //       });
      //     }
      //   }

      //   return p;
      // }

      return null;
    },
  });

  // const handleEditSecPage = async (id: string) => {
  //   if (data && data.user.id) {
  //     const project = await getProject(id);

  //     if ("id" in project) {
  //       setIsSecPageOpen(true);
  //       setSecPageTitle(project.name);
  //       setSecPageContent(
  //         <EditProject
  //           project={project}
  //           isSecPage={true}
  //           handleSecPageTitle={setSecPageTitle}
  //         />
  //       );
  //       setFullScreenLink(`/projetos/${id}/editar`);
  //     }
  //   }
  // };

  //  const handleAddSecPage = () => {
  //    setIsSecPageOpen(true);
  //    setSecPageContent(
  //      <AddGuideline isSecPage={true} handleSecPageTitle={setSecPageTitle} />
  //    );
  //    setFullScreenLink("/admin/diretrizes/cadastrar");
  //  };

  // const handleReadSecPage = async (id: string) => {
  //   if (data && data.user.id) {
  //     const project = await getProject(id);

  //     if ("id" in project) {
  //       setIsSecPageOpen(true);
  //       setSecPageContent(<Project project={project} />);
  //       setSecPageTitle(project.name);
  //       setFullScreenLink(`/projetos/${id}`);
  //     }
  //   }
  // };

  return (
    <div className={getSecPageClass()}>
      <div className="projects">
        <h1 className="heading-1">Meus projetos</h1>
        <Search
          classname="search"
          placeholderText="Buscar por projeto..."
          handleSearch={setSearch}
          searchValue={search}
        />
        {/* {projsStored.length > 0 ? (
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
        )} */}
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
