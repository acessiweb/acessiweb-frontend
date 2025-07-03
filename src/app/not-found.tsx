import Image from "next/image";
import NotFoundImage from "../assets/images/acessibility-2.webp";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="not-found open-sans"
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
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
