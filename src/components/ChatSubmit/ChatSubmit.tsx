import React, { useState } from 'react';
import { IonButton, IonCol, IonGrid, IonInput, IonRow } from '@ionic/react';
import classes from './ChatSubmit.module.css'
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';


interface ChatSubmitProps {
    handleSubmit: (message: string) => void;
}

const ChatSubmit: React.FC<ChatSubmitProps> = ({ handleSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
        setInputValue(event.detail.value ?? "");
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(inputValue);
        setInputValue('');
    };

    return (
        <form onSubmit={onSubmit} className={classes.formSubmit}>
            <IonGrid>
                <IonRow>
                    <IonCol sizeSm='10' sizeMd='11'>
                        <IonInput
                            value={inputValue}
                            onIonChange={handleChange}
                            style={{ flex: 1, fontSize: 18,  backgroundColor: 'white', color: 'black'}}
                            placeholder="Escribe un mensaje aquí"
                        />
                    </IonCol>
                    <IonCol sizeSm='2' sizeMd='1'>
                        <IonButton expand="full" color="danger" className={classes.buttonSubmit} type="submit">
                            Enviar
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
    );
};

export default ChatSubmit;
