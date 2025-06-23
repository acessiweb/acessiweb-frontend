"use client";

import { CardBtnAdd } from "@/components/card-btn";
import { CardLinkAdd } from "@/components/card-link";
import GuidelinesDeficiencesFilter from "@/components/deficiences-checkbox";
import NoRegistersFound from "@/components/not-found";
import Search from "@/components/search";
import SecondPage from "@/components/second-page";
import { useCart } from "@/context/cart";
import { useScreenType } from "@/hooks/useScreenType";
import useSecPage from "@/hooks/useSecPage";
import { getGuideline, getGuidelines } from "@/routes/guidelines";
import { useQuery } from "@tanstack/react-query";
import Guideline from "./[id]/guideline";
import { useState } from "react";
import { Guideline as GuidelineType } from "@/types/guideline";
import Pagination from "@/components/pagination";
import usePagination from "@/hooks/usePagination";
import ControlBar from "@/components/control-bar";
import useDeficiencyFilters from "@/hooks/useDeficiencyFilters";
import useControlBar from "@/hooks/useControlBar";
import FiltersApplied from "@/components/filters-applied";

const filterOptions = [
  {
    id: "creation-date",
    desc: "Por data de criação",
  },
];

export default function GuidelinesUser() {
  const { addGuidelineToCart } = useCart();
  const { isTablet, isDesktop, isMobile } = useScreenType();
  const [search, setSearch] = useState<string>("");
  const {
    handleView,
    filtersChosen,
    handleFiltersChosen,
    view,
    cleanFilters,
    deleteFilter,
  } = useControlBar();
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
  } = useSecPage();
  const [guidesStored, setGuidesStored] = useState<GuidelineType[]>([]);
  const { isFromSearch, loadMore, onLoadLess, onLoadMore, offset } =
    usePagination({
      watchFromSearch: [search, hearing, motor, visual, neural, tea],
    });

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
        isRequest: false,
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

  const handleSecPage = async (id: string) => {
    const guideline = await getGuideline(id);

    if ("id" in guideline) {
      setIsSecPageOpen(true);
      setSecPageContent(<Guideline guideline={guideline} />);
      setSecPageTitle(guideline.name);
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
        <h1 className="heading-1">Diretrizes de acessibilidade</h1>
        <div className="guidelines-filters">
          <Search
            classname="search"
            placeholderText="Buscar por diretriz..."
            handleSearch={setSearch}
            searchValue={search}
          />
          <GuidelinesDeficiencesFilter
            onHearingChange={handleHearing}
            onMotorChange={handleMotor}
            onNeuralChange={handleNeural}
            onTeaChange={handleTea}
            onVisualChange={handleVisual}
          />
        </div>
        {filtersChosen.length > 0 && (
          <FiltersApplied
            cleanFilters={cleanFilters}
            deleteFilter={deleteFilter}
            filtersChosen={filtersChosen}
          />
        )}
        {guidesStored.length > 0 ? (
          <div className={`${view}`}>
            {guidesStored.map((guideline, i) => (
              <div className={`${view}__item`} key={i}>
                {isDesktop && (
                  <CardBtnAdd
                    onAdd={addGuidelineToCart}
                    mainText={guideline.name}
                    onClick={() => handleSecPage(guideline.id)}
                    registerId={guideline.id}
                    registerName={guideline.name}
                    secondaryText={guideline.description}
                  />
                )}
                {(isMobile || isTablet) && (
                  <CardLinkAdd
                    onAdd={addGuidelineToCart}
                    mainText={guideline.name}
                    registerId={guideline.id}
                    registerName={guideline.name}
                    secondaryText={guideline.description}
                    readRoute={`diretrizes/${guideline.id}`}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <NoRegistersFound errorMsg="Não foram encontradas diretrizes" />
        )}
        <Pagination
          isFromSearch={isFromSearch}
          hasNext={guidelines?.hasNext}
          hasPrev={guidelines?.hasPrev}
          onLoadLess={() => onLoadLess(guidelines?.limit)}
          onLoadMore={() => onLoadMore(guidelines?.offset)}
        />
      </div>
      {isSecPageOpen && isDesktop && (
        <SecondPage
          title={secPageTitle}
          onClick={() => setIsSecPageOpen(false)}
        >
          {secPageContent}
        </SecondPage>
      )}
    </div>
  );
}
