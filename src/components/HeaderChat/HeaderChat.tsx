import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import './HeaderChat.css';

/**
 * Este es un componente de TypeScript React que representa un encabezado para una sala de chat con el
 * nombre de la sala como accesorio.
 * @param  - El código define un componente funcional de React llamado `HeaderChat` que toma un solo
 * accesorio llamado `roomName` de tipo cadena. El componente devuelve un componente `IonGrid` del
 * marco Ionic, que contiene un componente `IonRow` y `IonCol`. El `nombre de la habitación
 * @returns Un componente funcional de React que representa un encabezado para una sala de chat con el
 * nombre de la sala pasado como accesorio. El encabezado tiene un estilo con un color de fondo y
 * contiene una cuadrícula con una sola fila y columna que muestra el nombre de la habitación como un
 * elemento h2.
 */
interface ContainerProps {
    roomName: string;
}

const HeaderChat: React.FC<ContainerProps> = ({ roomName }) => {

    return (
        <IonGrid className='backgroundHeader'>
            <IonRow>
                <IonCol>
                    <h2>{roomName}</h2>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default HeaderChat;
