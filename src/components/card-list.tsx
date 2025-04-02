import Card from "./card";

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
      <img src="acessibility-1.png" />
    </div>
  );
}
