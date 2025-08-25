import { Guideline } from "@/types/guideline";

type RequestProps = {
  request: Guideline;
};

export default function Request({ request }: RequestProps) {
  return (
    <div className="admin-request">
      <div>
        <div>Autor(a)</div>
        <div></div>
      </div>

      <div>
        <div>Diretriz</div>
        <div>{request.name}</div>
      </div>

      <div>
        <div>Descrição</div>
        <div>{request.description}</div>
      </div>

      <div>
        <div>Deficiências</div>
        <div></div>
      </div>

      <div></div>

      <form>
        <textarea></textarea>
        <div>
          <button></button>
          <button></button>
        </div>
      </form>
    </div>
  );
}
