import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
//interfaces
import { IMovie, IParams } from "../Interface/IMovie";
//conexion api
import { getConnectionApi } from "../Connection/ConnectionApi";
//imgs
import NoneMovieImg from "../assets/NoneMovieImg.jpg";
import "../Css/InfoMovie.css";
import ActorAndDirector from "./ActorAndDirector";

const InfoMovie: React.FC = () => {
  const { id } = useParams<IParams>();
  console.log("id movie: " + id);

  const [movieInfo, setMovieInfo] = useState<IMovie | null>(null);

  useEffect(() => {
    const getInfoMovieById = async () => {
      try {
        const { data } = await getConnectionApi.get(`/movie/${id}`);
        setMovieInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoMovieById();
  }, [id]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="container-header">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
            <IonTitle className="pacifico-regular title"> Film Blog </IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="card-movie-content ">
        {movieInfo && (
          <IonCard key={movieInfo.id} className="card-movie">
            <img
              className="img-movie"
              alt="Silhouette of mountains"
              src={
                movieInfo.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`
                  : NoneMovieImg
              } //verifica si existe la imagen, si no existe se coloca una por defecto
            />
            <div className="container-content">
              
            <IonCardHeader className="container-headerCard">
              <IonCardTitle className="container-title oswald">
                {movieInfo.title} {""}⭐{movieInfo.vote_average}{" "}
                <span className="vote-count pompiere-regular">
                  {movieInfo.vote_count} votos
                </span>
              </IonCardTitle>
              <IonCardSubtitle className="container-subtitle">
                <div className="container-Date">
                  <span>
                    {movieInfo.release_date ? (
                      movieInfo.release_date
                    ) : (
                      <p>Not Available</p>
                    )}
                  </span>
                  <span>|</span>
                  <span>
                    {" "}
                    <strong>Duration: </strong> {movieInfo.runtime} min
                  </span>
                  <span>|</span>
                  <span>
                    <strong>Origin Country: </strong> {movieInfo.origin_country}
                  </span>
                </div>

                <span>
                  <strong>Genres: </strong>
                  {movieInfo.genres
                    .map(
                      (genero) =>
                        `${genero.name ? genero.name : "Not Available"}`
                    )
                    .join(", ")}
                </span>

                <span>
                  <strong>Languages: </strong>
                  {movieInfo.spoken_languages &&
                    movieInfo.spoken_languages
                      .map(
                        (idioma) =>
                          `${
                            idioma.english_name ? (
                              idioma.english_name
                            ) : (
                              <p>Not Available</p>
                            )
                          }`
                      )
                      .join(", ")}
                </span>
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent className="container-info oswald">
              <h2>Synopsis: </h2>
              <p>
                {movieInfo.overview ? movieInfo.overview : <p>Not Available</p>}
              </p>
              <h2> Oficial Page: </h2>
              <a
                href={movieInfo.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                {movieInfo.homepage ? movieInfo.homepage : <p>Not Available</p>}
              </a>
            </IonCardContent>
            </div>
          </IonCard>
        )}
         {movieInfo?.id && <ActorAndDirector movieInfoProp={movieInfo.id} />}{" "}
        {/**esto evita que el componente se redenderice cuando movieInfo es null */}
        <h2 className=" h oswald">Budget and Revenue</h2>
        <div className="container-budget ion-padding">
          <span>
            <strong>Budget: </strong> $
            {movieInfo?.budget ? movieInfo.budget : "0"}
          </span>
          |
          <span>
            <strong>Revenue: </strong> $
            {movieInfo?.revenue ? movieInfo.revenue : "0"}
          </span>
        </div>
       
      </IonContent>
    </IonPage>
  );
};

export default InfoMovie;
