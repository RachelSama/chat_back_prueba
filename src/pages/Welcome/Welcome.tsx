import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Welcome.css';

/**
 * Este es un componente funcional de React que muestra un mensaje de bienvenida para una aplicación de
 * chat.
 * @returns Se devuelve el componente `ChatWelcome`, que es un componente funcional que representa un
 * componente `IonPage` del marco Ionic. El componente `IonPage` contiene un componente `IonHeader` con
 * un título y un botón de menú, y un componente `IonContent` con un mensaje de bienvenida para el
 * chat. El componente se exporta como la exportación predeterminada del módulo.
 */
const ChatWelcome: React.FC = () => {
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
            <IonContent className="ion-padding">
                <div className="chat__welcome">
                    <h1 className="chat__title">¡Bienvenido al chat!</h1>
                    <p className="chat__subtitle">Por favor, selecciona una sala para unirte</p>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ChatWelcome;