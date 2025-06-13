import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Home from "../pages/Home";
import { film, home, search, person, reader } from "ionicons/icons";
import Premiere from "../pages/Premiere";
import User from "../pages/User";
import { Component } from "ionicons/dist/types/stencil-public-runtime";
import SearchMovies from "../pages/SearchMovies";
import Cartelera from "../pages/Cartelera";

const Tabs: React.FC = () => {
  return (
    <IonTabs>
    {/**esto logra la redireccion */}
      <IonRouterOutlet> 
        <Route exact path="/tab/home" component={Home} />
         <Route exact path="/tab/premiere" component={Premiere} />
         <Route exact path="/tab/cartelera" component={Cartelera} />
         <Route exact path="/tab/user" component={User} />
         <Route exact path="/tab/search"  component={SearchMovies} />
        <Redirect exact from="/tab" to="/tab/home" />
      </IonRouterOutlet>

      <IonTabBar className="tab" slot="bottom">
        <IonTabButton className="tabButton" tab="home" href="/tab/home">
          <IonIcon icon={home} />
        </IonTabButton>
        <IonTabButton className="tabButton" tab="premiere" href="/tab/premiere">
          <IonIcon icon={film} />
        </IonTabButton>
        <IonTabButton  className="tabButton" tab="cartelera" href="/tab/cartelera">
          <IonIcon icon={reader} />
        </IonTabButton>
        <IonTabButton className="taButton" tab="search" href="/tab/search">
          <IonIcon icon={search} />
        </IonTabButton>
        <IonTabButton  className="tabButton" tab="user" href="/tab/user">
         <IonIcon icon={person}/>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
