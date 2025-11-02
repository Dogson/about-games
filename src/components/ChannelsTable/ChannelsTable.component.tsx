import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import "../../styles/ag-grid-theme.css";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import type { Channel } from "../../models/Channel.model.ts";
import ChannelNameAndThumbnail from "../ChannelNameAndThumbnail/ChannelNameAndThumbnail.component.tsx";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import Tooltip from "../Tooltip/Tooltip.component.tsx";
import SearchInput from "../Inputs/SearchInput/SearchInput.component.tsx";

ModuleRegistry.registerModules([AllCommunityModule]);

export type ChannelsTableProps = {
  channels: Channel[];
};

const LastParsingErrorCell = ({
  error,
  date,
  channelId,
}: {
  error: string;
  date: string;
  channelId: number;
}) => {
  if (!error) return null;
  return (
    <>
      <div
        className="flex items-center gap-2 text-sm font-medium text-red-400"
        data-tooltip-id={`tooltip-channel-error-${channelId}`}
      >
        <div
          className="flex h-6 w-6 items-center justify-center rounded-full
            bg-red-500 text-white"
        >
          <AiOutlineExclamationCircle size={14} />
        </div>
        <span>{date}</span>
      </div>
      <Tooltip
        id={`tooltip-channel-error-${channelId}`}
        place="top"
        stayOpenedOnHover
      >
        {error}
      </Tooltip>
    </>
  );
};

const ChannelsTable = ({ channels }: ChannelsTableProps) => {
  const [searchText, setSearchText] = useState("");

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
        headerName: "Parsing Attribute",
        field: "parsingOptions.parsingAttribute",
        minWidth: 150,
      },
      {
        headerName: "Last Parsing Error",
        field: "lastParsingError",
        minWidth: 200,
        cellRenderer: (params: ICellRendererParams<Channel>) =>
          params.value ? (
            <LastParsingErrorCell
              error={params.value?.message}
              date={new Date().toLocaleDateString()}
              channelId={params.data?.id || 0}
            />
          ) : null,
      },
      {
        headerName: "Game Finder Accuracy",
        field: "accuracy",
        minWidth: 150,
        cellRenderer: (params: ICellRendererParams<Channel>) => {
          if (!params.data) return null;
          const { totalGamesFoundCount, totalGamesCount } = params.data;
          if (totalGamesCount === 0) return "0%";
          const ratio = Math.round(
            (totalGamesFoundCount / totalGamesCount) * 100,
          );
          return (
            <span className="font-semibold text-green-400">{`${ratio}%`}</span>
          );
        },
      },
    ],
    [],
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
      />
    </div>
  );
};

export default ChannelsTable;
