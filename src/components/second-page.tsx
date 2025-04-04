"use client";

import { KeyboardDoubleArrowLeft } from "@mui/icons-material";

type SecondPageType = {
  closeSecPage: () => void;
  title: string;
};

export default function SecondPage({ closeSecPage, title }: SecondPageType) {
  return (
    <div className="sec-page">
      <div className="sec-page__header">
        <button className="btn-default" onClick={closeSecPage}>
          <KeyboardDoubleArrowLeft />
        </button>
        <h2 className="heading-2">{title}</h2>
      </div>
    </div>
  );
}
