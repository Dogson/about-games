import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { Video } from "../../models/Video.model.ts";
import "../../styles/ag-grid-theme.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router/routes.config.ts";

ModuleRegistry.registerModules([AllCommunityModule]);

type ChannelVideosTableProps = {
  videos: Video[];
};

const ThumbnailAndTitle = ({
  title,
  thumbnailUrl,
}: {
  title: string;
  thumbnailUrl: string;
}) => (
  <div className="flex items-center gap-3">
    <img
      src={thumbnailUrl}
      alt={title}
      className="h-10 w-18 shrink-0 rounded object-cover"
    />
    <span className="truncate text-sm font-medium">{title}</span>
  </div>
);

const ChannelVideosTable = ({ videos }: ChannelVideosTableProps) => {
  const navigate = useNavigate();

  const columnDefs: ColDef<Video>[] = useMemo(
    () => [
      {
        headerName: "Name",
        field: "title",
        minWidth: 250,
        flex: 2,
        cellRenderer: (params: ICellRendererParams<Video>) =>
          params.data ? (
            <ThumbnailAndTitle
              title={params.data.title}
              thumbnailUrl={params.data.thumbnailUrl}
            />
          ) : null,
      },
      {
        headerName: "Number of games",
        field: "gamesCount",
        minWidth: 150,
      },
      {
        headerName: "Validated",
        field: "validated",
        minWidth: 120,
        cellRenderer: (params: ICellRendererParams<Video>) =>
          params.value ? "Yes" : "No",
      },
      {
        headerName: "Ignored",
        field: "ignored",
        minWidth: 120,
        cellRenderer: (params: ICellRendererParams<Video>) =>
          params.value ? "Yes" : "No",
      },
    ],
    [],
  );

  return (
    <div
      className="ag-theme-custom flex flex-col gap-2 overflow-hidden rounded-lg
        shadow-lg"
    >
      <AgGridReact
        rowData={videos}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, resizable: true, sortable: true }}
        suppressCellFocus={true}
        domLayout="autoHeight"
        onRowClicked={(params) => {
          if (!params.data) return;
          const video = params.data;
          navigate(
            routes.admin.video.goTo({
              id: video.id,
              title: video.title,
            }),
          );
        }}
      />
    </div>
  );
};

export default ChannelVideosTable;
