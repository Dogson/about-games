export type Game = {
  id: number;
  igdbId: number;
  title: string;
  releaseDate: string | null;
  coverImg: string | null;
  boxartImg: string | null;
  companies: string[];
};
