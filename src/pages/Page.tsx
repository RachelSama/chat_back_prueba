import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import ChatSubmit from '../components/ChatSubmit/ChatSubmit';
import ExploreContainer from '../components/ExploreContainer';
import HeaderChat from '../components/HeaderChat/HeaderChat';
import './Page.css';

const Page: React.FC = () => {
  const [messages, setMessages] = useState<{ message: string; isBot: boolean; }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { name } = useParams<{ name: string; }>();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
});

  const handleSubmit = (message: string) => {
    const newMessages = [...messages, { message, isBot: false }];

    setMessages(newMessages);
};

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

      <IonContent fullscreen>
        <HeaderChat name={name} />
        <ExploreContainer name={name} />
        <ChatSubmit handleSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
