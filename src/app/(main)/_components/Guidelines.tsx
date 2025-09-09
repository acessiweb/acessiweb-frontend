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
import { AddBtn } from "@/components/card/Add";
import { UpdateBtn, UpdateLink } from "@/components/card/Update";
import DeleteBtn from "@/components/card/Delete";
import StatusBtn from "@/components/card/Status";
import { BsSend } from "react-icons/bs";
import Guideline from "./Guideline";
import AddEditGuideline from "./AddEditGuideline";
import RemovedFilter from "@/components/RemovedFilter";
import { usePush } from "@/context/push";
import Card from "@/components/Card";
import Loader from "@/components/Loader";
import RequestAnalyze from "../admin/solicitacoes/[id]/analisar/Request";
import RestoreBtn from "@/components/card/Restore";

type GuidelinesProps = {
  isRequest: boolean;
  isAdmin: boolean;
  handleAdd?: (id: string, name: string) => void;
};

export default function Guidelines({
  isAdmin,
  isRequest,
  handleAdd,
}: GuidelinesProps) {
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
    handleFiltering,
    handleDelete,
    handlePagination,
    updateItemFromStore,
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

  const { setShowPush, setPushMsg } = usePush();

  const { data: guidelines, status } = useQuery({
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
      const res = isRequest
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

      if (res.ok && "data" in res) {
        handlePagination(res.data);
      }

      return "data" in res ? res.data : res;
    },
  });

  const title = useMemo(() => {
    if (isAdmin && isRequest) return "Solicitações de inclusão de diretriz";
    if ((isAdmin && !isRequest) || (!isAdmin && !isRequest))
      return "Diretrizes de acessibilidade";
    if (!isAdmin && isRequest)
      return (
        <>
          Minhas solicitações <span>de inclusão de diretriz</span>
        </>
      );
    return "";
  }, [isAdmin, isRequest]);

  const filterOptions = useMemo(() => {
    const fo: FilterOptions = [
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
    cleanDateFilter();
  };

  const handleGuidelineShip = async (id: string) => {
    const res = await updateGuidelineStatus(id);

    if (res.ok && "data" in res) {
      setShowPush(true);
      setPushMsg("Solicitação enviada para análise");
      updateItemFromStore(res.data);
    }
  };

  const handleRestore = async (guidelineId: string) => {
    const res = await restoreGuideline(guidelineId);

    if (res.ok && "data" in res) {
      updateItemFromStore(res.data as GuidelineType); // NÃO TÁ FUNCIONANDO
      setShowPush(true);
      setPushMsg("Diretriz restaurada com sucesso 🎉");
    }

    if (!res.ok && "errors" in res) {
      setShowPush(true);
      setPushMsg(res.errors[0].message);
    }
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
                  cleanDateFilter();
                  deleteFilter("creation-date");
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
        {status === "pending" && (
          <Loader
            msg={`Buscando ${isRequest ? "solicitações" : "diretrizes"}...`}
          />
        )}
        {status === "success" && store.length > 0 && (
          <div className={`${view}`} aria-labelledby="page-heading">
            {store.map((guideline) => (
              <div className={`${view}__item`} key={guideline.id}>
                {isRequest && (
                  <Card
                    mainText={guideline.name}
                    onClick={() =>
                      isAdmin
                        ? handleEditSecPage(guideline.id)
                        : handleReadSecPage(guideline.id)
                    }
                    secondaryText={guideline.description}
                    isLink={!isDesktop}
                    onKeyDown={() => handleReadSecPage(guideline.id)}
                    readRoute={
                      isAdmin
                        ? `/admin/solicitacoes/${guideline.id}`
                        : `/solicitacoes/${guideline.id}`
                    }
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
                        {isDesktop ? (
                          <UpdateBtn
                            onUpdateClick={() =>
                              handleEditSecPage(guideline.id)
                            }
                          />
                        ) : (
                          <UpdateLink
                            updateRoute={`/solicitacoes/${guideline.id}/editar`}
                          />
                        )}
                        <DeleteBtn
                          onDelete={() =>
                            handleDelete(guideline.id, deleteGuideline)
                          }
                          registerId={guideline.id}
                          registerName={guideline.name}
                        />
                      </>
                    )}
                  </Card>
                )}
                {!isRequest && (
                  <Card
                    mainText={guideline.name}
                    secondaryText={guideline.description}
                    onClick={() => handleReadSecPage(guideline.id)}
                    onKeyDown={() => handleReadSecPage(guideline.id)}
                    isLink={!isDesktop}
                    readRoute={
                      isAdmin
                        ? `/admin/diretrizes/${guideline.id}`
                        : `/diretrizes/${guideline.id}`
                    }
                  >
                    {isAdmin && !isFilterApplied("deleted") && (
                      <>
                        {isDesktop ? (
                          <UpdateBtn
                            onUpdateClick={() =>
                              handleEditSecPage(guideline.id)
                            }
                          />
                        ) : (
                          <UpdateLink
                            updateRoute={`/admin/diretrizes/${guideline.id}/editar`}
                          />
                        )}
                        <DeleteBtn
                          onDelete={() =>
                            handleDelete(guideline.id, deleteGuideline)
                          }
                          registerId={guideline.id}
                          registerName={guideline.name}
                        />
                      </>
                    )}
                    {isAdmin && isFilterApplied("deleted") && (
                      <RestoreBtn
                        onRestore={() => handleRestore(guideline.id)}
                      />
                    )}
                    {!isAdmin && (
                      <AddBtn
                        onAdd={
                          handleAdd
                            ? () => handleAdd(guideline.id, guideline.name)
                            : addGuidelineToCart
                        }
                        registerId={guideline.id}
                        registerName={guideline.name}
                      />
                    )}
                  </Card>
                )}
              </div>
            ))}
          </div>
        )}
        {(status === "error" ||
          (status !== "pending" && store.length === 0)) && (
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
    const res = await getGuideline(id);

    if ("data" in res) {
      let fullScreenLink = "";

      if (!isAdmin && isRequest) fullScreenLink = `/solicitacoes/${id}`;
      if (!isAdmin && !isRequest) fullScreenLink = `/diretrizes/${id}`;
      if (isAdmin && !isRequest) fullScreenLink = `/admin/diretrizes/${id}`;
      if (isAdmin && isRequest) fullScreenLink = `/admin/solicitacoes/${id}`;

      handleIsOpen(true);
      handleNode(<Guideline guideline={res.data} isRequest={isRequest} />);
      handleTitle(res.data.name);
      handleFullScreenLink(fullScreenLink);
    }
  };

  const handleEditSecPage = async (id: string) => {
    const res = await getGuideline(id);

    if (res.ok && "data" in res) {
      let fullScreenLink = "";

      if (!isAdmin && isRequest) fullScreenLink = `/solicitacoes/editar/${id}`;
      if (isAdmin && !isRequest)
        fullScreenLink = `/admin/diretrizes/editar/${id}`;
      if (isAdmin && isRequest)
        fullScreenLink = `/admin/solicitacoes/${id}/analisar`;

      handleIsOpen(true);
      handleTitle(res.data.name);
      handleNode(
        isAdmin && isRequest ? (
          <RequestAnalyze request={res.data} />
        ) : (
          <AddEditGuideline
            isEditPage={true}
            isRequest={isRequest}
            guideline={res.data}
          />
        )
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
