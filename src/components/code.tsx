import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { basicDark } from "@uiw/codemirror-theme-basic";
import { copilot } from "@uiw/codemirror-theme-copilot";
import { duotoneLight } from "@uiw/codemirror-theme-duotone";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { githubLight } from "@uiw/codemirror-theme-github";
import { gruvboxDark, gruvboxLight } from "@uiw/codemirror-theme-gruvbox-dark";
import { quietlight } from "@uiw/codemirror-theme-quietlight";
import { sublime } from "@uiw/codemirror-theme-sublime";

type CodeProps = {
  editable: boolean;
  label?: string;
  handleCode: Dispatch<SetStateAction<string>>;
  code: string | undefined;
};

enum THEME_OPTIONS {
  "atomone" = "Atomone",
  "basicDark" = "Basic Dark",
  "copilot" = "Copilot",
  "duotoneLight" = "Duotone Light",
  "eclipse" = "Eclipse",
  "githubLight" = "Github Light",
  "gruvboxDark" = "Gruvbox Dark",
  "gruvboxLight" = "Gruvbox Light",
  "quietlight" = "Quietlight",
  "sublime" = "Sublime",
}

export default function Code({ label, editable, handleCode, code }: CodeProps) {
  const [theme, setTheme] = useState(atomone);

  const handleTheme = (e: ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case THEME_OPTIONS.atomone:
        setTheme(atomone);
        break;
      case THEME_OPTIONS.basicDark:
        setTheme(basicDark);
        break;
      case THEME_OPTIONS.copilot:
        setTheme(copilot);
        break;
      case THEME_OPTIONS.duotoneLight:
        setTheme(duotoneLight);
        break;
      case THEME_OPTIONS.eclipse:
        setTheme(eclipse);
        break;
      case THEME_OPTIONS.githubLight:
        setTheme(githubLight);
        break;
      case THEME_OPTIONS.gruvboxDark:
        setTheme(gruvboxDark);
        break;
      case THEME_OPTIONS.gruvboxLight:
        setTheme(gruvboxLight);
        break;
      case THEME_OPTIONS.quietlight:
        setTheme(quietlight);
        break;
      case THEME_OPTIONS.sublime:
        setTheme(sublime);
        break;
      default:
        break;
    }
  };

  return (
    <div className="code">
      <div>
        {label && <span>{label}</span>}
        <div role="form">
          <select onChange={handleTheme}>
            <option value={THEME_OPTIONS.atomone}>
              {THEME_OPTIONS.atomone}
            </option>
            <option value={THEME_OPTIONS.basicDark}>
              {THEME_OPTIONS.basicDark}
            </option>
            <option value={THEME_OPTIONS.copilot}>
              {THEME_OPTIONS.copilot}
            </option>
            <option value={THEME_OPTIONS.duotoneLight}>
              {THEME_OPTIONS.duotoneLight}
            </option>
            <option value={THEME_OPTIONS.eclipse}>
              {THEME_OPTIONS.eclipse}
            </option>
            <option value={THEME_OPTIONS.githubLight}>
              {THEME_OPTIONS.githubLight}
            </option>
            <option value={THEME_OPTIONS.gruvboxDark}>
              {THEME_OPTIONS.gruvboxDark}
            </option>
            <option value={THEME_OPTIONS.gruvboxLight}>
              {THEME_OPTIONS.gruvboxLight}
            </option>
            <option value={THEME_OPTIONS.quietlight}>
              {THEME_OPTIONS.quietlight}
            </option>
            <option value={THEME_OPTIONS.sublime}>
              {THEME_OPTIONS.sublime}
            </option>
          </select>
        </div>
      </div>
      <div>
        <CodeMirror
          placeholder={`/* Implementação */

export function sample() {
  return "sample"
}`}
          value={code}
          extensions={[
            javascript({ jsx: true, typescript: true }),
            html({
              autoCloseTags: true,
              matchClosingTags: true,
              selfClosingTags: true,
            }),
            markdown({ base: markdownLanguage }),
          ]}
          theme={theme}
          editable={editable}
          onChange={(e) => handleCode(e)}
          id="code"
        />
      </div>
    </div>
  );
}
