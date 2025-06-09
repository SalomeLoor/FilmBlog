import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonRouterLink,
  IonRow,
} from "@ionic/react";
import React from "react";
//css
import "../Css/CardMovie.css";
//imgs
import NoneMovieImg from "../assets/NoneMovieImg.jpg";
//interfaces
import { ICardMovieProps } from "../Interface/IMovie";

const CardMovie: React.FC<ICardMovieProps> = ({ movies ,Actualpage,totalPages,fetchSearchResults,setActualPage}) => {
 console.log("total pages " + totalPages);
  console.log("actual page " + Actualpage);

  const handleInfiniteScroll = async (event: CustomEvent<void>) => {
    const newPage = Actualpage + 1;
    if (newPage <= totalPages) {
      await fetchSearchResults(newPage);
      setActualPage(newPage);
    }
    (event.target as HTMLIonInfiniteScrollElement).complete();
  }


  return (
    <IonPage id="main-content" >
      <IonContent fullscreen  className="card-movie-content ">
      <IonGrid >
          <IonRow>
              {movies.map((movieData) => (
                <IonCol key={movieData.id} size="6" sizeSm="4" sizeMd="3" sizeLg="2">
                  <IonRouterLink
                  
                  routerLink={`/infomovie/${movieData.id}`}
                  > 
                  <IonCard className="no-margin-card ion-no-padding content-card">
                    <img
                      className="img-card"
                       referrerPolicy="no-referrer"
                      alt="Silhouette of mountains"
                      src={
                        movieData.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                          : NoneMovieImg
                      } //verifica si existe la imagen, si no existe se coloca una por defecto
                    />

                  </IonCard>
                </IonRouterLink>
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

export default React.memo(CardMovie);// optimiza 

