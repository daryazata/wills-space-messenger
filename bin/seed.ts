#!/usr/bin/env npx ts-node
import firebaseAdmin from "firebase-admin";
import { shuffle } from "lodash";
import firebaseConfig from "../src/config/firebaseConfig";
import { users, ship } from "../src/config/data";

const MAX_MESSAGES_IN_CHANNEL = 100;
const MAX_TIME_BETWEEN_MESSAGES_IN_MS = 15 * 60 * 1000;

function chooseRandomElement<T extends unknown>(elements: readonly T[]): T {
  if (elements.length === 0) throw new Error("Array must not be empty");
  const index = Math.floor(Math.random() * elements.length);
  return elements[index];
}

async function main() {
  const firebaseAdminApp = firebaseAdmin.initializeApp(firebaseConfig);
  const batch = firebaseAdminApp.firestore().batch();

  const allMembers = Array.from(Object.entries(users));

  Array.from(Object.entries(ship.rooms)).forEach(([roomId, room]) => {
    const numberOfMembers =
      2 + Math.round(Math.random() * (allMembers.length - 2));
    const membersOfChannel = shuffle(allMembers).slice(0, numberOfMembers);

    // TODO: batch can only accommodate 500 writes per request
    batch.create(firebaseAdminApp.firestore().doc(`/channels/${roomId}`), {
      name: room.name,
      image: room.image,
      members: membersOfChannel.map(([id, member]) => ({
        id,
        name: member.name,
        avatar: member.avatar,
      })),
    });

    const numberOfMessages = Math.random() * MAX_MESSAGES_IN_CHANNEL;

    let currentTimestamp = Date.now();

    for (let i = 0; i < numberOfMessages; i += 1) {
      const [senderId, sender] = chooseRandomElement(membersOfChannel);
      const messageText = chooseRandomElement(sender.quotes);
      batch.create(
        firebaseAdminApp
          .firestore()
          .collection(`/channels/${roomId}/messages`)
          .doc(),
        {
          text: messageText,
          sentAt:
            firebaseAdmin.firestore.Timestamp.fromMillis(currentTimestamp),
          senderName: sender.name,
          senderAvatar: sender.avatar,
          senderId: senderId,
        }
      );
      currentTimestamp -= Math.random() * MAX_TIME_BETWEEN_MESSAGES_IN_MS;
    }
  });

  await batch.commit();
  console.log("Done");
}

main();
