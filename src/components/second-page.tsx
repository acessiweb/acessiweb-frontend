"use client";

import { KeyboardDoubleArrowLeft } from "@mui/icons-material";

type SecondPageType = {
  title: string;
  children: React.ReactNode;
  onClick: () => void;
};

export default function SecondPage({
  title,
  children,
  onClick,
}: SecondPageType) {
  return (
    <div className="sec-page">
      <div className="sec-page__header">
        <button className="btn-default" onClick={onClick}>
          <KeyboardDoubleArrowLeft />
        </button>
        <h2 className="heading-2">{title}</h2>
      </div>
      {children}
    </div>
  );
}
