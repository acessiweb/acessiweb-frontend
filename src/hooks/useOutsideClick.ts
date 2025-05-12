import { useEffect, useRef, useState } from "react";

export default function useOutsideClick() {
  const [outsideClicked, setOutsideClicked] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
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
    componentRef: ref,
    outsideClicked,
  };
}
