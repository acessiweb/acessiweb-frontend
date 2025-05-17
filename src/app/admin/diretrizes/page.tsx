import GuidelinesFilters from "@/common/filters/guidelines";
import ControlBarDesktop from "@/components/control-bar-desktop";
import Guidelines from "@/components/guidelines";
import Head from "@/components/head";

type GuidelinesAdminProps = {
  headTitle?: string;
};

export default function GuidelinesAdmin({
  headTitle = "Diretrizes de acessibilidade",
}: GuidelinesAdminProps) {
  return (
    <>
      <Head title={headTitle} />
      <Guidelines
        controlBar={
          <ControlBarDesktop
            searchPlaceholderText="Buscar por diretriz..."
            controls={<GuidelinesFilters />}
          />
        }
        isAdmin={true}
      />
    </>
  );
}
