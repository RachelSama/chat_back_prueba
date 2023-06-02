import { Socket } from 'socket.io-client';
import './ExploreContainer.css';
import { useEffect, useRef, useState } from 'react';
import { IonCard, IonContent, IonGrid, IonRow } from '@ionic/react';

interface ContainerProps {
  roomName: string;
  socket: Socket;
}

const ExploreContainer: React.FC<ContainerProps> = ({ roomName, socket }) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('getRoomData', roomName);
    socket.on("roomData", data => setMessages(data));
  }, [roomName, messages, socket]);

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
              const parsedMessage = JSON.parse(message);
              const formattedDateTime = formatDateTime(parsedMessage.timestamp);

              return parsedMessage.user !== 'Unobike' ? (
                <IonRow className='messageRow' key={index} style={{ flexDirection: 'row' }}>
                  <p className='messageCol'>{parsedMessage.user}</p>
                  <div
                    className='messageCol'
                    style={{
                      backgroundColor: '#ac3939',
                      color: 'white',
                    }}
                  >
                    <p>{parsedMessage.text}</p>
                    <p className='message__timestamp'>{formattedDateTime}</p>
                  </div>
                </IonRow>
              ) : (
                <IonRow className='messageRow' key={index} style={{ flexDirection: 'row-reverse' }}>
                  <p className='messageCol'>Tu</p>
                  <div
                    className='messageCol'
                    style={{
                      backgroundColor: '#c5c5c5',
                      color: 'black',
                    }}
                  >
                    <p>{parsedMessage.text}</p>
                    <p className='message__timestamp'>{formattedDateTime}</p>
                  </div>
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
