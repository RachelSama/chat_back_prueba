import React, { useState } from 'react';
import { IonButton, IonCol, IonGrid, IonInput, IonRow } from '@ionic/react';
import './ChatSubmit.css'
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';
import { Socket } from 'socket.io-client';

/**
 * Este es un componente funcional de React que muestra un formulario con un campo de entrada y un
 * botón de envío, que envía un mensaje a través de una conexión de socket cuando se hace clic.
 * @param  - El componente `ChatSubmit` incluye dos accesorios:
 * @returns Un componente funcional de React llamado ChatSubmit, que muestra un formulario con un campo
 * de entrada y un botón de envío. El componente toma dos accesorios: roomName (una cadena) y socket
 * (un objeto Socket). El campo de entrada actualiza el estado de la variable del mensaje mediante la
 * función handleChange y la función onSubmit envía un mensaje a través de la conexión de socket si el
 * mensaje no está vacío. El formulario está diseñado con componentes iónicos.
 */
interface ChatSubmitProps {
    roomName: String;
    socket: Socket;
}

const ChatSubmit: React.FC<ChatSubmitProps> = ({ roomName, socket }) => {
    const [message, setMessage] = useState("")

    /**
     * Esta función actualiza el estado de una variable de mensaje en función del valor de un evento de
     * entrada.
     * @param event - El parámetro de evento es del tipo IonInputCustomEvent, que es un tipo de evento
     * personalizado definido por el marco Ionic. Representa un evento que se activa cuando cambia el
     * valor de un elemento de entrada.
     */
    const handleChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
        setMessage(event.detail.value ?? "");
    };

    /**
     * Esta función envía un mensaje a través de una conexión de socket si hay un mensaje que no está
     * vacío y restablece el campo de entrada del mensaje.
     * @param event - El parámetro de evento es un evento sintético de React que representa un evento
     * que ocurrió en un nodo DOM, como el envío de un formulario. Contiene información sobre el
     * evento, como el elemento de destino, el tipo de evento y cualquier dato asociado con el evento.
     * En este caso, se utiliza para prevenir
     */
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
                            style={{ flex: 1, fontSize: 18, backgroundColor: 'white', color: 'black' }}
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
