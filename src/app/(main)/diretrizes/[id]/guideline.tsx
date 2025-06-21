"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import Code from "@/components/code";
import Image from "next/image";
import { Guideline as GuidelineType } from "@/types/guideline";
import { useScreenType } from "@/hooks/useScreenType";

export default function Guideline({ guideline }: { guideline: GuidelineType }) {
  const { isMobile, isTablet } = useScreenType();
  const crumbs = [
    {
      desc: "DIRETRIZES",
      link: "/diretrizes",
    },
  ];

  if (guideline.name) {
    crumbs.push({
      desc: guideline?.name,
      link: `/diretrizes/${guideline?.id}`,
    });
  }

  return (
    <div className="read-guideline">
      {(isMobile || isTablet) && <Breadcrumb crumbs={crumbs} />}
      <h1 className="heading-1">{guideline?.name}</h1>
      <p>{guideline?.description}</p>
      {guideline?.code && <Code code={guideline.code || ""} editable={false} />}
      {guideline?.image && guideline?.imageDesc && (
        <Image src={guideline.image} alt={guideline.imageDesc} />
      )}
      <div className="read-guideline__deficiences">
        {guideline?.deficiences?.map((def, i) => (
          <div key={i}>
            <div className="read-guideline__deficiences__checkbox"></div>
            <span>{def.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
