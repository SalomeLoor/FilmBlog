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
import { film, home, search, person } from "ionicons/icons";
import Premiere from "../pages/Premiere";
import User from "../pages/User";

const Tabs: React.FC = () => {
  return (
    <IonTabs>
    {/**esto logra la redireccion */}
      <IonRouterOutlet> 
        <Route exact path="/tab/home" component={Home} />
         <Route exact path="/tab/premiere" component={Premiere} />
         <Route exact path="/tab/user" component={User} />
        <Redirect exact from="/tab" to="/tab/home" />
      </IonRouterOutlet>

      <IonTabBar className="tab" slot="bottom">
        <IonTabButton className="tabButton" tab="home" href="/tab/home">
          <IonIcon icon={home} />
        </IonTabButton>
        <IonTabButton className="tabButton" tab="premiere" href="/tab/premiere">
          <IonIcon icon={film} />
        </IonTabButton>
        <IonTabButton  className="tabButton" tab="user" href="/tab/user">
         <IonIcon icon={person}/>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
