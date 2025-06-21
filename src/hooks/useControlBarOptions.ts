import { useState } from "react";

export default function useControlBarOptions() {
  const [view, setView] = useState("grid");

  const handleView = () => {
    setView((prev) => {
      if (prev === "list") {
        return "grid";
      }

      return "list";
    });
  };

  return {
    handleView,
    view,
  };
}
