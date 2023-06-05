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
