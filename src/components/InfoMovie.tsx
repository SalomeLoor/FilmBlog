import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
//interfaces
import { IDataComments, IDataCommentsView, IMovie, IParams } from "../Interface/IMovie";
//conexion api
import { getConnectionApi } from "../Connection/ConnectionApi";
//imgs
import NoneMovieImg from "../assets/NoneMovieImg.jpg";
import "../Css/InfoMovie.css";
import ActorAndDirector from "./ActorAndDirector";
import { add, closeCircle, person, send } from "ionicons/icons";
import { connectionBackend } from "../Connection/connectionBackend";
import { useShowAlert } from "../Functions/Hooks";
import { FormatDateTime } from "../Functions/functions";

const InfoMovie: React.FC = () => {
  const { id } = useParams<IParams>();
  console.log("id movie del component movieInfo: " + id);

  const [movieInfo, setMovieInfo] = useState<IMovie | null>(null);
  const [ocultar, setOcultar] = useState(false);

  //para agg los comentarios  
  const showAlert = useShowAlert();
  const dataUserString = localStorage.getItem("user");
  const dataUser = dataUserString ? JSON.parse(dataUserString) : null;
  const [comments, setComments] = useState<string>("");

  console.log("Comentario:", comments, "movie_id:", id, "user_id:", dataUser?.id);

  const handleComments = async () => {
    if (!comments || !id || !dataUser?.id) {
      await showAlert("Faltan datos requeridos para comentar", "Error");
      return;
    }
    try {
      const { data } = await connectionBackend.post<IDataComments>(
        "/comments",
        {
          commet: comments,
          movie_id: id,
          user_id: dataUser?.id,
        }
      );
      console.log("datos enviados: ", data);
      if (data.message) {
        await showAlert(
          `Comments add successfully ✨\n${data.message}`,
          "Successfully"
        );
      }
      setComments(""); // limpia el input
      await getdataComments(); // 🔥 vuelve a obtener los comentarios
    } catch (error: any) {
      console.log(error);
      //validacion de errores especificos por codigo de estado
      if (error.response?.status === 409) {
        await showAlert("You have already commented on this movie", "Warning");
      } else if (error.response?.status === 400) {
        await showAlert("Please fill in all required fileds", "Warning");
      } else {
        await showAlert("Something went wrong", "Error");
      }
    }
  };

  const [DataComments, setDataComments] = useState<IDataCommentsView | null>(null);
  const getdataComments = async () => {
    try {
      const { data } = await connectionBackend.get<IDataCommentsView>(
        `/obtener/${id}`
      );
      setDataComments(data);
      console.log("Comentarios Obtenidos", data);
    } catch (error: any) {
      console.log(error);
      await showAlert(error.message, "Error");
    }
  };
 

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
    getdataComments()
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="container-header">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="card-movie-content ">
        {movieInfo && (
          <IonCard key={movieInfo.id} className="card-movie">
            <img
              className="img-movie"
              alt="Silhouette of mountains"
              referrerPolicy="no-referrer"
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
                      <strong>Origin Country: </strong>{" "}
                      {movieInfo.origin_country}
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
                    {
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
                  {movieInfo.overview ? (
                    movieInfo.overview
                  ) : (
                    <p>Not Available</p>
                  )}
                </p>
                <h2> Oficial Page: </h2>
                <a
                  href={movieInfo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {movieInfo.homepage ? (
                    movieInfo.homepage
                  ) : (
                    <p>Not Available</p>
                  )}
                </a>
                {/**SECCION PARA COMENTAR UNA PELI */}
                <IonButton className='btnSumit btnComment ' onClick={() => setOcultar(true)}>
                  Comment
                </IonButton>
                {ocultar && (
                  <IonItem className="input-comments" > 
                    <IonInput
                      value={comments}
                      onIonInput={(e) => setComments(e.detail.value ?? "")}
                      type="text"
                      placeholder="Add Comment"
                    />{" "}
                    <IonIcon className="icon-input" icon={send} onClick={handleComments} />{" "}
                    <IonIcon
                      className="icon-input"
                      icon={closeCircle}
                      onClick={() => setOcultar(false)}
                    />
                  </IonItem>
                )}
              </IonCardContent>
            </div>
          </IonCard>
        )}

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

        {/**esto evita que el componente se redenderice cuando movieInfo es null */}
        {movieInfo?.id && <ActorAndDirector movieInfoProp={movieInfo.id} />}{" "}

        {/**mostrar los comentarios guardados */}
        <IonTitle className="oswald H2">Comments</IonTitle>
        <section className="section-comments ion-padding oswald">
          {Array.isArray(DataComments?.commentsData) && DataComments.commentsData.length > 0 ? (
            DataComments.commentsData.map((data, index) => (
              <div className="CommentsByUser" key={index}>
                <IonIcon icon={person}/> {data.user.user} <span className="fechaComment">{FormatDateTime(data.createdAt)}</span>
                <p>{data.commet}</p>
              </div>
            ))
          ) : (
            <p>Not have comments view</p>
          )}
        </section>
      </IonContent>
    </IonPage>
  );
};

export default InfoMovie;
