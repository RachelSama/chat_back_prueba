import React, { useState } from 'react';
import { IonButton, IonCol, IonGrid, IonInput, IonRow } from '@ionic/react';
import './ChatSubmit.css'
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';
import { Socket } from 'socket.io-client';

interface ChatSubmitProps {
    roomName: String;
    socket: Socket;
}

const ChatSubmit: React.FC<ChatSubmitProps> = ({ roomName, socket }) => {
    const [message, setMessage] = useState("")

    const handleChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
        setMessage(event.detail.value ?? "");
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("enviando un mensaje ...")
        event.preventDefault();
        if (message.trim()) {
            console.log("hay mensaje ...")
            socket.emit("message",
                {
                    text: message,
                    name: "Unobike",
                    id: `${socket.id}${Math.random()}`,
                    socketID: socket.id,
                    room: roomName,
                }
            )
        }
        setMessage('');
    };

    return (
        <form onSubmit={onSubmit} className='formSubmit'>
            <IonGrid>
                <IonRow>
                    <IonCol sizeSm='10' sizeMd='11'>
                        <IonInput
                            value={message}
                            onIonChange={handleChange}
                            style={{ flex: 1, fontSize: 18,  backgroundColor: 'white', color: 'black'}}
                            placeholder="Escribe un mensaje aquí"
                        />
                    </IonCol>
                    <IonCol sizeSm='2' sizeMd='1'>
                        <IonButton expand="full" color="danger" className='buttonSubmit' type="submit">
                            Enviar
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
    );
};

export default ChatSubmit;
