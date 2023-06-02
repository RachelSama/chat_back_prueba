import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Welcome.css';

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