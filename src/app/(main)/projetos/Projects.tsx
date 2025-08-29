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
import { useScreenType } from "@/hooks/useScreenType";
import NoRegistersFound from "@/components/NotFound";
import Project from "./[id]/Project";
import FiltersApplied from "@/components/FiltersApplied";
import DateFilter from "@/components/DateFilter";
import useDateFilter from "@/hooks/useDateFilter";
import useSearch from "@/hooks/useSearch";
import { UpdateBtn, UpdateLink } from "@/components/card/Update";
import DeleteBtn from "@/components/card/Delete";
import AddEditProject from "./_components/AddEditProject";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import Card from "@/components/Card";
import Loader from "@/components/Loader";

const filterOptions: FilterOptions = [
  {
    id: "creation-date",
    desc: "Por data de criação",
  },
];

export default function Projects() {
  const { isDesktop } = useScreenType();

  const { data: session } = useSession();

  const { offset, store, handlePagination, handleFiltering, handleDelete } =
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

  const {
    secPageClass,
    handleAddSecPage,
    handleEditSecPage,
    handleReadSecPage,
    isOpen: isSecPageOpen,
    handleIsOpen: handleIsSecPageOpen,
    title: secPageTitle,
    fullScreenLink,
    node: secPageContent,
  } = useProjectsSecPage();

  const { status } = useQuery({
    queryKey: ["projects", search, offset, session],
    queryFn: async () => {
      const res = await getProjects({
        userId: session?.user.id,
        offset,
        keyword: search,
      });

      if (res.ok && "data" in res) {
        handlePagination(res.data);
      }

      return "data" in res ? res.data : res;
    },
  });

  const cleanAllFilters = () => {
    handleInitialDate("");
    handleEndDate("");
  };

  return (
    <div className={secPageClass}>
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
          {isDesktop ? (
            <button className="btn-default" onClick={handleAddSecPage}>
              Criar projeto
            </button>
          ) : (
            <Link
              className="btn-default cursor-pointer"
              href="/projetos/cadastrar"
            >
              <GoPlus />
            </Link>
          )}
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
          </FiltersApplied>
        )}
        {status === "pending" && <Loader msg="Buscando projetos..." />}
        {status === "success" && store.length > 0 && (
          <div className={`${view}`} aria-labelledby="page-heading">
            {store.map((project) => (
              <div className={`${view}__item`} key={project.id}>
                <Card
                  mainText={project.name}
                  readRoute={`/projetos/${project.id}`}
                  secondaryText={project.description}
                  onClick={() => handleReadSecPage(project.id)}
                  isLink={!isDesktop}
                  onKeyDown={() => handleReadSecPage(project.id)}
                >
                  {isDesktop ? (
                    <UpdateBtn
                      onUpdateClick={() => handleEditSecPage(project.id)}
                    />
                  ) : (
                    <UpdateLink
                      updateRoute={`/projetos/${project.id}/editar`}
                    />
                  )}
                  <DeleteBtn
                    onDelete={() => handleDelete(project.id, deleteProject)}
                    registerId={project.id}
                    registerName={project.name}
                  />
                </Card>
              </div>
            ))}
          </div>
        )}
        {(status === "error" ||
          (status !== "pending" && store.length === 0)) && (
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

function useProjectsSecPage() {
  const {
    isOpen,
    handleIsOpen,
    getSecPageClass,
    node,
    title,
    handleTitle,
    fullScreenLink,
    handleFullScreenLink,
    handleNode,
  } = useSecPage();

  const handleEditSecPage = async (id: string) => {
    const res = await getProject(id);

    if (res.ok && "data" in res) {
      handleIsOpen(true);
      handleTitle(res.data.name);
      handleNode(
        <AddEditProject
          project={res.data}
          isSecPage={true}
          handleSecPageTitle={handleTitle}
          isEditPage={true}
        />
      );
      handleFullScreenLink(`/projetos/${id}/editar`);
    }
  };

  const handleAddSecPage = () => {
    handleIsOpen(true);
    handleNode(
      <AddEditProject isSecPage={true} handleSecPageTitle={handleTitle} />
    );
    handleFullScreenLink("/projetos/cadastrar");
    handleTitle("Cadastrar projeto");
  };

  const handleReadSecPage = async (id: string) => {
    const res = await getProject(id);

    if (res.ok && "data" in res) {
      handleIsOpen(true);
      handleNode(<Project project={res.data} />);
      handleTitle(res.data.name);
      handleFullScreenLink(`/projetos/${id}`);
    }
  };

  return {
    secPageClass: getSecPageClass(),
    handleAddSecPage,
    handleEditSecPage,
    handleReadSecPage,
    isOpen,
    handleIsOpen,
    title,
    fullScreenLink,
    node,
  };
}
