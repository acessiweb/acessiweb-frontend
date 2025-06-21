import { ChangeEvent } from "react";
import { useHotkeys } from "react-hotkeys-hook";

type GuidelinesDeficiencesFilterProps = {
  onVisualChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onHearingChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMotorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onNeuralChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTeaChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function GuidelinesDeficiencesFilter({
  onHearingChange,
  onMotorChange,
  onNeuralChange,
  onTeaChange,
  onVisualChange,
}: GuidelinesDeficiencesFilterProps) {
  useHotkeys("v", () => document.getElementById("visual")?.focus());

  return (
    <div role="form" className="guidelines-deficiences-filter">
      <div></div>
      <div className="guidelines-deficiences-filter__guideline-checkbox-group">
        <div>
          <input
            className="input-checkbox"
            type="checkbox"
            id="visual"
            name="visual"
            value="Visual"
            onChange={onVisualChange}
          />
          <label htmlFor="visual"> Visual</label>
        </div>
        <div>
          <input
            className="input-checkbox"
            type="checkbox"
            id="neural"
            name="neural"
            value="Neural"
            onChange={onNeuralChange}
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
            onChange={onTeaChange}
          />
          <label htmlFor="tea"> TEA</label>
        </div>
        <div>
          <input
            className="input-checkbox"
            type="checkbox"
            id="motor"
            name="motor"
            value="Motora"
            onChange={onMotorChange}
          />
          <label htmlFor="motor"> Motora</label>
        </div>
        <div>
          <input
            className="input-checkbox"
            type="checkbox"
            id="hearing"
            name="hearing"
            value="Auditiva"
            onChange={onHearingChange}
          />
          <label htmlFor="hearing"> Auditiva</label>
        </div>
      </div>
    </div>
  );
}
