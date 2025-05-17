import GuidelinesFilters from "@/common/filters/guidelines";
import ControlBarDesktop from "@/components/control-bar-desktop";
import Guidelines from "@/components/guidelines";
import Head from "@/components/head";

type GuidelinesUserProps = {
  headTitle?: string;
};

export default function GuidelinesUser({
  headTitle = "Diretrizes de acessibilidade",
}: GuidelinesUserProps) {
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
        isAdmin={false}
      />
    </>
  );
}
