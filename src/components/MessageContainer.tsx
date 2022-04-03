import { IonImg, IonItem, IonLabel, IonText } from '@ionic/react';
import { DocumentData } from 'firebase/firestore';
import moment from 'moment';

import { Message } from '../types';
import './style.css';

type MessageContainerProps = {
  message: Message | DocumentData;
};

const MessageContainer: React.FC<MessageContainerProps> = (props) => {
  const { senderName, text, senderAvatar, sentAt } = props.message;

  const formattedDate = moment
    .unix(sentAt.seconds)
    .utc()
    .format('DD/MM/YYYY hh:mm:ss');

  return (
    <div
      className='message-container'
      // div with minHeight needed for Virtuoso
      style={{ minHeight: '5rem', margin: '1rem' }}
      data-cy='message'
    >
      <IonItem>
        <IonLabel className='message-div-name-img'>
          <IonLabel>{senderName}</IonLabel>
          <div style={{ marginRight: '1rem', marginTop: '0.5rem' }}>
            <IonImg className='massage-img-avatar' src={senderAvatar}></IonImg>
          </div>
        </IonLabel>
        <IonText className='message-text'>{text}</IonText>
        <IonText className='message-date'>{formattedDate}</IonText>
      </IonItem>
    </div>
  );
};

export default MessageContainer;
