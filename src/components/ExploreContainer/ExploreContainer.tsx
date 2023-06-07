import { Socket } from 'socket.io-client';
import './ExploreContainer.css';
import { useEffect, useRef, useState } from 'react';
import { IonCard, IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';

interface Message {
  user: string;
  text: string;
  timestamp: string;
}

interface ContainerProps {
  roomName: string;
  socket: Socket;
}

const ExploreContainer: React.FC<ContainerProps> = ({ roomName, socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.emit('getRoomData', roomName);
    socket.on("roomData", (data: Message[]) => {
      setMessages(data)
    });
  }, [roomName, socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  function formatDateTime(timestamp: string) {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <IonCard className='cardChat'>
      <IonContent>
        <IonGrid>
          <div className='messageContainer'>
            {messages.map((message, index) => {
              const formattedDateTime = formatDateTime(message.timestamp);

              return message.user !== 'Unobike' ? (
                <IonRow className='messageRow' key={index}>
                  <IonCol>
                    <IonRow style={{ flexDirection: 'row' }}>
                      <div className='messageCol'>{message.user}</div>
                    </IonRow>
                    <IonRow style={{ flexDirection: 'row' }}>
                      <div
                        className='messageCol'
                        style={{
                          backgroundColor: '#ac3939',
                          color: 'white',
                        }}
                      >
                        <p>{message.text}</p>
                        <p className='message__timestamp'>{formattedDateTime}</p>
                      </div>

                    </IonRow>
                  </IonCol>
                </IonRow>
              ) : (
                <IonRow className='messageRow' key={index}>
                  <IonCol>
                    <IonRow style={{ flexDirection: 'row-reverse' }}>
                      <div className='messageCol'>Tú</div>
                    </IonRow>
                    <IonRow style={{ flexDirection: 'row-reverse' }}>
                      <div
                        className='messageCol'
                        style={{
                          backgroundColor: '#c5c5c5',
                          color: 'black',
                        }}
                      >
                        <p>{message.text}</p>
                        <p className='message__timestamp'>{formattedDateTime}</p>
                      </div>
                    </IonRow>
                  </IonCol>
                </IonRow>
              );
            })}
          </div>
        </IonGrid>
        <div ref={lastMessageRef} />
      </IonContent>
    </IonCard>
  );
};

export default ExploreContainer;
