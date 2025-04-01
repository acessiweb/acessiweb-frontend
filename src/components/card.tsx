"use client";

import styled from "styled-components";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

const CardWrapper = styled.article`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  margin-bottom: auto;
  background-color: ${(props) => props.theme.colors.lightPurpleDefault};
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.medium};

  &:hover {
    background-color: rgba(222, 222, 222, 0.7);
  }

  button {
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    padding: ${(props) => props.theme.spacing.sm};

    &:hover {
      border-radius: ${(props) => props.theme.borderRadius.small};
      background-color: ${(props) => props.theme.colors.lightPurpleDefault};
    }
  }
`;

type CardType = {
  id: number;
  mainText: string;
  secondaryText?: string;
  hasAdd?: boolean;
  hasDelete?: boolean;
  hasUpdate?: boolean;
  onUpdate?: () => void;
  onDelete?: (id: number) => void;
  onAdd?: (id: number, name: string) => void;
};

export default function Card({
  id,
  mainText,
  secondaryText,
  hasAdd,
  hasDelete,
  hasUpdate,
  onAdd,
  onDelete,
  onUpdate,
}: CardType) {
  return (
    <CardWrapper>
      <span>{mainText}</span>
      {secondaryText && <span>{secondaryText}</span>}
      {hasAdd && (
        <button onClick={() => onAdd && onAdd(id, mainText)}>
          <AddShoppingCartIcon />
        </button>
      )}
      {hasDelete && (
        <button onClick={() => onDelete && onDelete(id)}>
          <DeleteForeverIcon />
        </button>
      )}
      {hasUpdate && hasDelete && (
        <div>
          <button onClick={onUpdate}>
            <EditIcon />
          </button>
          <button onClick={() => onDelete && onDelete(id)}>
            <DeleteForeverIcon />
          </button>
        </div>
      )}
    </CardWrapper>
  );
}
