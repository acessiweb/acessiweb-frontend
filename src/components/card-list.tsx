import Card from "./card";
import Image from "next/image";

type CardListType = {
  data: {
    id: number;
    name: string;
  }[];
  secondaryText?: string;
  hasAdd?: boolean;
  hasDelete?: boolean;
  hasUpdate?: boolean;
  onUpdate?: () => void;
  onDelete?: (id: number) => void;
  onAdd?: (id: number, name: string) => void;
  errorMsg: string;
  showErrorMsgImage?: boolean;
};

export default function CardList({
  data,
  secondaryText,
  hasAdd,
  hasDelete,
  hasUpdate,
  onAdd,
  onDelete,
  onUpdate,
  errorMsg,
  showErrorMsgImage = true,
}: CardListType) {
  if (data.length > 0) {
    return (
      <div className="card-list">
        {data.map((dt, i) => (
          <div key={i}>
            <Card
              id={dt.id}
              mainText={dt.name}
              secondaryText={secondaryText}
              hasAdd={hasAdd}
              hasDelete={hasDelete}
              hasUpdate={hasUpdate}
              onAdd={onAdd}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="card-list-not-found">
      <span>{errorMsg}</span>
      {showErrorMsgImage && (
        <Image
          src="https://ik.imagekit.io/6vdq2o9vy/acessibiweb/acessibility-1"
          alt="Desenho de um homem em cadeira de rodas e uma mulher sentada em cima de livros"
          width="1000"
          height="100"
        />
      )}
    </div>
  );
}
