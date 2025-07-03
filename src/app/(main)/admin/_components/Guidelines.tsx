"use client";

import GuidelinesDeficiencesFilter from "@/components/DeficiencesCheckbox";
import NoRegistersFound from "@/components/NotFound";
import Search from "@/components/Search";
import SecondPage from "@/components/SecondPage";
import { useScreenType } from "@/hooks/useScreenType";
import useSecPage from "@/hooks/useSecPage";
import { getGuideline, getGuidelines } from "@/routes/guidelines";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Guideline as GuidelineType } from "@/types/guideline";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
import Guideline from "../../diretrizes/[id]/Guideline";
import { CardBtnStatus, CardBtnUpdateAndDelete } from "@/components/CardBtn";
import { CardLinkUpdateAndDelete } from "@/components/CardLink";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import { usePush } from "@/context/push";
import AddGuideline from "../diretrizes/cadastrar/AddGuideline";
import EditGuideline from "../diretrizes/[id]/editar/EditGuideline";
import useDeficiencyFilters from "@/hooks/useDeficiencyFilters";
import ControlBar from "@/components/ControlBar";
import useControlBar from "@/hooks/useControlBar";
import { deleteGuideline } from "@/routes/user-guidelines";
import { useSession } from "next-auth/react";
import FiltersApplied from "@/components/FiltersApplied";
import DateFilter from "@/components/DateFilter";
import { FilterOptions } from "@/types/filter";
import useDateFilter from "@/hooks/useDateFilter";

const filterOptions: FilterOptions = [
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
  const { handleEndDate, endDate, handleInitialDate, initialDate } =
    useDateFilter();
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
  const {
    handleView,
    handleFiltersChosen,
    view,
    filtersChosen,
    deleteFilter,
    cleanFilters,
    isFilterApplied,
  } = useControlBar();
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
  const { pushMsg, setShowPush } = usePush();
  const { data: session } = useSession();

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

  const handleDelete = async (guidelineId: string) => {
    if (session) {
      const deleted = await deleteGuideline(session.user.id, guidelineId);

      if ("id" in deleted) {
        handleDelete(guidelineId);
      }
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
          <div className={`${view}`}>
            {store.map((guideline) => (
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
                    onDelete={() => handleDelete(guideline.id)}
                    onUpdateClick={() => handleEditSecPage(guideline.id)}
                    registerId={guideline.id}
                    registerName={guideline.name}
                    secondaryText={guideline.description}
                  />
                )}
                {!isRequest && (isMobile || isTablet) && (
                  <CardLinkUpdateAndDelete
                    mainText={guideline.name}
                    onDelete={() => handleDelete(guideline.id)}
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
