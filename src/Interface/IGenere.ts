export interface IGenere {
    id: number, //aqui no es nesesario [] porque la url de la api no devuelve un array
    name: string,
}

export interface IGenereProps {
  movies: IGenere[];
}

export interface IParams{
    id:string,
    name:string,
}