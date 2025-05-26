import {
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
//css
import "../Css/Menu.css"
//conexion a la api
import { getConnectionApi } from "../Connection/ConnectionApi";
import { IGenere } from "../Interface/IGenere";

const Menu: React.FC = () => {
  const [Genere, setGenere] = useState<IGenere[]>([]);
  console.log(Genere);

  useEffect(() => {
    const getGenere = async () => {
      const { data } = await getConnectionApi.get(
        `/genre/movie/list?language=en`
      );
      setGenere(data.genres);
    };
    getGenere();
  }, [setGenere]);

  

  return (
    <IonMenu side="start" contentId="main-content" className="Menu" >
      <IonHeader >
        <IonToolbar className="Menu">
          <IonTitle className="pacifico-regular title">Film Blog</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding container-genere">

        <IonList className="genere">
          {Genere.map((genere) => (
            <IonButton  className="pompiere-regular aesthetic-button" key={genere.id} routerLink={`/genero/${genere.id}/${genere.name}`}>
              {genere.name}
            </IonButton>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
