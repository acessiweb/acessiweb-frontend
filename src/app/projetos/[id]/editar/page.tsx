"use client";

import SecondPage from "@/components/second-page";
import { useState } from "react";
import Projects from "../../page";

export default function EditProject() {
  const [isSecPageOpen, setIsSecPageOpen] = useState(true);

  return (
    <div>
      <Projects />
      {isSecPageOpen && (
        <SecondPage
          title="Editar projeto"
          closeSecPage={() => setIsSecPageOpen(false)}
        ></SecondPage>
      )}
    </div>
  );
}
