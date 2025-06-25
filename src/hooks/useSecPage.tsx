"use client";

import { ReactNode, useState } from "react";

export default function useSecPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [node, setNode] = useState<ReactNode>(<div></div>);
  const [title, setTitle] = useState("");
  const [fullScreenLink, setFullScreenLink] = useState("");

  const getSecPageClass = () => {
    if (isOpen) {
      return "two-pages";
    } else {
      return "one-page";
    }
  };

  return {
    isOpen,
    setIsOpen,
    getSecPageClass,
    setNode,
    node,
    title,
    setTitle,
    fullScreenLink,
    setFullScreenLink,
  };
}
