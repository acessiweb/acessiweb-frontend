import imageKitLoader from "@/common/image/loader";
import Image from "next/image";

type NoRegistersFoundProps = {
  errorMsg: string;
  showErrorMsgImage?: boolean;
};

export default function NoRegistersFound({
  errorMsg,
  showErrorMsgImage = true,
}: NoRegistersFoundProps) {
  return (
    <div className="no-registers-found">
      <span>{errorMsg}</span>
      {showErrorMsgImage && (
        <div className="no-registers-found__img-wrapper">
          <Image
            loader={() => imageKitLoader("acessibility-1")}
            src="acessibility-1"
            alt="Desenho de um homem em cadeira de rodas e uma mulher sentada em cima de livros"
            width={1000}
            height={100}
            quality={90}
          />
        </div>
      )}
    </div>
  );
}
