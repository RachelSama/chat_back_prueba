import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import classes from './HeaderChat.module.css';

interface ContainerProps {
    name: string;
}

const HeaderChat: React.FC<ContainerProps> = ({ name }) => {
    return (
        <IonGrid className={classes.backgroundHeader}>
            <IonRow>
                <IonCol>
                    <h2>{name}</h2>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default HeaderChat;
