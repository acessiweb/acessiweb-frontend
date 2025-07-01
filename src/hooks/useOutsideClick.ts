import { RefObject, useEffect, useState } from "react";

export default function useOutsideClick(
  componentRef: RefObject<HTMLDialogElement | null>,
  activeComponentClass: string
) {
  const [outsideClicked, setOutsideClicked] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    setOutsideClicked(false);
    const target = event.target as HTMLElement;

    if (
      !componentRef.current ||
      !componentRef.current.classList.contains(activeComponentClass)
    ) {
      return;
    }

    if (componentRef.current && !componentRef.current.contains(target)) {
      setOutsideClicked(true);
    } else {
      setOutsideClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    outsideClicked,
  };
}
