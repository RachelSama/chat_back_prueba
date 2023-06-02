import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import './HeaderChat.css';
// import { useHistory } from "react-router-dom";

interface ContainerProps {
    roomName: string;
}

const HeaderChat: React.FC<ContainerProps> = ({ roomName }) => {
    // const history = useHistory();

    // const handleLeaveChat = () => {
    //     history.push("/");
    //     window.location.reload();
    // };

    return (
        <IonGrid className='backgroundHeader'>
            <IonRow>
                <IonCol>
                    <h2>{roomName}</h2>
                </IonCol>
                 {/* <IonCol size='2'>
                    <button className='leaveChat__btn' onClick={handleLeaveChat}>SALIR DEL CHAT</button>
                </IonCol> */}
            </IonRow>
        </IonGrid>
    );
}

export default HeaderChat;
