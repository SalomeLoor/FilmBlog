
export interface IMovie {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  original_language: string;
  adult: boolean;
  vote_average: number;
  vote_count: number;
  genres: {
    id: number;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    name: string;
    iso_639_1: string;
  }[];
  origin_country: string[];
  homepage: string;
  budget: number;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
}
//props
export interface ICardMovieProps {
  movies: IMovie[];
  totalPages: number;
  Actualpage: number;
  fetchSearchResults: (page: number) => Promise<void>;
  setActualPage: (page: number) => void;

}
//parametros de la url
export interface IParams {
  id: string;
  name: string;
}
//actor
export interface IActor {
  cast_id: number;
  name: string;
  profile_path: string;
  known_for_department: string;
  character: string;//papel
  popularity: number;
}
//director
export interface IDirector {
  id: number;
  name: string;
  profile_path: string;
  known_for_department: string;
  job: string;//papel
  popularity: number;
  department: string;
}

export interface IActorAndDirectorProps {
  movieInfoProp: number;
}

export interface IDataComments {
  commet: string;
  movie_id: number
  user_id: number;
  message: string;
}
export interface IDataCommentsView {
  commentsData: {
    id: number;
    commet: string;
    movie_id: number;
    state: boolean;
    user_id: number;
    createdAt: string;
    user: {
      user: string;
      email: string;
    };
  }[];
  message: string;
}

export interface FormatDateTimeOptions {
  weekday: "short" | "long" | "narrow";
  day: "2-digit" | "numeric";
  month: "short" | "long" | "narrow" | "numeric" | "2-digit";
  year: "numeric" | "2-digit";
  //hour: "2-digit" | "numeric";
  //minute: "2-digit" | "numeric";
  //econd: "2-digit" | "numeric";
}
