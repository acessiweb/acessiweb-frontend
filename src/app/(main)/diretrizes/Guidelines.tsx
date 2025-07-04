"use client";

import { CardBtnAdd } from "@/components/CardBtn";
import { CardLinkAdd } from "@/components/CardLink";
import DeficiencesCheckbox from "@/components/DeficiencesCheckbox";
import NoRegistersFound from "@/components/NotFound";
import Search from "@/components/Search";
import SecondPage from "@/components/SecondPage";
import { useCart } from "@/context/cart";
import { useScreenType } from "@/hooks/useScreenType";
import useSecPage from "@/hooks/useSecPage";
import { getGuideline, getGuidelines } from "@/routes/guidelines";
import { useQuery } from "@tanstack/react-query";
import Guideline from "./[id]/Guideline";
import { useState } from "react";
import { Guideline as GuidelineType } from "@/types/guideline";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
import ControlBar from "@/components/ControlBar";
import useDeficiencyFilters from "@/hooks/useDeficiencyFilters";
import useControlBar from "@/hooks/useControlBar";
import FiltersApplied from "@/components/FiltersApplied";
import useDateFilter from "@/hooks/useDateFilter";
import { FilterOptions } from "@/types/filter";
import DateFilter from "@/components/DateFilter";

const filterOptions: FilterOptions = [
  {
    id: "creation-date",
    desc: "Por data de criação",
  },
];

type GuidelinesUserProps = {
  isRequest?: boolean;
};

export default function GuidelinesUser({
  isRequest = false,
}: GuidelinesUserProps) {
  const { handleEndDate, endDate, handleInitialDate, initialDate } =
    useDateFilter();
  const { addGuidelineToCart } = useCart();
  const { isTablet, isDesktop, isMobile } = useScreenType();
  const [search, setSearch] = useState<string>("");
  const {
    handleView,
    handleFiltersChosen,
    view,
    filtersChosen,
    deleteFilter,
    cleanFilters,
    isFilterApplied,
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
    fullScreenLink,
    setFullScreenLink,
  } = useSecPage();
  const { onLoadLess, onLoadMore, offset, isFiltering, store, handleStore } =
    usePagination({
      watch: [
        search,
        hearing,
        motor,
        visual,
        neural,
        tea,
        initialDate,
        endDate,
      ],
      data: [] as GuidelineType[],
    });
  const { data: guidelines } = useQuery({
    queryKey: [
      "guidelines",
      search,
      hearing,
      motor,
      visual,
      neural,
      tea,
      offset,
      initialDate,
      endDate,
    ],
    queryFn: async () => {
      const g = await getGuidelines({
        offset,
        keyword: search,
        deficiences: [hearing, motor, visual, neural, tea],
        isRequest: isRequest,
        initialDate,
        endDate,
      });

      if ("data" in g) {
        handleStore(g);
      }

      return g;
    },
  });
  const handleSecPage = async (id: string) => {
    const guideline = await getGuideline(id);

    if ("id" in guideline) {
      setIsSecPageOpen(true);
      setSecPageContent(<Guideline guideline={guideline} isSecPage={true} />);
      setSecPageTitle(guideline.name);
      setFullScreenLink(`/diretrizes/${id}`);
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
        <h1 className="heading-1" id="page-heading">
          Diretrizes de acessibilidade
        </h1>
        <div className="guidelines-filters">
          <Search
            classname="search"
            placeholderText="Buscar por diretriz..."
            handleSearch={setSearch}
            searchValue={search}
          />
          <DeficiencesCheckbox
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
        <FiltersApplied
          cleanFilters={cleanFilters}
          filtersChosen={filtersChosen}
        >
          {isFilterApplied("creation-date") && (
            <DateFilter
              endDate={endDate}
              handleEndDate={handleEndDate}
              handleInitialDate={handleInitialDate}
              initialDate={initialDate}
              deleteFilter={deleteFilter}
            />
          )}
        </FiltersApplied>
        {store.length > 0 ? (
          <div className={`${view}`} aria-labelledby="page-heading">
            {store.map((guideline, i) => (
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
        {guidelines && "data" in guidelines && (
          <Pagination
            isFiltering={isFiltering}
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
