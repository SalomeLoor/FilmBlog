import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
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


const Home: React.FC<IMovie> = () => {

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const [Actualpage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 //useCallback es un hook que devuelve una funcion memorizada
  //useCallback se usa para evitar que la funcion se vuelva a crear en cada renderizado
  //useCallback se usa para optimizar el rendimiento de la aplicacion cuando se traen muchos datos
  
    const  fetchSearchResults = useCallback(async (page = 1) => {
   try{
     const url = searchText
      ? `/search/movie?query=${searchText}&page=${page}`
      : `/trending/movie/day?page=${page}`;

    const { data } = await getConnectionApi.get(url);
    setSearchResults(anteriorPage=> page===1? data.results : [...anteriorPage, ...data.results]); //este estado se actualiza y obtiene las peliculas y las paginas
    setTotalPages(data.total_pages); //este estado se actualiza y obtiene el total de paginas
   }
    catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [searchText]);

  useEffect(() => {
    fetchSearchResults(1);
    setActualPage(1);
  }, [fetchSearchResults]);
  console.log(searchResults);

  return (
    <IonPage>
      <IonHeader className="ion-hearder">
  <IonToolbar className="container-header">
    <IonButtons slot="start" >
      <IonMenuButton  className="menu-button" />
    </IonButtons>
    <IonTitle className="pacifico-regular title">Film Blog</IonTitle>
  </IonToolbar>

  <IonToolbar className="container-header">
    <IonSearchbar
      className="pompiere-regular search"
      animated={true}
      debounce={1000}
      showCancelButton="focus"
      cancelButtonText="Cancelar"
      value={searchText}
      placeholder="Buscar Películas"
      onIonChange={(event) => setSearchText(event.detail.value!)}
    ></IonSearchbar>
  </IonToolbar>
</IonHeader>

      <IonContent >
        <CardMovie movies={searchResults} Actualpage={Actualpage} totalPages={totalPages} fetchSearchResults={fetchSearchResults} setActualPage={setActualPage}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
