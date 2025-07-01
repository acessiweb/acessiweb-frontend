"use client";

// import { CardBtnUpdateAndDelete } from "@/components/card-btn";
// import { CardLinkUpdateAndDelete } from "@/components/card-link";
// import useControlBarOptions from "@/hooks/useControlBarOptions";
// import useGuidelinesFilters from "@/hooks/useGuidelinesFilters";
// import { useScreenType } from "@/hooks/useScreenType";
// import { useQuery } from "@tanstack/react-query";

export default function GuidelineRequests() {
  return <div></div>;
  // const { isTablet, isDesktop, isMobile } = useScreenType();
  // const { handleView, view } = useControlBarOptions();
  // const {
  //   handleSearch,
  //   search,
  //   handleHearing,
  //   handleMotor,
  //   handleNeural,
  //   handleTea,
  //   handleVisual,
  //   hearing,
  //   motor,
  //   neural,
  //   tea,
  //   visual,
  // } = useGuidelinesFilters();

  // const { data: guidelines } = useQuery({
  //   queryKey: ["guidelines", search, hearing, motor, visual, neural, tea],
  //   queryFn: async () =>
  //     (
  //       await getGuidelines({
  //         keyword: search,
  //         deficiences: [hearing, motor, visual, neural, tea],
  //       })
  //     ).data,
  // });

  // return (
  //   <div className="guidelines-requests">
  //     <h1 className="heading-1">
  //       Solicitações <span>de inclusão de diretriz</span>
  //     </h1>
  //     {guidelines && guidelines.length > 0 ? (
  //       <div className={`${view}`}>
  //         {guidelines.map((guideline, i) => (
  //           <div className={`${view}__item`} key={i}>
  //             {isDesktop && (
  //               <CardBtnUpdateAndDelete
  //                 mainText={guideline.name}
  //                 onClick={() => {}}
  //                 onDelete={() => {}}
  //                 onUpdateClick={() => {}}
  //                 registerId={guideline.id}
  //                 registerName={guideline.name}
  //               />
  //             )}
  //             {isTablet && (
  //               <CardLinkUpdateAndDelete
  //                 mainText={guideline.name}
  //                 onDelete={() => {}}
  //                 registerId={guideline.id}
  //                 registerName={guideline.name}
  //                 readRoute=""
  //                 updateRoute=""
  //               />
  //             )}
  //           </div>
  //         ))}
  //       </div>
  //     ) : (
  //       <NoRegistersFound errorMsg="Não foram encontradas diretrizes" />
  //     )}
  //   </div>
  // );
}
