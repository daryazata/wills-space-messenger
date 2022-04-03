import {
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import { getChannels } from '../config/firebaseApp';
import './ChannelMessagesPage.css';

type ChannelsType = DocumentData[];

const ChannelsPage: React.FC = () => {
  const [channels, setChannels] = useState<ChannelsType>();

  useIonViewDidEnter(() => {
    getChannels()
      .then((response) => {
        setChannels(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  });

  const displayChannels = (channels: ChannelsType) => {
    return channels.map((channel) => {
      return (
        <IonItem
          data-cy={`channel-${channel.id}`}
          routerLink={`/channels/${channel.id}/messages`}
          key={channel.id}
        >
          <IonLabel>{channel.name}</IonLabel>
          <IonImg className='channels-image' src={channel.image}></IonImg>
        </IonItem>
      );
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Channels</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Channels</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>{channels && displayChannels(channels)}</IonList>
      </IonContent>
    </IonPage>
  );
};

export default ChannelsPage;
