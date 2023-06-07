import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Page from './pages/Page/Page';
import socketIO from "socket.io-client"

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Welcome from './pages/Welcome/Welcome';
import Menu from './components/Menu/Menu';

setupIonicReact();

/**
 * Este código define el componente principal de la aplicación, que se llama `App`. Es un componente
 * funcional que devuelve código JSX, el cual define la estructura y el comportamiento de la
 * aplicación.
 */

const App: React.FC = () => {

  /**
   * Este código está creando una conexión de socket a un servidor en la URL "http://localhost:4000"
   * usando la biblioteca socket.io-client. También pasa un objeto de autenticación con una propiedad
   * UUID establecida en "1234" al servidor. El objeto de socket resultante se pasa luego como
   * accesorio a los componentes Menú y Página.
   */
  const socket = socketIO("http://localhost:4000", {
    auth: {
      uuid: "1234"
    }
  })
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu socket={socket}/>
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
            <Welcome />
            </Route>
            <Route path="/page/:roomName" exact={true}>
              <Page socket={socket} />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
