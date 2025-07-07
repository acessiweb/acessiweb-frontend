"use client";

import useSecPage from "@/hooks/useSecPage";
import SecondPage from "@/components/SecondPage";
import { useQuery } from "@tanstack/react-query";
import { deleteProject, getProject, getProjects } from "@/routes/projects";
import usePagination from "@/hooks/usePagination";
import { useSession } from "next-auth/react";
import Search from "@/components/Search";
import ControlBar from "@/components/ControlBar";
import useControlBar from "@/hooks/useControlBar";
import { FilterOptions } from "@/types/filter";
import { Project as ProjectType } from "@/types/project";
import { CardLinkUpdateAndDelete } from "@/components/CardLink";
import { CardBtnUpdateAndDelete } from "@/components/CardBtn";
import { useScreenType } from "@/hooks/useScreenType";
import NoRegistersFound from "@/components/NotFound";
import AddProject from "./cadastrar/AddProject";
import Project from "./[id]/Project";
import FiltersApplied from "@/components/FiltersApplied";
import DateFilter from "@/components/DateFilter";
import useDateFilter from "@/hooks/useDateFilter";
import useSearch from "@/hooks/useSearch";
import RemovedFilter from "@/components/RemovedFilter";
import EditProject from "./[id]/editar/EditProject";

const filterOptions: FilterOptions = [
  {
    id: "creation-date",
    desc: "Por data de criação",
  },
  {
    id: "deleted",
    desc: "Removidos",
  },
];

export default function Projects() {
  const {
    isOpen: isSecPageOpen,
    handleIsOpen: handleIsSecPageOpen,
    getSecPageClass,
    node: secPageContent,
    title: secPageTitle,
    handleTitle: handleSecPageTitle,
    fullScreenLink,
    handleFullScreenLink,
    handleNode: handleSecPageContent,
  } = useSecPage();
  const { isTablet, isMobile } = useScreenType();
  const { data: session } = useSession();
  const { offset, store, handleStore, handleFiltering, handleDelete } =
    usePagination({
      data: [] as ProjectType[],
    });
  const { handleSearch, search } = useSearch({
    handleFiltering,
  });
  const {
    handleView,
    handleFiltersChosen,
    view,
    filtersChosen,
    deleteFilter,
    cleanFilters,
    isFilterApplied,
  } = useControlBar();
  const {
    handleEndDate,
    endDate,
    handleInitialDate,
    initialDate,
    cleanDateFilter,
  } = useDateFilter();

  useQuery({
    queryKey: ["projects", search, offset, session],
    queryFn: async () => {
      const p = await getProjects({
        userId: session?.user.id,
        offset,
        keyword: search,
      });

      if ("data" in p) {
        handleStore(p);
      }

      return p;
    },
  });

  const handleEditSecPage = async (id: string) => {
    if (session && session.user.id) {
      const project = await getProject(id);
      if ("id" in project) {
        handleIsSecPageOpen(true);
        handleSecPageTitle(project.name);
        handleSecPageContent(
          <EditProject
            project={project}
            isSecPage={true}
            handleSecPageTitle={handleSecPageTitle}
          />
        );
        handleFullScreenLink(`/projetos/${id}/editar`);
      }
    }
  };

  const handleDeletion = async (projectId: string) => {
    if (session) {
      const deleted = await deleteProject(projectId);

      if ("id" in deleted) {
        handleDelete(deleted.id);
      }
    }
  };

  const handleAddSecPage = () => {
    handleIsSecPageOpen(true);
    handleSecPageContent(
      <AddProject isSecPage={true} handleSecPageTitle={handleSecPageTitle} />
    );
    handleFullScreenLink("/projetos/cadastrar");
    handleSecPageTitle("Cadastrar projeto");
  };

  const handleReadSecPage = async (id: string) => {
    if (session && session.user.id) {
      const project = await getProject(id);
      if ("id" in project) {
        handleIsSecPageOpen(true);
        handleSecPageContent(
          <Project project={project} handleSecPageTitle={handleSecPageTitle} />
        );
        handleSecPageTitle(project.name);
        handleFullScreenLink(`/projetos/${id}`);
      }
    }
  };

  const cleanAllFilters = () => {
    handleInitialDate("");
    handleEndDate("");
  };

  return (
    <div className={getSecPageClass()}>
      <div className="projects">
        <ControlBar
          handleView={handleView}
          view={view}
          filtersOptions={filterOptions}
          handleFilters={handleFiltersChosen}
          handleFiltering={handleFiltering}
        />
        <h1 className="heading-1" id="page-heading">
          Meus projetos
        </h1>
        <div className="projects__search-wrapper">
          <Search
            classname="search"
            placeholderText="Buscar por projeto..."
            handleSearch={handleSearch}
            searchValue={search}
          />
          <button className="btn-default" onClick={handleAddSecPage}>
            Criar projeto
          </button>
        </div>
        {filtersChosen.length > 0 && (
          <FiltersApplied
            cleanFilters={cleanFilters}
            filtersChosen={filtersChosen}
            handleFilters={cleanAllFilters}
          >
            {isFilterApplied("creation-date") && (
              <DateFilter
                endDate={endDate}
                handleEndDate={handleEndDate}
                handleInitialDate={handleInitialDate}
                initialDate={initialDate}
                cleanDateFilter={() => {
                  deleteFilter("creation-date");
                  cleanDateFilter();
                }}
              />
            )}
            {isFilterApplied("deleted") && (
              <RemovedFilter
                desc="Projetos removidos"
                onClick={() => deleteFilter("deleted")}
              />
            )}
          </FiltersApplied>
        )}
        {store.length > 0 ? (
          <div className={`${view}`} aria-labelledby="page-heading">
            {store.map((project) => (
              <div className={`${view}__item`} key={project.id}>
                {isTablet || isMobile ? (
                  <CardLinkUpdateAndDelete
                    mainText={project.name}
                    onDelete={() => handleDeletion(project.id)}
                    readRoute={`/projetos/${project.id}`}
                    registerId={project.id}
                    registerName={project.name}
                    updateRoute={`/projetos/${project.id}/editar`}
                    secondaryText={project.description}
                  />
                ) : (
                  <CardBtnUpdateAndDelete
                    mainText={project.name}
                    onDelete={() => handleDeletion(project.id)}
                    registerId={project.id}
                    registerName={project.name}
                    secondaryText={project.description}
                    onUpdateClick={() => handleEditSecPage(project.id)}
                    onClick={() => handleReadSecPage(project.id)}
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
          onClick={() => handleIsSecPageOpen(false)}
          fullScreenLink={fullScreenLink}
        >
          {secPageContent}
        </SecondPage>
      )}
    </div>
  );
}
