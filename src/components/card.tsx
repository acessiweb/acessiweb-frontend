"use client";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import PushDelete from "./push-delete";
import { useState } from "react";
import Link from "next/link";
import { useSecPage } from "@/context/sec-page";

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
  readRoute?: string;
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
  readRoute,
}: CardType) {
  const [showDeletePush, setShowDeletePush] = useState(false);
  const { setIsOpen } = useSecPage();

  const handleSecPage = () => {
    setIsOpen(true);
  };

  const Card = () => {
    return (
      <article className="card">
        <span>{mainText}</span>
        {secondaryText && <span>{secondaryText}</span>}
        {hasAdd && (
          <button
            type="button"
            className="btn-transparent"
            onClick={() => onAdd && onAdd({ id, name: mainText })}
          >
            <AddShoppingCartIcon />
          </button>
        )}
        {hasDelete && !hasUpdate && (
          <button
            type="button"
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
              onClick={handleSecPage}
            >
              <EditIcon />
            </Link>
            <button
              type="button"
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
  };

  if (readRoute) {
    return (
      <Link
        className="card-link"
        href={`${readRoute?.replace("[id]", id)}`}
        onClick={handleSecPage}
      >
        {Card()}
      </Link>
    );
  } else {
    return Card();
  }
}
