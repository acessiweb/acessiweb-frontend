"use client";

import { CardBtn } from "@/components/CardBtn";
import DeficiencesCheckbox from "@/components/DeficiencesCheckbox";
import NoRegistersFound from "@/components/NotFound";
import Search from "@/components/Search";
import SecondPage from "@/components/SecondPage";
import { useScreenType } from "@/hooks/useScreenType";
import useSecPage from "@/hooks/useSecPage";
import {
  deleteGuideline,
  getGuideline,
  getGuidelines,
} from "@/routes/guidelines";
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
import {
  getGuidelinesRequests,
  updateGuidelineStatus,
} from "@/routes/guidelines-requests";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import AddGuidelineRequest from "../solicitacoes/cadastrar/AddGuidelineRequest";
import { useCart } from "@/context/cart";
import { UpdateBtn, UpdateLink } from "@/components/card/Update";
import StatusBtn from "@/components/card/Status";
import DeleteBtn from "@/components/card/Delete";
import CardLink from "@/components/CardLink";
import EditGuideline from "../admin/diretrizes/[id]/editar/EditGuideline";
import useAction from "@/hooks/useAction";
import { AddBtn } from "@/components/card/Add";
import { BsSend } from "react-icons/bs";

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
  const { addGuidelineToCart } = useCart();

  const {
    handleEndDate,
    endDate,
    handleInitialDate,
    initialDate,
    cleanDateFilter,
  } = useDateFilter();

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
    handleDelete: handleDeletion,
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

  const { handleDelete } = useAction();

  const {
    secPageClass,
    handleAddSecPage,
    handleEditSecPage,
    handleReadSecPage,
    isOpen: isSecPageOpen,
    handleIsOpen: handleIsSecPageOpen,
    title: secPageTitle,
    fullScreenLink,
    node: secPageContent,
  } = useGuidelineSecPage();

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

  const handleGuidelineShip = async (id: string) => {
    await updateGuidelineStatus(id);
  };

  const cleanAllFilters = () => {
    handleInitialDate("");
    handleEndDate("");
  };

  return (
    <div className={secPageClass}>
      <div className={`${isRequest ? "requests" : "guidelines"}`}>
        <ControlBar
          handleView={handleView}
          view={view}
          filtersOptions={filterOptions}
          handleFilters={handleFiltersChosen}
          handleFiltering={handleFiltering}
        />
        <h1 className="heading-1" id="page-heading">
          {isRequest ? "Minhas solicitações" : "Diretrizes de acessibilidade"}{" "}
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
              {isRequest && (isMobile || isTablet) ? (
                <Link
                  className="btn-default cursor-pointer"
                  href="/solicitacoes/cadastrar"
                >
                  <GoPlus />
                </Link>
              ) : (
                <button
                  className="btn-default cursor-pointer"
                  onClick={() => handleAddSecPage()}
                >
                  Criar solicitação
                </button>
              )}
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
                {isRequest && isDesktop && (
                  <CardBtn
                    mainText={guideline.name}
                    onClick={() => handleReadSecPage(guideline.id)}
                    secondaryText={guideline.description}
                  >
                    <StatusBtn status={guideline.statusCode} />
                    {guideline.statusCode === "STANDBY" && (
                      <button
                        className="btn-transparent cursor-pointer"
                        title="Enviar"
                        onClick={() => handleGuidelineShip(guideline.id)}
                        aria-label="Ação de enviar para análise"
                      >
                        <BsSend aria-hidden={true} focusable={false} />
                      </button>
                    )}
                    {!["APPROVED", "PENDING"].includes(
                      guideline.statusCode!
                    ) && (
                      <>
                        <UpdateBtn
                          onUpdateClick={() => handleEditSecPage(guideline.id)}
                        />
                        <DeleteBtn
                          onDelete={() =>
                            handleDelete(
                              guideline.id,
                              deleteGuideline,
                              handleDeletion
                            )
                          }
                          registerId={guideline.id}
                          registerName={guideline.name}
                        />
                      </>
                    )}
                  </CardBtn>
                )}
                {isRequest && !isDesktop && (
                  <CardLink
                    mainText={guideline.name}
                    secondaryText={guideline.description}
                    readRoute={`solicitacoes/${guideline.id}`}
                  >
                    <StatusBtn status={guideline.statusCode} />
                    <UpdateLink
                      updateRoute={`solicitacoes/${guideline.id}/editar`}
                    />
                    <DeleteBtn
                      onDelete={() =>
                        handleDelete(
                          guideline.id,
                          deleteGuideline,
                          handleDeletion
                        )
                      }
                      registerId={guideline.id}
                      registerName={guideline.name}
                    />
                  </CardLink>
                )}
                {!isRequest && (
                  <CardBtn
                    mainText={guideline.name}
                    secondaryText={guideline.description}
                    onClick={() => handleReadSecPage(guideline.id)}
                  >
                    <AddBtn
                      onAdd={addGuidelineToCart}
                      registerId={guideline.id}
                      registerName={guideline.name}
                    />
                  </CardBtn>
                )}
              </div>
            ))}
          </div>
        ) : (
          <NoRegistersFound
            errorMsg={`Não foram encontradas ${
              isRequest ? "solicitações" : "diretrizes"
            }`}
          />
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

function useGuidelineSecPage() {
  const {
    isOpen,
    handleIsOpen,
    getSecPageClass,
    handleNode: handleSecPageContent,
    node,
    title,
    handleTitle: handleSecPageTitle,
    fullScreenLink,
    handleFullScreenLink,
  } = useSecPage();

  const handleAddSecPage = () => {
    handleIsOpen(true);
    handleSecPageContent(
      <AddGuidelineRequest
        isSecPage={true}
        handleSecPageTitle={handleSecPageTitle}
      />
    );
    handleFullScreenLink("/solicitacoes/cadastrar");
  };

  const handleReadSecPage = async (id: string) => {
    const guideline = await getGuideline(id);

    if ("id" in guideline) {
      handleIsOpen(true);
      handleSecPageContent(<Guideline guideline={guideline} />);
      handleSecPageTitle(guideline.name);
      handleFullScreenLink(`/admin/diretrizes/${id}`);
    }
  };

  const handleEditSecPage = async (id: string) => {
    const guideline = await getGuideline(id);

    if ("id" in guideline) {
      handleIsOpen(true);
      handleSecPageTitle(guideline.name);
      handleSecPageContent(
        <EditGuideline
          guideline={guideline}
          isSecPage={true}
          handleSecPageTitle={handleSecPageTitle}
        />
      );
      handleFullScreenLink(`/admin/diretrizes/${id}/editar`);
    }
  };

  return {
    secPageClass: getSecPageClass(),
    handleAddSecPage,
    handleEditSecPage,
    handleReadSecPage,
    isOpen,
    handleIsOpen,
    title,
    fullScreenLink,
    node,
  };
}
