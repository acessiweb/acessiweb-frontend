import Search from "@/components/search";

export default function GuidelinesFilters() {
  return (
    <div className="guidelines-filters">
      <Search classname="search" placeholderText="Buscar por diretriz..." />
      <form>
        <div className="homepage__guideline-checkbox-group">
          <div>
            <input
              className="input-checkbox"
              type="checkbox"
              id="visual"
              name="visual"
              value="Visual"
            />
            <label htmlFor="visual"> Visual</label>
          </div>
          <div>
            <input
              className="input-checkbox"
              type="checkbox"
              id="hearing"
              name="hearing"
              value="Auditiva"
            />
            <label htmlFor="hearing"> Auditiva</label>
          </div>
          <div>
            <input
              className="input-checkbox"
              type="checkbox"
              id="motor"
              name="motor"
              value="Motora"
            />
            <label htmlFor="motor"> Motora</label>
          </div>
          <div>
            <input
              className="input-checkbox"
              type="checkbox"
              id="neural"
              name="neural"
              value="Neural"
            />
            <label htmlFor="neural"> Neural</label>
          </div>
          <div>
            <input
              className="input-checkbox"
              type="checkbox"
              id="tea"
              name="tea"
              value="TEA"
            />
            <label htmlFor="tea"> TEA</label>
          </div>
        </div>
      </form>
    </div>
  );
}
