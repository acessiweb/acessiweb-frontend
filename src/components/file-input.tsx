import { ReactNode } from "react";

export default function FileInput({
  children,
  filename,
  id,
  text,
}: {
  children: ReactNode;
  filename: string;
  id: string;
  text: string;
}) {
  return (
    <div className="file-input">
      {children}
      <label htmlFor={id}>📂 {text}</label>
      <span>{filename}</span>
    </div>
  );
}
