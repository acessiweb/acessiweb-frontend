"use client";

import { getPreferences, savePreference } from "@/utils/storage";
import { ChangeEvent } from "react";

export default function Preferences() {
  const prefs = getPreferences();

  const handleFontSize = (e: ChangeEvent<HTMLSelectElement>) => {
    savePreference("fontSize", e.target.value);
  };

  const handleFont = (e: ChangeEvent<HTMLSelectElement>) => {
    savePreference("font", e.target.value);
  };

  const handleBrightness = (e: ChangeEvent<HTMLInputElement>) => {
    savePreference("brightness", `brightness-${e.target.value}`);
  };

  const handleLineSpacing = (e: ChangeEvent<HTMLInputElement>) => {
    savePreference("lineSpace", `line-space-${e.target.value}`);
  };

  const handleLetterSpacing = (e: ChangeEvent<HTMLInputElement>) => {
    savePreference("letterSpace", `letter-space-${e.target.value}`);
  };

  const handleCursorSize = (e: ChangeEvent<HTMLSelectElement>) => {
    savePreference("cursorSize", `cursor-${e.target.value}`);
  };

  const handleCursorColor = (e: ChangeEvent<HTMLSelectElement>) => {
    savePreference("cursorColor", `cursor-${e.target.value}`);
  };

  const handleTheme = (e: ChangeEvent<HTMLSelectElement>) => {
    savePreference("theme", e.target.value);
  };

  return (
    <div className="preferences">
      <form>
        <label>Tema</label>
        <select
          onChange={handleTheme}
          {...(prefs && { defaultValue: `${prefs.theme}` })}
        >
          <option value="light">Claro</option>
          <option value="dark">Escuro</option>
        </select>
      </form>

      <form>
        <label>Fonte</label>
        <select
          id="fontSelect"
          name="fontSelect"
          onChange={handleFont}
          {...(prefs && { defaultValue: `${prefs.font}` })}
        >
          <option value="arial">Arial</option>
          <option value="calibri">Calibri</option>
          <option value="helvetica">Helvética</option>
          <option value="tahoma">Tahoma</option>
          <option value="times-new-roman">Times New Roman</option>
          <option value="verdana">Verdana</option>
        </select>
      </form>

      <form>
        <label>Tamanho da fonte</label>
        <select
          id="sizeSelect"
          name="sizeSelect"
          onChange={handleFontSize}
          {...(prefs && { defaultValue: `${prefs.fontSize}` })}
        >
          <option value="fs-small">Pequena</option>
          <option value="fs-medium">Média</option>
          <option value="fs-large">Grande</option>
          <option value="fs-x-large">Extra-Grande</option>
        </select>
      </form>

      <form>
        <label>Faixa de brilho</label>
        <input
          type="range"
          min="0"
          max="100"
          onChange={handleBrightness}
          step="1"
          {...(prefs && { defaultValue: `${prefs.brightness.split("-")[1]}` })}
        />
      </form>

      <form>
        <label>Espaçamento entre linhas</label>
        <input
          type="range"
          min="15"
          max="3"
          onChange={handleLineSpacing}
          step="-1"
          {...(prefs && { defaultValue: `${prefs.lineSpace.split("-")[2]}` })}
        />
      </form>

      <form>
        <label>Espaçamento entre letras</label>
        <input
          type="range"
          min="12"
          max="2"
          onChange={handleLetterSpacing}
          step="-1"
          {...(prefs && { defaultValue: `${prefs.letterSpace.split("-")[2]}` })}
        />
      </form>

      <form>
        <fieldset>
          <legend>Cursor</legend>
          <div>
            <label>Tamanhos</label>
            <select
              id="cursorSize"
              name="cursorSize"
              onChange={handleCursorSize}
              {...(prefs && { defaultValue: `${prefs.cursorSize}` })}
            >
              <option value="small">Pequeno</option>
              <option value="medium">Médio</option>
              <option value="large">Grande</option>
            </select>
          </div>
          <div>
            <label>Cores</label>
            <select
              id="cursorColor"
              name="cursorColor"
              onChange={handleCursorColor}
              {...(prefs && { defaultValue: `${prefs.cursorColor}` })}
            >
              <option value="white">Branco</option>
              <option value="pink">Rosa</option>
              <option value="blue">Azul</option>
              <option value="green">Verde</option>
              <option value="purple">Roxo</option>
              <option value="orange">Laranja</option>
              <option value="yellow">Amarelo</option>
              <option value="black">Preto</option>
            </select>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
