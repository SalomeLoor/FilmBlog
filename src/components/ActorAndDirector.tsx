import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
//css
import "../Css/ActorAndDirector.css";
//imgs
import notPhoto from "../assets/notPhoto.jpg";
// import required modules
import { Pagination } from "swiper/modules";
//interfaces
import { IActor, IActorAndDirectorProps, IDirector } from "../Interface/IMovie";
//conexion api
import { getConnectionApi } from "../Connection/ConnectionApi";
import { getUniqueByName } from "../Functions/functions";

const ActorAndDirector: React.FC<IActorAndDirectorProps> = ({
  movieInfoProp,
}) => {
  console.log("id peli prop " + movieInfoProp);
  const [Actor, setActor] = useState<IActor [] | null>(null);
  const [director , setDirector] = useState<IDirector [] | null>(null);

  useEffect(() => {
    const getdepartmentCast = async () => {
      if (!movieInfoProp) return; //  si no hay id, no hace nada
      try {
        const { data } = await getConnectionApi.get(
          `/movie/${movieInfoProp}/credits`
        );
        setActor(data.cast);
        setDirector(data.crew);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getdepartmentCast();
  }, [movieInfoProp]);

 
  // 🧠 Obtener actores y directores únicos llamando a la funcion
  const uniqueActors = getUniqueByName(Actor, "Acting");
  const uniqueDirectors = getUniqueByName(director, "Directing");


  return (
      <div className="ion-padding">
         <h2 className="oswald H2">Actors</h2>
      <Swiper
        slidesPerView={3} 
        spaceBetween={10}
        modules={[Pagination]}
        className="mySwiper"
      >
        {uniqueActors?.length === 0 ? (
          <p>Not Available</p>
        ) : (
          uniqueActors?.map((actor: IActor) => (
            <SwiperSlide key={actor.cast_id}>
              <div className="actor-slide">
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                : notPhoto
            }
            alt={actor.name}
          />
          <div className="actor-info">
            <h3>{actor.name}</h3>
            <p>Character: {actor.character}</p>
          </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
        <h2 className="oswald H2">Directors</h2>
        <Swiper
        slidesPerView={3}
        spaceBetween={10}
        modules={[Pagination]}
        className="mySwiper "
        >
        { uniqueDirectors.length===0 ? (<p>Not Available</p>) : (
         uniqueDirectors?.map((director) => (
          <SwiperSlide key={director.id}>
            <div className="actor-slide">
                <img
                  src={
                    director.profile_path
                      ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                      : notPhoto
                  }
                  alt={director.name}
                />
                <div className="actor-info">
                  <h3>{director.name}</h3>
                  <p>Job: {director.job}</p>
                </div>
              </div>
          </SwiperSlide>
        ))
        )}
        </Swiper>
      </div>
  );
};

export default ActorAndDirector;
