import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useCallback, useEffect, useState } from "react";
import { getConnectionApi } from "../Connection/ConnectionApi";
import { IMovie } from "../Interface/IMovie";
import CardMovie from "../components/CardMovie";

const SearchMovies: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const [Actualpage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //useCallback es un hook que devuelve una funcion memorizada
  //useCallback se usa para evitar que la funcion se vuelva a crear en cada renderizado
  //useCallback se usa para optimizar el rendimiento de la aplicacion cuando se traen muchos datos
  const router = useIonRouter();
  
  const [searchType, setSearchType] = useState<"Movie" | "Actor" | null>(null);


  const fetchSearchResults = useCallback(
    async (page = 1) => {
      try {
         // Buscar por nombre de película
        const { data } = await getConnectionApi.get(
          `/search/movie?query=${searchText}&page=${page}`
        );
       if (data.results.length > 0) {
         setSearchResults((anteriorPage) =>
           page === 1 ? data.results : [...anteriorPage, ...data.results]
         ); //este estado se actualiza y obtiene las peliculas y las paginas
         setTotalPages(data.total_pages); //este estado se actualiza y obtiene el total de paginas
         setSearchType("Movie"); // ✅ Busqueda por nombre de película
         console.log("Respuesta completa:", data);
       }else {
        // Si no hay resultados por nombre, buscar por actor
        const personRes = await getConnectionApi.get(
          `/search/person?query=${searchText}`
        );
        const person = personRes.data.results[0];
        if (person) {
          const creditsRes = await getConnectionApi.get(
            `/person/${person.id}/movie_credits`
          );
          setSearchResults(creditsRes.data.cast || []);
          setTotalPages(1); // no paginamos en este caso
          setSearchType("Actor"); // ✅ Búsqueda por actor
        } else {
          setSearchResults([]);
          setTotalPages(1);
          setSearchType(null); // No se encontró nada
        }
       }
        
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    [searchText]
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
  }, [fetchSearchResults, router,searchText]);

  return (
    <IonPage>
      <IonHeader>
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

      {/*Esto evita que el componente card movie se renderice antes de que carguen bien las peliculas */}
      <IonContent className="ion-padding" style={{ "--background": "#E8F9FF" }}>
        {searchResults.length > 0 ? (
           <>
      <p className="pompiere-regular textinfo" style={{ marginBottom: "10px" }}>
        {searchType === "Movie" && `🔎 Results by movie name`}
        {searchType === "Actor" && `🎭 Results by actor`}
      </p>
          <CardMovie
            movies={searchResults}
            Actualpage={Actualpage}
            totalPages={totalPages}
            fetchSearchResults={fetchSearchResults}
            setActualPage={setActualPage}
          />
        </>
        ) : (
          <p className="pompiere-regular textinfo">Search for a movie by name or actor✨</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SearchMovies;
