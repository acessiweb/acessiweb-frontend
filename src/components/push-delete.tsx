import { createPortal } from "react-dom";

type PushDeleteType = {
  pushMsg: string;
  handleDelete?: (id: string) => void;
  id: string;
  handlePortal: (open: boolean) => void;
};

export default function PushDelete({
  pushMsg,
  handleDelete,
  id,
  handlePortal,
}: PushDeleteType) {
  return createPortal(
    <div className="push-delete-wrapper slide-fwd-top">
      <div className="push-delete-wrapper__push">
        <p>{pushMsg}</p>
        <div className="push-delete-wrapper__push__btn-wrapper">
          <button
            className="btn-transparent delete"
            onClick={() => {
              if (handleDelete) {
                handleDelete(id);
              }
              handlePortal(false);
            }}
          >
            Sim
          </button>
          <button
            className="btn-transparent not-delete"
            onClick={() => handlePortal(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("app")!
  );
}
