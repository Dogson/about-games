export type IGDBGame = {
  id: number;
  name: string;
  alternative_names?: {
    id: number;
    name: string;
  }[];
  release_dates?: {
    date: number;
  }[];
  involved_companies?: {
    company: {
      id: number;
      name: string;
    };
  }[];
  cover?: {
    url: string;
  };
  screenshots?: {
    url: string;
  }[];
  total_rating_count?: number;
};
