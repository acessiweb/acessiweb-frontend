import { ChangeEvent, useMemo } from "react";

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

function getRandom(name: string) {
  const random = Math.random();
  return `${name}-${random}`;
}

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
  const visualId = useMemo(() => getRandom("visual"), []);
  const teaId = useMemo(() => getRandom("tea"), []);
  const motorId = useMemo(() => getRandom("motor"), []);
  const hearingId = useMemo(() => getRandom("hearing"), []);
  const neuralId = useMemo(() => getRandom("neural"), []);

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
            id={visualId}
            name={visualId}
            value="Visual"
            checked={!!visual}
            onChange={onVisualChange}
          />
          <label htmlFor={visualId}> Visual</label>
        </div>
        <div>
          <input
            className="input-checkbox"
            type="checkbox"
            id={teaId}
            name={teaId}
            value="TEA"
            checked={!!tea}
            onChange={onTeaChange}
          />
          <label htmlFor={teaId}> TEA</label>
        </div>
        <div>
          <input
            className="input-checkbox"
            type="checkbox"
            id={motorId}
            name={motorId}
            value="Motora"
            checked={!!motor}
            onChange={onMotorChange}
          />
          <label htmlFor={motorId}> Motora</label>
        </div>
        <div>
          <input
            className="input-checkbox"
            type="checkbox"
            id={hearingId}
            name={hearingId}
            value="Auditiva"
            checked={!!hearing}
            onChange={onHearingChange}
          />
          <label htmlFor={hearingId}> Auditiva</label>
        </div>
        <div>
          <input
            className="input-checkbox"
            type="checkbox"
            id={neuralId}
            name={neuralId}
            checked={!!neural}
            value="Cognitiva e neural"
            onChange={onNeuralChange}
          />
          <label htmlFor={neuralId}> Cognitiva e neural</label>
        </div>
      </div>
    </div>
  );
}
