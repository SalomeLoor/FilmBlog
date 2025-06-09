import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Menu from "./components/Menu";
import MovieByGenere from "./components/MovieByGenere";
import InfoMovie from "./components/InfoMovie";
import Tabs from "./components/Tabs";
import Login from "./pages/Login";
import Register from "./pages/Register";


setupIonicReact();

const App: React.FC = () => (
  <IonApp >
    <IonReactRouter >
     {/* Menú lateral */}
        <Menu />

        {/* Contenido principal */}
        <IonRouterOutlet id="main-content">
          <Route path="/tab" component={Tabs}/>


          <Route exact path="/genero/:id/:name" component={MovieByGenere} />
          <Route exact path="/infomovie/:id" component={InfoMovie} />

           <Route exact path="/register" component={Register}/>
           <Route exact path="/login" component={Login} />

          
          <Route exact path="/">
            <Redirect  to="/register" />
          </Route>
        
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
