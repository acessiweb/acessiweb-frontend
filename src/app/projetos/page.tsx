"use client";

import CardList from "@/components/card-list";
import { useProjects } from "@/context/projects";
import Link from "next/link";
import Head from "@/components/head";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Search } from "@/components/search";

export default function Projects() {
  const { projects, deleteProject } = useProjects();

  return (
    <>
      <Head title="Meus projetos" />
      <div className="projects">
        <div className="projects__header">
          <h1 className="heading-1">Meus projetos</h1>
          <Link className="btn-link-default" href="/projetos/cadastrar">
            Cadastrar
          </Link>
        </div>
        <form className="filter-form">
          <Search searchText="Busque por uma palavra-chave" />
          <div className="filter-form__calendar-icon">
            <CalendarMonthOutlinedIcon />
          </div>
          {/* <div className="input-wrapper">
              <label htmlFor="initialDate">
                Data inicial de criação do projeto
              </label>
              <input className="input-default" name="initialDate" type="date" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="endDate">Data final de criação do projeto</label>
              <input className="input-default" name="endDate" type="date" />
            </div> */}
        </form>
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
