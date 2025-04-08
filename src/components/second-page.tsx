"use client";

import { useSecPage } from "@/context/sec-page";
import { KeyboardDoubleArrowLeft } from "@mui/icons-material";

type SecondPageType = {
  title: string;
  children: React.ReactNode;
};

export default function SecondPage({ title, children }: SecondPageType) {
  const { setIsOpen } = useSecPage();
  return (
    <div className="sec-page">
      <div className="sec-page__header">
        <button className="btn-default" onClick={() => setIsOpen(false)}>
          <KeyboardDoubleArrowLeft />
        </button>
        <h2 className="heading-2">{title}</h2>
      </div>
      {children}
    </div>
  );
}
