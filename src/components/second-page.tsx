"use client";

import { KeyboardDoubleArrowLeft } from "@mui/icons-material";

type SecondPageType = {
  closeSecPage: () => void;
};

export default function SecondPage({ closeSecPage }: SecondPageType) {
  return (
    <div className="sec-page">
      <div>
        <button className="btn-default" onClick={closeSecPage}>
          <KeyboardDoubleArrowLeft />
        </button>
      </div>
    </div>
  );
}
