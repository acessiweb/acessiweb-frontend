import styled from "styled-components";
import Card from "./card";

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  gap: ${(props) => props.theme.spacing.md};

  > div {
    display: flex;
    flex: 1;
  }
`;

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  margin: 0 auto;
  row-gap: ${(props) => props.theme.spacing.sm};

  > span {
    font-weight: ${(props) => props.theme.fontWeight.semibold};
  }

  > img {
    object-fit: contain;
    width: 100%;
  }
`;

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
      <ListWrapper>
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
      </ListWrapper>
    );
  }

  return (
    <NotFoundWrapper>
      <span>{errorMsg}</span>
      <img src="acessibility-1.png" />
    </NotFoundWrapper>
  );
}
