export type CreateGameDTO = {
  igdbId: number;
  title: string;
  releaseDate: Date | null;
  ignoreDuringSearch?: boolean;
  companies: string[];
  coverImg: string | null;
  boxartImg: string | null;
};
