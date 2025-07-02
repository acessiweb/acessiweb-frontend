import Image from "next/image";
import NotFoundImage from "../assets/images/acessibility-1.webp";

type NoRegistersFoundProps = {
  errorMsg: string;
  showErrorMsgImage?: boolean;
};

export default function NoRegistersFound({
  errorMsg,
  showErrorMsgImage = true,
}: NoRegistersFoundProps) {
  return (
    <figure className="no-registers-found">
      <figcaption>{errorMsg}</figcaption>
      {showErrorMsgImage && (
        <div className="no-registers-found__img-wrapper">
          <Image
            src={NotFoundImage}
            alt="Desenho de um homem em cadeira de rodas e uma mulher sentada em cima de livros"
            width={1000}
            height={1000}
            quality={90}
          />
        </div>
      )}
    </figure>
  );
}
