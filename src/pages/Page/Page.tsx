import { IonButtons, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ChatSubmit from '../../components/ChatSubmit/ChatSubmit';
import ExploreContainer from '../../components/ExploreContainer';
import HeaderChat from '../../components/HeaderChat/HeaderChat';
import './Page.css';
import { Socket } from 'socket.io-client';

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
