export type Game = {
  id: number;
  igdbId: number;
  title: string;
  releaseDate: string;
  coverImg: string;
  boxartImg: string | null;
  companies: string[];
};
