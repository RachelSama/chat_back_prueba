import { IonButtons, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ChatSubmit from '../../components/ChatSubmit/ChatSubmit';
import ExploreContainer from '../../components/ExploreContainer/ExploreContainer';
import HeaderChat from '../../components/HeaderChat/HeaderChat';
import './Page.css';
import { Socket } from 'socket.io-client';

/**
 * Este es un componente funcional de TypeScript React que representa una página de chat con un
 * encabezado, un contenedor de chat y un formulario de envío de chat, tomando un objeto de socket y un
 * nombre de sala como accesorios.
 * @param  - Este es un componente funcional de React llamado "Página" que admite un solo accesorio
 * llamado "socket" de tipo "Socket". El componente también usa el enlace "useParams" de React Router
 * para extraer el parámetro "roomName" de la URL. El componente devuelve un componente IonPage del
 * Ionic
 * @returns Un componente funcional de React llamado "Página" que toma un accesorio llamado "socket" de
 * tipo "Socket" y muestra una página Ionic con un encabezado que contiene un título y un botón de
 * menú. También representa tres componentes secundarios: "HeaderChat", "ExploreContainer" y
 * "ChatSubmit", a cada uno de los cuales se le pasan los accesorios "roomName" y "socket". El
 * accesorio "nombre de la habitación"
 */
interface PageProps {
  socket: Socket
}

const Page: React.FC<PageProps> = ({ socket }) => {
  const { roomName } = useParams<{ roomName: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Chat Unobike</IonTitle>
        </IonToolbar>
      </IonHeader>

        <HeaderChat roomName={roomName} />
        <ExploreContainer roomName={roomName} socket={socket} />
        <ChatSubmit roomName={roomName} socket={socket} />
    </IonPage>
  );
};

export default Page;
