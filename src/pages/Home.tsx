import {
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
//css
import "../Css/Home.css";
//conexion a la api
import { getConnectionApi } from "../Connection/ConnectionApi";
//react
import { useCallback, useEffect, useState } from "react";
//Interfaces
import { IMovie } from "../Interface/IMovie";
//componentes
import CardMovie from "../components/CardMovie";
import iconFilm from "../assets/iconFilm.png"

const Home: React.FC<IMovie> = () => {
  //const {token} = useAuth();

  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const [Actualpage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //useCallback es un hook que devuelve una funcion memorizada
  //useCallback se usa para evitar que la funcion se vuelva a crear en cada renderizado
  //useCallback se usa para optimizar el rendimiento de la aplicacion cuando se traen muchos datos
  const router = useIonRouter();

  

  const fetchSearchResults = useCallback(
    async (page = 1) => {
      try {
       
       const { data } = await getConnectionApi.get( `/trending/movie/day?page=${page}`);
        setSearchResults((anteriorPage) =>
          page === 1 ? data.results : [...anteriorPage, ...data.results]
        ); //este estado se actualiza y obtiene las peliculas y las paginas
        setTotalPages(data.total_pages); //este estado se actualiza y obtiene el total de paginas
        console.log("Respuesta completa:", data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    []
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    //verifica si hay token para que pueda acceder
    if (!token) {
      router.push("/register", "root");
      return;
    }

    fetchSearchResults(1);
    setActualPage(1);
  }, [fetchSearchResults, router]);

  console.log(searchResults);

  return (
    <IonPage>
      <IonHeader className="ion-hearder">
        <IonToolbar className="container-header">
          <IonButtons slot="start">
            <IonMenuButton className="menu-button" />
          </IonButtons>
          <IonTitle className="pacifico-regular title">
            Film Blog
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {/*Esto evita que el componente card movie se renderice antes de que carguen bien las peliculas */}
      <IonContent>
        {searchResults.length > 0 ? (
          <CardMovie
            movies={searchResults}
            Actualpage={Actualpage}
            totalPages={totalPages}
            fetchSearchResults={fetchSearchResults}
            setActualPage={setActualPage}
          />
        ) : (
          <p className="textinfo pompiere-regular">Cargando películas...</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
