import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
//css
import "../Css/MovieByGenere.css";
//imgs
import NoneMovieImg from "../assets/NoneMovieImg.jpg";
//interfaces
import { IParams } from "../Interface/IGenere";
import { IMovie } from "../Interface/IMovie";
//componentes
import { getConnectionApi } from "../Connection/ConnectionApi";
 
const MovieByGenere: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const { id, name } = useParams<IParams>(); //se obtiene el parametro pasado
  const [Actualpage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log("total pages por Generos" + totalPages);
  console.log("actual page por Generos " + Actualpage);

  const getMoviesByGeneres = useCallback(
    async (page = 1) => {
      try {
        const { data } = await getConnectionApi.get(
          `/discover/movie?with_genres=${id}?page=${page}`
        );
        setMovies((anteriorPage) =>
          page === 1 ? data.results : [...anteriorPage, ...data.results]
        ); //este estado se actualiza y obtiene las peliculas y las paginas
        setTotalPages(data.total_pages); //este estado se actualiza y obtiene el total de paginas
      } catch (error) {
        console.error("Error fetching movies by genre:", error);
      }
    },
    [id]
  );

  const handleInfiniteScroll = async (event: CustomEvent<void>) => {
    const newPage = Actualpage + 1;
    if (newPage <= totalPages) {
      await getMoviesByGeneres(newPage);
      setActualPage(newPage);
    }
    (event.target as HTMLIonInfiniteScrollElement).complete();
  };

  useEffect(() => {
    getMoviesByGeneres(1);
    setActualPage(1);
  }, [getMoviesByGeneres]);
  console.log(movies);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar">
          <div className="toolbar">
            <IonButtons>
              <IonBackButton defaultHref="/tab/home" />
            </IonButtons>
            <IonTitle className="pacifico-regular title2">{name}</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="card-movie-content ">
        <IonGrid className="content-card">
          <IonRow>
            {movies.map((movie) => (
              <IonCol key={movie.id} size="6" sizeSm="4" sizeMd="3" sizeLg="2">
                <IonCard
                  className="no-margin-card card-movie"
                  routerLink={`/infomovie/${movie.id}`}
                >
                  <img
                    alt="Silhouette of mountains"
                    referrerPolicy="no-referrer"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : NoneMovieImg
                    } //verifica si existe la imagen, si no existe se coloca una por defecto
                  />
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonInfiniteScroll
          threshold="100px"
          onIonInfinite={handleInfiniteScroll}
          disabled={Actualpage >= totalPages}
        >
          <IonInfiniteScrollContent
            loadingText="Cargando más películas..."
            loadingSpinner="bubbles"
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default MovieByGenere;
