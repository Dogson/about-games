import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import "../../styles/ag-grid-theme.css";
import type { Channel } from "../../models/Channel.model.ts";
import ChannelNameAndThumbnail from "../ChannelNameAndThumbnail/ChannelNameAndThumbnail.component.tsx";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import SearchInput from "../Inputs/SearchInput/SearchInput.component.tsx";
import useAppRoutes from "../../hooks/useAppRoutes.hook.ts";
import LanguageCode from "../LanguageCode/LanguageCode.component.tsx";
import { useTranslation } from "react-i18next";
import { formatDateLocalized } from "../../helpers/utils/datetime.utils.ts";

ModuleRegistry.registerModules([AllCommunityModule]);

export type ChannelsTableProps = {
  channels: Channel[];
};

const ChannelsTable = ({ channels }: ChannelsTableProps) => {
  const [searchText, setSearchText] = useState("");
  const { goToChannel } = useAppRoutes();
  const { t, i18n } = useTranslation();

  const columnDefs: ColDef<Channel>[] = useMemo(
    () => [
      {
        headerName: "Channel",
        field: "name",
        minWidth: 200,
        cellRenderer: (params: ICellRendererParams<Channel>) =>
          params.data ? (
            <ChannelNameAndThumbnail
              name={params.data.name}
              thumbnailUrl={params.data.thumbnailUrl}
            />
          ) : null,
      },
      { headerName: "Videos", field: "videosCount", minWidth: 100 },
      {
        headerName: "Language",
        field: "language",
        minWidth: 150,
        cellRenderer: (params: ICellRendererParams<Channel>) => {
          if (!params.data) return null;
          const { language } = params.data;
          return <LanguageCode language={language} />;
        },
      },
      {
        headerName: t("Admin.addedOn"),
        field: "createdAt",
        minWidth: 150,
        valueFormatter: (params) =>
          formatDateLocalized(params.value, i18n.language),
      },
    ],
    [i18n.language, t],
  );

  return (
    <div
      className="ag-theme-custom flex flex-col gap-2 overflow-hidden rounded-lg
        shadow-lg"
    >
      <SearchInput
        searchText={searchText}
        onSearch={setSearchText}
        placeholder="Search Channels..."
        onClear={() => setSearchText("")}
        size="sm"
      />
      <AgGridReact
        quickFilterText={searchText}
        rowData={channels}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, resizable: true, sortable: true }}
        suppressCellFocus={true}
        domLayout="autoHeight"
        onRowClicked={(params) => {
          if (!params.data) return;
          goToChannel({ id: params.data.id, title: params.data.name });
        }}
      />
    </div>
  );
};

export default ChannelsTable;
