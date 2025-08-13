"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import Code from "@/components/Code";
import Image from "next/image";
import { Guideline as GuidelineType } from "@/types/guideline";
import imageKitLoader from "@/utils/image-kit-loader";

type GuidelineProps = {
  guideline: GuidelineType;
  isSecPage?: boolean;
  crumbs?: {
    desc: string;
    link: string;
  }[];
};

export default function Guideline({
  guideline,
  isSecPage = false,
  crumbs,
}: GuidelineProps) {
  return (
    <div className="read-page read-guideline">
      {!isSecPage && crumbs && <Breadcrumb crumbs={crumbs} />}
      <h1 className="heading-1">{guideline.name}</h1>
      <p>{guideline.description}</p>
      {guideline.code && (
        <Code
          code={guideline.code || ""}
          editable={false}
          handleCode={() => {}}
        />
      )}
      {guideline && guideline.image && guideline.imageDesc && (
        <div className="read-guideline__img-wrapper">
          <Image
            loader={() => imageKitLoader(guideline.image!)}
            src={guideline.image}
            alt={guideline.imageDesc}
            width={600}
            height={1000}
          />
        </div>
      )}
      <div className="read-guideline__deficiences">
        {guideline.deficiences?.map((def, i) => (
          <div key={i}>
            <div className="read-guideline__deficiences__checkbox"></div>
            <span>{def.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
