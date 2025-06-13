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
import { IMovie } from "../Interface/IMovie";
import { getConnectionApi } from "../Connection/ConnectionApi";
import NoneMovieImg from "../assets/NoneMovieImg.jpg";

const Premiere: React.FC = () => {
  const [premiere, setPremiere] = useState<IMovie[]>([]);
  const [Actualpage, setActualPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(1);

  console.log("total pages por premiere: " + TotalPage);
  console.log("actual page por premiere:  " + Actualpage);

  console.log("Premieres: ", premiere);

  const handlePremiere = useCallback(async (page = 1) => {
    try {
      const { data } = await getConnectionApi.get(
        `/movie/now_playing?page=${page}`
      );
      setPremiere((anteriorPage) =>
        page === 1 ? data.results : [...anteriorPage, ...data.results]
      );
      setTotalPage(data.total_pages);
    } catch (error) {
      console.log("Error to get movies by movies", error);
    }
  }, []);

   const handleInfiniteScroll = async (event: CustomEvent<void>) => {
    const newPage = Actualpage + 1;
    if (newPage <= TotalPage) {
      await handlePremiere(newPage);
      setActualPage(newPage);
    }
    (event.target as HTMLIonInfiniteScrollElement).complete();
  };

  useEffect(() => {
    handlePremiere(1);
    setActualPage(1);
  }, [handlePremiere]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar">
          <div className="toolbar">
            <IonButtons>
              <IonBackButton defaultHref="/tab/home" />
            </IonButtons>
            <IonTitle className="pacifico-regular title2">Premiere</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="content-card">
          <IonRow>
            {premiere.map((data) => (
              <IonCol key={data.id} size="6" sizeSm="4" sizeMd="3" sizeLg="2">
                <IonCard 
                className="no-margin-card card-movie"
                routerLink={`/infomovie/${data.id}`}>
                  <img
                    alt="Silhouette of mountains"
                    referrerPolicy="no-referrer"
                    src={
                      data.poster_path
                        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                        : NoneMovieImg
                    }
                  />
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonInfiniteScroll
          threshold="100px"
          onIonInfinite={handleInfiniteScroll}
          disabled={Actualpage >= TotalPage}
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

export default Premiere;
