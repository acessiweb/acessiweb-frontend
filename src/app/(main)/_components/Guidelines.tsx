"use client";

import ControlBar from "@/components/ControlBar";
import useControlBar from "@/hooks/useControlBar";
import usePagination from "@/hooks/usePagination";
import { FilterOptions } from "@/types/filter";
import { useMemo } from "react";
import { Guideline as GuidelineType } from "@/types/guideline";
import useSearch from "@/hooks/useSearch";
import useDeficiencyFilters from "@/hooks/useDeficiencyFilters";
import useDateFilter from "@/hooks/useDateFilter";
import { useScreenType } from "@/hooks/useScreenType";
import { useCart } from "@/context/cart";
import Search from "@/components/Search";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import DeficiencesCheckbox from "@/components/DeficiencesCheckbox";
import FiltersApplied from "@/components/FiltersApplied";
import DateFilter from "@/components/DateFilter";
import NoRegistersFound from "@/components/NotFound";
import Pagination from "@/components/Pagination";
import SecondPage from "@/components/SecondPage";
import { useQuery } from "@tanstack/react-query";
import {
  getGuidelinesRequests,
  updateGuidelineStatus,
} from "@/routes/guidelines-requests";
import {
  deleteGuideline,
  getGuideline,
  getGuidelines,
  restoreGuideline,
} from "@/routes/guidelines";
import useSecPage from "@/hooks/useSecPage";
import useAction from "@/hooks/useAction";
import { CardBtn } from "@/components/CardBtn";
import { AddBtn } from "@/components/card/Add";
import { UpdateBtn, UpdateLink } from "@/components/card/Update";
import DeleteBtn from "@/components/card/Delete";
import StatusBtn from "@/components/card/Status";
import { BsSend } from "react-icons/bs";
import CardLink from "@/components/CardLink";
import Guideline from "./Guideline";
import AddEditGuideline from "./AddEditGuideline";
import RemovedFilter from "@/components/RemovedFilter";
import { usePush } from "@/context/push";

type GuidelinesProps = {
  isRequest: boolean;
  isAdmin: boolean;
};

export default function Guidelines({ isAdmin, isRequest }: GuidelinesProps) {
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
  } = useDeficiencyFilters({
    handleFiltering,
  });

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
  } = useGuidelinesSecPage({ isRequest, isAdmin });

  const { handleDelete } = useAction();

  const { setShowPush, setPushMsg } = usePush();

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
      isFilterApplied("deleted"),
    ],
    queryFn: async () => {
      const g = isRequest
        ? await getGuidelinesRequests({
            offset,
            keyword: search,
            deficiences: [hearing, motor, visual, neural, tea],
            initialDate,
            endDate,
            isRequest,
          })
        : await getGuidelines({
            offset,
            keyword: search,
            deficiences: [hearing, motor, visual, neural, tea],
            initialDate,
            endDate,
            isDeleted: isFilterApplied("deleted"),
          });

      if ("data" in g) {
        handleStore(g);
      }

      return g;
    },
  });

  const title = useMemo(() => {
    if (isAdmin && isRequest) return "Solicitações de inclusão de diretriz";
    if ((isAdmin && !isRequest) || !(isAdmin && isRequest))
      return "Diretrizes de acessibilidade";
    if (!isAdmin && isRequest)
      return "Minhas solicitações de inclusão de diretriz";
    return "";
  }, [isAdmin, isRequest]);

  const filterOptions = useMemo(() => {
    let fo: FilterOptions = [
      {
        id: "creation-date",
        desc: "Por data de criação",
      },
    ];

    if (isAdmin) {
      fo.push({
        id: "deleted",
        desc: "Removidas",
      });
    }

    return fo;
  }, [isAdmin]);

  const cleanAllFilters = () => {
    handleInitialDate("");
    handleEndDate("");
  };

  const handleGuidelineShip = async (id: string) => {
    const guideline = await updateGuidelineStatus(id);

    if (guideline && "id" in guideline) {
      const storeCopy = [...store];

      console.log(storeCopy);

      const newStore = storeCopy.map((guide) => {
        if (guide.id === guideline.id) return guideline;
        return guide;
      });

      console.log(guideline);
      console.log(newStore);

      handleStore({
        ...storeCopy,
        data: newStore,
      });

      setShowPush(true);
      setPushMsg("Solicitação enviada para análise");
    }
  };

  const handleRestore = async (guidelineId: string) => {
    await restoreGuideline(guidelineId);
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
          showMoreOptions={isRequest && isAdmin}
          moreOptions={["Buscar por removidas"]}
        />
        <h1 className="heading-1" id="page-heading">
          {title}
        </h1>
        <div className="guidelines-filters">
          <div className="guidelines-filters__search-wrapper">
            <Search
              classname="search"
              placeholderText={`Buscar por ${
                isRequest ? "solicitação" : "diretriz"
              }...`}
              handleSearch={handleSearch}
              searchValue={search}
            />
            {!isAdmin && isRequest && (isMobile || isTablet) && (
              <Link
                className="btn-default cursor-pointer"
                href="/solicitacoes/cadastrar"
              >
                <GoPlus />
              </Link>
            )}
            {!isAdmin && isRequest && isDesktop && (
              <button
                className="btn-default cursor-pointer"
                onClick={() => handleAddSecPage()}
              >
                Criar solicitação
              </button>
            )}
            {isAdmin && !isRequest && (isMobile || isTablet) && (
              <Link
                className="btn-default cursor-pointer"
                href="/admin/diretrizes/cadastrar"
              >
                <GoPlus />
              </Link>
            )}
            {isAdmin && !isRequest && isDesktop && (
              <button
                className="btn-default cursor-pointer"
                onClick={() => handleAddSecPage()}
              >
                Criar diretriz
              </button>
            )}
          </div>
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
            {isFilterApplied("deleted") && (
              <RemovedFilter
                desc="Diretrizes removidas"
                onClick={() => deleteFilter("deleted")}
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
                    {["STANDBY", "REJECTED"].includes(
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
                    {isAdmin ? (
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
                    ) : (
                      <AddBtn
                        onAdd={addGuidelineToCart}
                        registerId={guideline.id}
                        registerName={guideline.name}
                      />
                    )}
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

function useGuidelinesSecPage({
  isRequest,
  isAdmin,
}: {
  isRequest: boolean;
  isAdmin: boolean;
}) {
  const {
    isOpen,
    handleIsOpen,
    getSecPageClass,
    handleNode,
    node,
    title,
    handleTitle,
    fullScreenLink,
    handleFullScreenLink,
  } = useSecPage();

  const handleAddSecPage = () => {
    const fullScreenLink = isAdmin
      ? "/admin/diretrizes/cadastrar"
      : "/solicitacoes/cadastrar";

    handleIsOpen(true);
    handleNode(<AddEditGuideline isRequest={isRequest} />);
    handleFullScreenLink(fullScreenLink);
    handleTitle("");
  };

  const handleReadSecPage = async (id: string) => {
    const guideline = await getGuideline(id);

    if ("id" in guideline) {
      let fullScreenLink = "";

      if (!isAdmin && isRequest) fullScreenLink = `/solicitacoes/${id}`;
      if (!isAdmin && !isRequest) fullScreenLink = `/diretrizes/${id}`;
      if (isAdmin && !isRequest) fullScreenLink = `/admin/diretrizes/${id}`;
      if (isAdmin && isRequest) fullScreenLink = `/admin/solicitacoes/${id}`;

      handleIsOpen(true);
      handleNode(<Guideline guideline={guideline} isRequest={isRequest} />);
      handleTitle(guideline.name);
      handleFullScreenLink(fullScreenLink);
    }
  };

  const handleEditSecPage = async (id: string) => {
    const guideline = await getGuideline(id);

    if ("id" in guideline) {
      let fullScreenLink = "";

      if (!isAdmin && isRequest) fullScreenLink = `/solicitacoes/editar/${id}`;
      if (isAdmin && !isRequest)
        fullScreenLink = `/admin/diretrizes/editar/${id}`;
      if (isAdmin && isRequest) fullScreenLink = `/admin/solicitacoes/${id}`;

      handleIsOpen(true);
      handleTitle(guideline.name);
      handleNode(
        <AddEditGuideline
          isEditPage={true}
          isRequest={isRequest}
          guideline={guideline}
        />
      );
      handleFullScreenLink(fullScreenLink);
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
