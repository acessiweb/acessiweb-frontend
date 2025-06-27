"use client";

import GuidelinesDeficiencesFilter from "@/components/DeficiencesCheckbox";
import NoRegistersFound from "@/components/NotFound";
import Search from "@/components/Search";
import SecondPage from "@/components/SecondPage";
import { useScreenType } from "@/hooks/useScreenType";
import useSecPage from "@/hooks/useSecPage";
import { getGuideline, getGuidelines } from "@/routes/guidelines";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Guideline as GuidelineType } from "@/types/guideline";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
import Guideline from "../../diretrizes/[id]/guideline";
import { CardBtnStatus, CardBtnUpdateAndDelete } from "@/components/CardBtn";
import { CardLinkUpdateAndDelete } from "@/components/CardLink";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import { usePush } from "@/context/push";
import AddGuideline from "../diretrizes/cadastrar/add-guideline";
import EditGuideline from "../diretrizes/[id]/editar/edit-guideline";
import useDeficiencyFilters from "@/hooks/useDeficiencyFilters";
import ControlBar from "@/components/ControlBar";
import useControlBar from "@/hooks/useControlBar";

const filterOptions = [
  {
    id: "creation-date",
    desc: "Por data de criação",
  },
];

type GuidelinesAdminProps = {
  isRequest?: boolean;
};

export default function GuidelinesAdmin({
  isRequest = false,
}: GuidelinesAdminProps) {
  const { isTablet, isDesktop, isMobile } = useScreenType();
  const [search, setSearch] = useState("");
  const {
    handleHearing,
    handleMotor,
    handleNeural,
    handleTea,
    handleVisual,
    hearing,
    motor,
    neural,
    tea,
    visual,
  } = useDeficiencyFilters();
  const {
    isOpen: isSecPageOpen,
    setIsOpen: setIsSecPageOpen,
    getSecPageClass,
    setNode: setSecPageContent,
    node: secPageContent,
    title: secPageTitle,
    setTitle: setSecPageTitle,
    fullScreenLink,
    setFullScreenLink,
  } = useSecPage();
  const { handleView, handleFiltersChosen, view } = useControlBar();
  const [guidesStored, setGuidesStored] = useState<GuidelineType[]>([]);
  const { isFromSearch, loadMore, onLoadLess, onLoadMore, offset } =
    usePagination({
      watchFromSearch: [search, hearing, motor, visual, neural, tea],
    });
  const { pushMsg, setShowPush } = usePush();

  useEffect(() => {
    if (pushMsg) {
      setShowPush(true);
    }
  }, []);

  const { data: guidelines, fetchStatus } = useQuery({
    queryKey: [
      "guidelines",
      search,
      hearing,
      motor,
      visual,
      neural,
      tea,
      offset,
    ],
    queryFn: async () => {
      const g = await getGuidelines({
        offset,
        keyword: search,
        deficiences: [hearing, motor, visual, neural, tea],
        isRequest: isRequest,
      });

      if ("data" in g) {
        if (guidesStored.length === 0 || isFromSearch) {
          setGuidesStored(g.data);
        } else if (fetchStatus === "fetching") {
          if (loadMore) {
            setGuidesStored((guides) => {
              const prevGuides = [...guides];
              g.data.map((g) => prevGuides.push(g));
              return prevGuides;
            });
          } else {
            setGuidesStored((guides) => {
              let prevGuides = [...guides];
              prevGuides.splice(
                guidesStored.length - (guidesStored.length - g.limit)
              );
              return prevGuides;
            });
          }
        }

        return g;
      }

      return null;
    },
  });

  const handleEditSecPage = async (id: string) => {
    const guideline = await getGuideline(id);

    if ("id" in guideline) {
      setIsSecPageOpen(true);
      setSecPageTitle(guideline.name);
      setSecPageContent(
        <EditGuideline
          guideline={guideline}
          isSecPage={true}
          handleSecPageTitle={setSecPageTitle}
        />
      );
      setFullScreenLink(`/admin/diretrizes/${id}/editar`);
    }
  };

  const handleAddSecPage = () => {
    setIsSecPageOpen(true);
    setSecPageContent(
      <AddGuideline isSecPage={true} handleSecPageTitle={setSecPageTitle} />
    );
    setFullScreenLink("/admin/diretrizes/cadastrar");
  };

  const handleReadSecPage = async (id: string) => {
    const guideline = await getGuideline(id);

    if ("id" in guideline) {
      setIsSecPageOpen(true);
      setSecPageContent(<Guideline guideline={guideline} />);
      setSecPageTitle(guideline.name);
      setFullScreenLink(`/admin/diretrizes/${id}`);
    }
  };

  return (
    <div className={getSecPageClass()}>
      <div className="guidelines">
        <ControlBar
          handleView={handleView}
          view={view}
          filtersOptions={filterOptions}
          handleFilters={handleFiltersChosen}
        />
        <h1 className="heading-1">
          {isRequest
            ? "Solicitações de inclusão de diretriz"
            : "Diretrizes de acessibilidade"}
        </h1>
        <div className="guidelines-filters">
          <div style={{ display: "flex", columnGap: "10px" }}>
            <Search
              classname="search"
              placeholderText="Buscar por diretriz..."
              handleSearch={setSearch}
              searchValue={search}
            />
            {isMobile || isTablet
              ? !isRequest && (
                  <Link
                    className="btn-default"
                    href="/admin/diretrizes/cadastrar"
                  >
                    <GoPlus />
                  </Link>
                )
              : !isRequest && (
                  <button
                    className="btn-default"
                    onClick={() => handleAddSecPage()}
                  >
                    Criar diretriz
                  </button>
                )}
          </div>
          <GuidelinesDeficiencesFilter
            onHearingChange={handleHearing}
            onMotorChange={handleMotor}
            onNeuralChange={handleNeural}
            onTeaChange={handleTea}
            onVisualChange={handleVisual}
            hearing={hearing}
            motor={motor}
            neural={neural}
            tea={tea}
            visual={visual}
          />
        </div>
        {guidesStored.length > 0 ? (
          <div className={`${view}`}>
            {guidesStored.map((guideline, i) => (
              <div className={`${view}__item`} key={guideline.id}>
                {isRequest && isDesktop && (
                  <CardBtnStatus
                    status={guideline.statusCode!}
                    mainText={guideline.name}
                    registerId={guideline.id}
                    secondaryText={guideline.description}
                    onClick={() => handleReadSecPage(guideline.id)}
                  />
                )}
                {!isRequest && isDesktop && (
                  <CardBtnUpdateAndDelete
                    mainText={guideline.name}
                    onClick={() => handleReadSecPage(guideline.id)}
                    onDelete={() => {}}
                    onUpdateClick={() => handleEditSecPage(guideline.id)}
                    registerId={guideline.id}
                    registerName={guideline.name}
                    secondaryText={guideline.description}
                  />
                )}
                {!isRequest && (isMobile || isTablet) && (
                  <CardLinkUpdateAndDelete
                    mainText={guideline.name}
                    onDelete={() => {}}
                    registerId={guideline.id}
                    registerName={guideline.name}
                    readRoute={`/admin/diretrizes/${guideline.id}`}
                    updateRoute={`/admin/diretrizes/${guideline.id}/editar`}
                    secondaryText={guideline.description}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <NoRegistersFound errorMsg="Não foram encontradas diretrizes" />
        )}
        {guidelines && (
          <Pagination
            isFromSearch={isFromSearch}
            hasNext={guidelines.hasNext}
            hasPrev={guidelines.hasPrev}
            onLoadLess={() => onLoadLess(guidelines.limit)}
            onLoadMore={() => onLoadMore(guidelines.offset)}
          />
        )}
      </div>
      {isSecPageOpen && isDesktop && (
        <SecondPage
          title={secPageTitle}
          onClick={() => setIsSecPageOpen(false)}
          fullScreenLink={fullScreenLink}
        >
          {secPageContent}
        </SecondPage>
      )}
    </div>
  );
}
