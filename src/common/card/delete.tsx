import PushDelete from "@/components/push-delete";
import { useState } from "react";
import { SlTrash } from "react-icons/sl";

type CardDeleteProps = {
  registerId: string;
  registerName: string;
  onDelete: (id: string) => void;
};

export default function CardDelete({
  onDelete,
  registerId,
  registerName,
}: CardDeleteProps) {
  const [showDeletePush, setShowDeletePush] = useState(false);

  return (
    <>
      <button
        type="button"
        title="Deletar"
        className="btn-transparent"
        onClick={() => setShowDeletePush(true)}
      >
        <SlTrash />
      </button>
      {showDeletePush && (
        <PushDelete
          pushMsg={`Tem certeza que deseja excluir "${registerName}"?`}
          id={registerId}
          handleDelete={onDelete}
          handlePortal={setShowDeletePush}
        />
      )}
    </>
  );
}
