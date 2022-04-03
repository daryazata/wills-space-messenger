import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidLeave,
} from '@ionic/react';
import { collection, onSnapshot } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';

import MessageContainer from '../components/MessageContainer';
import { db } from '../config/firebaseApp';
import { Message } from '../types';
import './ChannelMessagesPage.css';

type MessagesType = DocumentData[] | Message[];

const ChannelMessagesPage: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const [messages, setMessages] = useState<MessagesType | null>();

  const messagesCol = collection(db, `channels/${channelId}/messages`);

  useIonViewDidLeave(() => {
    setMessages(null);
  });

  useEffect(() => {
    let unsub = onSnapshot(messagesCol, (snapshot) => {
      const results = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      sortChronoMessages(results);
    });
    return () => {
      unsub();
    };
  }, [channelId]);

  const sortChronoMessages = (messages: MessagesType) => {
    const result = messages.sort((a, b) => {
      return b.sentAt.seconds - a.sentAt.seconds;
    });
    setMessages(result);
  };

  const checkMessagesListLength = (messages: MessagesType) => {
    if (messages.length > 50) {
      return (
        <Virtuoso
          totalCount={messages.length}
          style={{ height: '100%' }}
          itemContent={(index) => {
            return (
              <MessageContainer
                key={messages[index].id}
                message={messages[index]}
              />
            );
          }}
        />
      );
    } else {
      return messages.map((message) => {
        return <MessageContainer key={message.id} message={message} />;
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <Link style={{ textDecoration: 'none' }} to={'/channels'}>
          <IonToolbar>
            <IonTitle>{channelId} messages</IonTitle>
          </IonToolbar>
        </Link>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>{channelId} messages</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* messages list */}
        {messages && checkMessagesListLength(messages)}
      </IonContent>
    </IonPage>
  );
};

export default ChannelMessagesPage;
