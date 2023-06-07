import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { mailOutline, mailSharp } from 'ionicons/icons';
import './Menu.css';
import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

/**
 * Este es un componente de TypeScript React que muestra un menú con una lista de salas y una entrada
 * de mensaje de difusión, y permite al usuario navegar a diferentes páginas.
 * @param  - - `AppPage`: una interfaz que define las propiedades de la página de una aplicación,
 * incluida su URL, los íconos de iOS y Android y el título.
 * @returns Un componente funcional de React llamado `Menu` que representa un componente `IonMenu` con
 * una lista de componentes `IonItem` basada en la matriz `appPages`. También incluye un `área de
 * texto` y un `botón` para transmitir mensajes a todas las habitaciones, y utiliza ganchos
 * `useLocation` y `useHistory` de `react-router-dom`. El componente recibe una prop `socket` que
 */
interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

interface MenuProps {
  socket: Socket;
}

const Menu: React.FC<MenuProps> = ({ socket }) => {
  const location = useLocation();
  const history = useHistory();
  const [rooms, setRooms] = useState<any[]>([]);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  
  /**
   * `const appPages: AppPage[] = rooms.map((roomName, index) => ({...}))` está creando una matriz de
   * objetos `AppPage` basada en la matriz `rooms`. Para cada elemento en la matriz `rooms`, crea un
   * nuevo objeto `AppPage` con una propiedad `title` establecida en el nombre de la habitación, una
   * propiedad `url` establecida en `/page/` y `iosIcon Las propiedades ` y `mdIcon` se
   * establecen en `mailOutline` y `mailSharp`, respectivamente. La matriz resultante de objetos
   * `AppPage` se almacena en la constante `appPages`.
   */
  const appPages: AppPage[] = rooms.map((roomName, index) => ({
    title: roomName,
    url: `/page/${roomName}`,
    iosIcon: mailOutline,
    mdIcon: mailSharp
  }));


  useEffect(() => {
    socket.on("roomListResponse", data => setRooms(data));
    socket.on("newRoom", data => setRooms([...rooms, data]));
  }, [socket, rooms]);

  /**
   * Esta función emite un mensaje de difusión con datos específicos a través de una conexión de socket
   * y restablece el estado del mensaje de difusión.
   */
  const handleBroadcastMessage = () => {
    if (broadcastMessage.trim()) {
      socket.emit("broadcastMessage", {
        text: broadcastMessage,
        uuid: "1234",
        name: "Unobike",
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      setBroadcastMessage("");
    }
  };

  /**
   * La función redirige al usuario a la página de inicio cuando se hace clic en la bandeja de entrada.
   */
  const handleInboxClick = () => {
    history.push("/");
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
        <IonListHeader onClick={handleInboxClick}>Inbox</IonListHeader>
          <IonNote>Conversaciones</IonNote>
          <div className="broadcast__message">
          <textarea
            rows={4}
            placeholder="Escribe un mensaje de difusión"
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            className="broadcast__input"
          />
          <button onClick={handleBroadcastMessage} className="broadcast__button">
            Enviar a todas las salas
          </button>
        </div>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
