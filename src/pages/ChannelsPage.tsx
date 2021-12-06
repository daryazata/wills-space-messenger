import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./ChannelMessagesPage.css";

const ChannelsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Channels</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Channels</IonTitle>
          </IonToolbar>
        </IonHeader>
        🚫 <strong>OH NO! Fix me!</strong>
      </IonContent>
    </IonPage>
  );
};

export default ChannelsPage;
