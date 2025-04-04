type PushDeleteType = {
  pushMsg: string;
  handleDelete?: (id: string) => void;
  id: string;
  handleCancel: () => void;
};

export default function PushDelete({
  pushMsg,
  handleDelete,
  id,
  handleCancel,
}: PushDeleteType) {
  return (
    <div className="push-delete-wrapper slide-fwd-top">
      <div className="push-delete-wrapper__push">
        <p>{pushMsg}</p>
        <div className="push-delete-wrapper__push__btn-wrapper">
          <button
            className="btn-transparent delete"
            onClick={() => handleDelete && handleDelete(id)}
          >
            Sim
          </button>
          <button className="btn-transparent not-delete" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
