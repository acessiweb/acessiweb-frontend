"use client";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

type CardType = {
  id: string;
  mainText: string;
  secondaryText?: string;
  hasAdd?: boolean;
  hasDelete?: boolean;
  hasUpdate?: boolean;
  onUpdate?: () => void;
  onDelete?: (id: string) => void;
  onAdd?: (obj: { id: string; name: string }) => void;
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
    <article className="card">
      <span>{mainText}</span>
      {secondaryText && <span>{secondaryText}</span>}
      {hasAdd && (
        <button
          className="btn-transparent"
          onClick={() => onAdd && onAdd({ id, name: mainText })}
        >
          <AddShoppingCartIcon />
        </button>
      )}
      {hasDelete && (
        <button
          className="btn-transparent"
          onClick={() => onDelete && onDelete(id)}
        >
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
    </article>
  );
}
