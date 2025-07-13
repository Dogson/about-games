import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import "../../styles/ag-grid-theme.css";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import type { Channel } from "../../models/Channel.model.ts";
import ChannelNameAndThumbnail from "../ChannelNameAndThumbnail/ChannelNameAndThumbnail.component.tsx";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import Tooltip from "../Tooltip/Tooltip.component.tsx";

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
        className="flex items-center gap-1 text-red-500"
        data-tooltip-id={`tooltip-channel-error-${channelId}`}
      >
        <div
          className="flex h-5 w-5 items-center justify-center rounded-full
            bg-red-500 text-white"
        >
          <AiOutlineExclamationCircle size={12} />
        </div>
        <span className="text-xs text-white">{date}</span>
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
  const columnDefs: ColDef<Channel>[] = useMemo(
    () => [
      {
        headerName: "Channel",
        field: "name",
        cellRenderer: (params: ICellRendererParams<Channel>) => {
          if (!params.data) return null;

          return (
            <ChannelNameAndThumbnail
              name={params.data.name}
              thumbnailUrl={params.data.thumbnailUrl}
            />
          );
        },
      },
      {
        headerName: "Videos",
        field: "videosCount",
      },
      {
        headerName: "Parsing Attribute",
        field: "parsingOptions.parsingAttribute",
      },
      {
        headerName: "Last Parsing Error",
        field: "lastParsingError",
        cellRenderer: (params: ICellRendererParams<Channel>) =>
          params.value ? (
            <LastParsingErrorCell
              error={params.value?.message}
              date={new Date().toLocaleDateString()} // Replace with real date if available
              channelId={params.data?.id || 0}
            />
          ) : null,
      },
      {
        headerName: "Game Finder Accuracy",
        cellRenderer: (params: ICellRendererParams<Channel>) => {
          if (!params.data) return null;
          const { totalGamesFoundCount, totalGamesCount } = params.data;
          if (totalGamesCount === 0) return "0%";
          const ratio = Math.round(
            (totalGamesFoundCount / totalGamesCount) * 100,
          );
          return <>{`${ratio}%`}</>;
        },
      },
    ],
    [],
  );

  return (
    <div className="ag-theme-custom">
      <AgGridReact
        rowData={channels}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, resizable: true }}
        suppressCellFocus={true}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default ChannelsTable;
