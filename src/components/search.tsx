"use client";

import { captureVoiceAndPrintText } from "@/common/utils/voice";
import { useState } from "react";
import { SlMagnifier, SlMicrophone } from "react-icons/sl";

type SearchProps = {
  classname: string;
  handleSearchClose?: () => void;
  placeholderText: string;
};

export function BtnSearch({ classname }: { classname: string }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  if (isSearchOpen) {
    return (
      <Search
        classname={classname}
        handleSearchClose={toggleSearch}
        placeholderText="Faça uma busca"
      />
    );
  }

  return (
    <button
      className="btn-icon"
      onClick={toggleSearch}
      style={{ cursor: "pointer" }}
    >
      <SlMagnifier />
    </button>
  );
}

export default function Search({
  classname,
  handleSearchClose,
  placeholderText,
}: SearchProps) {
  return (
    <div className={classname}>
      <button
        className="btn-icon"
        type="button"
        onClick={() => captureVoiceAndPrintText("keyword")}
      >
        <SlMicrophone />
      </button>
      <form className={`${classname}__search-form`}>
        <input
          type="text"
          placeholder={placeholderText}
          name="keyword"
          id="keyword"
        />
        <button onClick={handleSearchClose}>
          <SlMagnifier />
        </button>
      </form>
    </div>
  );
}
