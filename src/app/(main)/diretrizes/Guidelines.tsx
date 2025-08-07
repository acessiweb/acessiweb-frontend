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
import useSearch from "@/hooks/useSearch";
import { getGuidelinesRequests } from "@/routes/guidelines-requests";

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
  const {
    handleEndDate,
    endDate,
    handleInitialDate,
    initialDate,
    cleanDateFilter,
  } = useDateFilter();
  const { addGuidelineToCart } = useCart();
  const { isTablet, isDesktop, isMobile } = useScreenType();
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
    onLoadLess,
    onLoadMore,
    offset,
    store,
    handleStore,
    handleFiltering,
  } = usePagination({
    data: [] as GuidelineType[],
  });
  const { handleSearch, search } = useSearch({ handleFiltering });
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
  } = useDeficiencyFilters({ handleFiltering });
  const {
    isOpen: isSecPageOpen,
    handleIsOpen: handleIsSecPageOpen,
    getSecPageClass,
    handleNode: handleSecPageContent,
    node: secPageContent,
    title: secPageTitle,
    handleTitle: handleSecPageTitle,
    fullScreenLink,
    handleFullScreenLink,
  } = useSecPage();

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
      const g = isRequest
        ? await getGuidelinesRequests({
            offset,
            keyword: search,
            deficiences: [hearing, motor, visual, neural, tea],
            isRequest: isRequest,
            initialDate,
            endDate,
          })
        : await getGuidelines({
            offset,
            keyword: search,
            deficiences: [hearing, motor, visual, neural, tea],
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
      handleIsSecPageOpen(true);
      handleSecPageContent(
        <Guideline guideline={guideline} isSecPage={true} />
      );
      handleSecPageTitle(guideline.name);
      handleFullScreenLink(`/diretrizes/${id}`);
    }
  };

  const cleanAllFilters = () => {
    handleInitialDate("");
    handleEndDate("");
  };

  return (
    <div className={getSecPageClass()}>
      <div className={`${isRequest ? "requests" : "guidelines"}`}>
        <ControlBar
          handleView={handleView}
          view={view}
          filtersOptions={filterOptions}
          handleFilters={handleFiltersChosen}
          handleFiltering={handleFiltering}
        />
        <h1 className="heading-1" id="page-heading">
          {isRequest ? "Suas solicitações" : "Diretrizes de acessibilidade"}{" "}
          {isRequest && <span>de inclusão de diretriz</span>}
        </h1>
        <div className="guidelines-filters">
          {!isRequest && (
            <Search
              classname="search"
              placeholderText="Buscar por diretriz..."
              handleSearch={handleSearch}
              searchValue={search}
            />
          )}
          {isRequest && (
            <div className="requests__search-wrapper">
              <Search
                classname="search"
                placeholderText="Buscar por solicitação..."
                handleSearch={handleSearch}
                searchValue={search}
              />
              <button className="btn-default cursor-pointer">
                Criar solicitação
              </button>
            </div>
          )}
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
        {filtersChosen.length > 0 && (
          <FiltersApplied
            cleanFilters={cleanFilters}
            filtersChosen={filtersChosen}
            handleFilters={cleanAllFilters}
          >
            {isFilterApplied("creation-date") && (
              <DateFilter
                endDate={endDate}
                handleEndDate={handleEndDate}
                handleInitialDate={handleInitialDate}
                initialDate={initialDate}
                cleanDateFilter={() => {
                  deleteFilter("creation-date");
                  cleanDateFilter();
                }}
              />
            )}
          </FiltersApplied>
        )}
        {store.length > 0 ? (
          <div className={`${view}`} aria-labelledby="page-heading">
            {store.map((guideline) => (
              <div className={`${view}__item`} key={guideline.id}>
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
          onClick={() => handleIsSecPageOpen(false)}
          fullScreenLink={fullScreenLink}
        >
          {secPageContent}
        </SecondPage>
      )}
    </div>
  );
}
