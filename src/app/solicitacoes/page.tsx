"use client";

import CardList from "@/components/card-list";
import SecondPage from "@/components/second-page";
import Link from "next/link";
import { useState } from "react";

export default function GuidelineRequests() {
  const [isSecPageOpen, setIsSecPageOpen] = useState(false);

  return (
    <div>
      <div className="projects">
        <div className="projects__header">
          <h1 className="heading-1">Minhas solicitações</h1>
          <Link className="btn-link-default" href="/projetos/cadastrar">
            Cadastrar
          </Link>
        </div>
        <CardList
          data={[]}
          errorMsg="Oops! Você ainda não possui solicitações."
        />
      </div>
      {isSecPageOpen && (
        <SecondPage closeSecPage={() => setIsSecPageOpen(false)}></SecondPage>
      )}
    </div>
  );
}
