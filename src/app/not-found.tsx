"use client";

import Image from "next/image";
import NotFoundImage from "../assets/images/acessibility-2.webp";
import Link from "next/link";
import { useEffect } from "react";
import { setPreferences } from "@/utils/storage";

export default function NotFound() {
  useEffect(() => {
    setPreferences();
  }, []);

  return (
    <main className="not-found open-sans">
      <p>Opa! Não foi possível encontrar o que você está buscando.</p>
      <Link className="btn-link-default" href="/">
        Ir para página inicial
      </Link>
      <div className="not-found__img-wrapper">
        <Image
          src={NotFoundImage}
          alt="Desenho de uma moça cadeirante mexendo em um dispositivo com várias telas atrás dela, com desenhos dos símbolos das deficiências"
          width={1000}
          height={1000}
          quality={90}
        />
      </div>
    </main>
  );
}
