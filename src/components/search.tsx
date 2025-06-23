"use client";

import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { SlMagnifier, SlMicrophone } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";

type SearchProps = {
  classname: string;
  handleSearchClose?: () => void;
  placeholderText: string;
  handleSearch: Dispatch<SetStateAction<string>>;
  searchValue: string;
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
        handleSearch={() => {}}
        searchValue=""
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
  handleSearch,
  searchValue,
}: SearchProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { startListening } = useSpeechRecognition({
    onResult: (text: string) => {
      handleSearch(text);
    },
    inputId: "keyword",
    btnRef,
  });

  return (
    <div className={classname}>
      <button
        ref={btnRef}
        className="btn-icon"
        type="button"
        onClick={startListening}
      >
        <SlMicrophone />
      </button>
      <form className={`${classname}__search-form`}>
        <input
          type="text"
          placeholder={placeholderText}
          name="keyword"
          id="keyword"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchValue ? (
          <button onClick={() => handleSearch("")}>
            <IoCloseOutline />
          </button>
        ) : (
          <SlMagnifier />
        )}
      </form>
    </div>
  );
}
