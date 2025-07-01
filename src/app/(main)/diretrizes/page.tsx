"use client";

import GuidelinesFilters from "@/common/filters/guidelines";
import ControlBarDesktop from "@/components/control-bar-desktop";
import Guidelines from "@/components/guidelines";

export default function GuidelinesUser() {
  return (
    <Guidelines
      controlBar={
        <ControlBarDesktop
          searchPlaceholderText="Buscar por diretriz..."
          controls={<GuidelinesFilters />}
        />
      }
      isAdmin={false}
    />
  );
}
