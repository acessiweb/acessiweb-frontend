"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import Code from "@/components/Code";
import Image from "next/image";
import { Guideline as GuidelineType } from "@/types/guideline";
import imageKitLoader from "@/utils/image-kit-loader";
import { STATUS_CODE_TRANSLATE } from "@/utils/constants";

type GuidelineProps = {
  guideline: GuidelineType;
  isSecPage?: boolean;
  crumbs?: {
    desc: string;
    link: string;
  }[];
  isRequest: boolean;
};

export default function Guideline({
  guideline,
  isSecPage = false,
  crumbs,
  isRequest,
}: GuidelineProps) {
  return (
    <div className="read-page read-guideline">
      {!isSecPage && crumbs && <Breadcrumb crumbs={crumbs} />}
      <h1 className="heading-1">{guideline.name}</h1>
      <div className="read-guideline__deficiences">
        {guideline.deficiences?.map((def, i) => (
          <div key={i}>
            <div className="read-guideline__deficiences__checkbox"></div>
            <span>{def.name}</span>
          </div>
        ))}
      </div>
      <p>{guideline.description}</p>
      {(guideline.code || guideline.image) && (
        <h3 className="heading-3">Exemplo de implementação: </h3>
      )}
      <div className="read-guideline__graphic">
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
      </div>
      {isRequest && (
        <div className="read-guideline__situation">
          <h3>Situação</h3>
          {isRequest && (
            <div className="read-guideline__situation__status-code">
              {guideline.statusCode === "APPROVED" &&
                STATUS_CODE_TRANSLATE.approved}
              {guideline.statusCode === "PENDING" &&
                STATUS_CODE_TRANSLATE.pending}
              {guideline.statusCode === "REJECTED" &&
                STATUS_CODE_TRANSLATE.rejected}
              {guideline.statusCode === "STANDBY" &&
                STATUS_CODE_TRANSLATE.standby}
            </div>
          )}
          {guideline.statusMsg && (
            <div className="read-guideline__situation__status-msg">
              {guideline.statusMsg}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
