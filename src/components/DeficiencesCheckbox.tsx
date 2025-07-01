import { ChangeEvent } from "react";

type DeficiencesCheckboxProps = {
  onVisualChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onHearingChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMotorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onNeuralChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTeaChange: (e: ChangeEvent<HTMLInputElement>) => void;
  visual: string;
  hearing: string;
  motor: string;
  neural: string;
  tea: string;
};

export default function DeficiencesCheckbox({
  onHearingChange,
  onMotorChange,
  onNeuralChange,
  onTeaChange,
  onVisualChange,
  hearing,
  motor,
  neural,
  tea,
  visual,
}: DeficiencesCheckboxProps) {
  return (
    <div className="deficiences-checkbox">
      <div></div>
      <div
        role="group"
        aria-label="Filtrar por tipo de deficiência"
        className="deficiences-checkbox__group"
      >
        <div>
          <input
            className="input-checkbox"
            type="checkbox"
            id="visual"
            name="visual"
            value="Visual"
            checked={!!visual}
            onChange={onVisualChange}
          />
          <label htmlFor="visual"> Visual</label>
        </div>
        <div>
          <input
            className="input-checkbox"
            type="checkbox"
            id="tea"
            name="tea"
            value="TEA"
            checked={!!tea}
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
            checked={!!motor}
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
            checked={!!hearing}
            onChange={onHearingChange}
          />
          <label htmlFor="hearing"> Auditiva</label>
        </div>
        <div>
          <input
            className="input-checkbox"
            type="checkbox"
            id="neural"
            name="neural"
            checked={!!neural}
            value="Cognitiva e neural"
            onChange={onNeuralChange}
          />
          <label htmlFor="neural"> Cognitiva e neural</label>
        </div>
      </div>
    </div>
  );
}
