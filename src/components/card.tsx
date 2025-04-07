"use client";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import PushDelete from "./push-delete";
import { useState } from "react";
import Link from "next/link";

type CardType = {
  id: string;
  mainText: string;
  secondaryText?: string;
  hasAdd?: boolean;
  hasDelete?: boolean;
  hasUpdate?: boolean;
  updateRoute?: string;
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
  updateRoute,
}: CardType) {
  const [showDeletePush, setShowDeletePush] = useState(false);

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
      {hasDelete && !hasUpdate && (
        <button
          className="btn-transparent"
          onClick={() => setShowDeletePush(true)}
        >
          <DeleteForeverIcon />
        </button>
      )}
      {hasUpdate && hasDelete && (
        <div style={{ display: "flex" }}>
          <Link
            className="btn-transparent"
            href={`${updateRoute?.replace("[id]", id)}`}
          >
            <EditIcon />
          </Link>
          <button
            className="btn-transparent"
            onClick={() => setShowDeletePush(true)}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      )}
      {showDeletePush && (
        <PushDelete
          pushMsg={`Tem certeza que deseja excluir "${mainText}"?`}
          id={id}
          handleDelete={onDelete}
          handlePortal={setShowDeletePush}
        />
      )}
    </article>
  );
}
