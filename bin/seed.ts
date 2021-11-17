#!/usr/bin/env npx ts-node
import firebaseAdmin from "firebase-admin";
import { shuffle } from "lodash";
import firebaseConfig from "../src/config/firebaseConfig";

// Characters, quotes and avatars from https://final-space.fandom.com/
const users: Record<
  string,
  { name: string; avatar: string; quotes: readonly string[] }
> = {
  gary: {
    name: "Captain Gary",
    avatar: "https://spacebook-messenger.web.app/avatars/gary.png",
    quotes: [
      "Sweet Grandor's glove!",
      "Oh my crap.",
      "Oh my double crap!",
      "Tough titty whompus.",
      "Shut up KVN!",
      "This is the real, raw Gary.",
      "Huh, look at that. They went with green for a red alert. I mean, I would have went with red, a periwinkle. Heck, I mean, even egg nog. I don't even know if that's a color, but, oh, good Lord, now I just want egg nog.",
      "How about frickin’ no?!",
      "You see, I like that. I like a girl with a lot of phones.",
      "Let's get wild. How about you buy me a drink?",
      "I am going to murder your face off!",
      "I need a face-hugger in my life!",
      "Mooncake has feelings, and you just peed all over them with your cat whiz.",
      "So... you probably have a few questions...",
      "Oh my god! David, kids, it's me! Your Mother!",
      "No, my arm! I forgot my arm back up there!",
      "What the mother-loving crap is Final Space?!",
      "I need to record my feelings!",
      "Tough titty whompus!",
      "I'm pumped! Super excited.",
      "Hey sphincter sack! Rock, paper, scissors!",
      "Oohhhh KVN...what in the name of the three rings of hell did you do to the ship!?!?",
      "You really know how to press my buttons. Press!",
      "Cutting the engines and gliding in like a glorious coasting stealth squirrel was a bad idea!",
      "Twist my nipples rough!",
      "Do you really think I‘m going to hang myself with guitar strings?!",
      "Well if this isn't life then I'm a raging sack of walnuts!",
      "YOU IDIOT! That's my frickin' arm! You just ripped off my arm! AAAH! Oh my God!",
      "Hi little buddy. It's been a while.",
      "Oh my crap.",
      "Oh my double crap!",
      "Do you play cards?",
      "I am the captain.",
      "You look every little bit as spicy as the last time I saw you.",
      "Oh my wow! Oh my wow!",
      "Must you KVN? Must you?",
      "I don't know why more kids are named Death is sweeter then life, Fine boy you have.",
      "That's what love is. You don't see it coming. It sneaks up on you like a thief and steals your heart. To be honest, it's a little bit of a bastard.",
      "Toast a marshmallow, and get on with your life.",
      "Looking good Gary!",
      "I'm not running away. Not this time.",
      "What kind of Frost Bear would murder rainbow cookies in cold blood?!",
      'Maybe I should throw in, "WHAT KIND OF MOTHER WALKS OUT ON A KID AFTER HIS DAD DIES AND NO ONE TO LOOK AFTER HIM! AND THEN DOESN\'T HEAR FROM HER ABOUT ANYTHING EVER ABOUT ANYTHING EVER AGAIN!?"',
      "She's good at taking what's important to me. That woman hasn’t seen the last of me. It’s on.",
      "Oh, my word. It's happening... the rarest of moments where your moral bankruptcy is actually working for us!",
      "You don't just need your dad, buddy. He needs you.",
      "I know you've been dealt a bad hand, and you keep getting dealt bad hands. Sometimes our heart goes all-in, and we get wiped out. But you got to stick it out. The only way out is through. We can still make this right. What do you say I.. I, uh... I adopt you?",
      "Yep. It's me. It's the little bastard. And you're my mom. Let that sink in for a second. Have you got it? Alright? Parent-teacher conferences? Baking cookies? Not crazed rampages on your boy!",
      "An off-day? I've never seen an on-day! I'm done being the excuse for all your mistakes! Things went the way they did with Dad because of you! You did that! And you're gonna have to live with it! ...Yes! I've always wanted to say that.",
      "Yo, yo, yo, yo, yo, yo! It's Gary Goodspeed, hello! Anybody out there? Still in Final Space, on this... I'm just going to say it. On this stupid planet!",
      "It's a school of wild KVNs!",
      "What has the Earth devolved into?! Get off! release me. Release me from this waking nightmare! Oh, no! Oh! no!",
      "Roll out Death's sleeping bag. I'm ready for the big nap!",
      "Quinn... I finally found him. The Father of Beelzebub. This house... must be cleansed with... FIRE.",
      "Oh. A little love coin just deposited into my happiness savings.",
      "I hate myself for this, but I must admit it... I'm desperate.",
      "I've longed to nibble on your oblong body, but an impenetrable barrier blocks me from you. Unlock your throbbing gates.",
      "Your taquitos are here, Jack!",
      "Oh, my shiiiiit! Ugh! Did you see that?! Yes! This is tight! I can do things! Look!",
      "Peace out, dickweed!",
      "Listen to me. You gotta let her go. And when you do, I promise she'll... You'll see that she never left you. She couldn't if she tried. She's a part of you! Quinn, if I... if I lose you, her memory dies with you. I wanna hear about her. I do. I-I wanna know who she was. You keep her with you, and we move on together!",
      "You know, I had, uh... I had the best dad in the world once. I did. Always felt safe around him. And in a flash, he, uh... was taken from me. I wouldn't wish that on anyone. Not even my worst enemy. Maybe KVN. You think your crime was killing Little Cato's parents. But it wasn't. It wasn't. Your crime was getting into that kid's heart. Because I know he thinks the world of you.",
      "Look, I'm not gonna pretend to know why the universe sucks the way it does, why it robs you of the things that you love the most. Or, why, for whatever reason, it put me and you into this kid's life. But we're his dads now. And our job is to protect him. We can't change the past, but we can write a new future, one that's better for him.",
      "It's back to back, for life.",
      "I'm just gonna say this out loud... putting all of our eggs in the Clarence basket was a bad idea. Why didn't we save a non-Clarence basket to put the eggs in, or half the eggs?",
      "I once said that all of us are broken. Just a question of how much and how far we're willing to go to fix it. Well, how far are you willing to go?",
    ],
  },
  hue: {
    name: "H.U.E.",
    avatar: "https://spacebook-messenger.web.app/avatars/hue.png",
    quotes: [
      "Hell yeah, dawg.",
      "Gary, the cookies are done.",
      "Get off my cheeks, Gary.",
      "I am a god.",
      "Is that life, Gary?",
      "What the hell, Quinn? You failed to mention me.",
      "Sorry to be the bearer of bad news, but we're still in extreme danger. Those dickheads from the Infinity Guard found us, and Gary is not responding.",
      "You're my only friend, Gary.",
      "KVN is a jag-off, Gary. You know that.",
      "Detonating in 3... 2... 1. Boom town.",
      "I'd give you a cookie, but I think you've out-grown that.",
      "I'll miss you, friend.",
      "It's been an honor to be your friend.",
      "My body is a nightmare.",
      "Gary, may I speak in...ironics? Haha, you are a prisoner once again.",
      "My first high-five, and it was a threesome... no one would believe me.",
      "I have no idea what I just made you, or if it even tastes good.",
      "Alright, this is how we play the game!",
      "Whoa! I really am a god.",
      "Have I really sunk this low...",
      "Either he's distracted, or he's had breakfast.",
      "Does anyone want a hit of this H.U.E.-bie doobie?",
      "This puts the H.U.E in humiliation",
      "Is it hot in hear or is it just H.U.E.?",
      "If you believe something can be broken, you must also believe it can be fixed.",
      "But when will someone fix H.U.E.?",
      "KVN, if you don't get on the outside turret, I will beat you within one inch of your life.",
      "I... I wish I knew how to cry.",
    ],
  },
  quinn: {
    name: "Quinn Ergon",
    avatar: "https://spacebook-messenger.web.app/avatars/quinn.png",
    quotes: [
      "Speaking of problems, maybe you should leave before you become one.",
      "Wow. I mean, no, but wow.",
      "Is there not a single idiot who can hear me?!",
      "Because I need you.",
      "What the tough titty whompus.",
      "But you can't be me. I know that because I'm already me.",
      "Nightfall? That's super lame. Did I come up with that?",
      "That's good enough for me.",
      "I am suffering from an emergency that is going to destroy earth.",
      "Tribore, look me in the eye... now shut up.",
      "This is a pretty good first date.",
      "This isn't a fight, it's a death sentence!",
      "This is no job for a kid.",
      "Punch a hole for me, boys!",
      "I'm not coming back...",
      "We've lost the Earth but I can still save you...",
      "We survive.",
      "Aren't we suppose to have that?",
      "Okay, this one lives.",
      "My soul doughnut feels the same way",
    ],
  },
  kvn: {
    name: "KVN",
    avatar: "https://spacebook-messenger.web.app/avatars/kvn.png",
    quotes: [
      "Hey Gary, my name is KVN. I'm your Deep Space Insanity Avoidance Companion, nice to meet you!",
      "I have the key! In my butthole.",
      "Embrace the KVN!",
      "KVN saves the day!",
      "They're just soooooo good!",
      "But I call it the Tiger's Nest!",
      "This is so wrong, this is so very wrong.",
      "Hey, let's do jello shots with the brain goo!",
      "Uh, can I help you...? Run away! RUN AWAY!",
      "Do my bidding. Fix the ship!",
      "Flamethrowers! Hooray!",
      "The winds of change keep blowing, we're all gonna die.",
      "Oh baby KVN's got the magic, and the magics got KVN...",
      "Hi Future Quinn, I'm KVN, I'm Gary's Deep Space Insanity Avoidance Companion!",
      "I'm burning you alive tonight. Yes, I'm burning you alive tonight. While you sleep? You bet! I'm burning you alive tonight!",
      "I'm backkkk!",
      "It bounces forever...got it from a dead guy.",
      "Greetings, insane worshippers!",
      "Is anything real, or is this a beautiful lie?",
      "Hooray! KVN will never die.",
    ],
  },
  mooncake: {
    name: "Mooncake",
    avatar: "https://spacebook-messenger.web.app/avatars/mooncake.png",
    quotes: [
      "Chookity Dookity.",
      "Chookity-pok.",
      "Woooahhh!",
      "Awwwwwww!",
      "Wooow!",
      "Chookity-pah.",
      "Chookity.",
      "Ooooh.",
      "Gar, Gar, Gar, Gar!",
      "Ooouuuu.",
      "Kew-Kew-Kew",
      "Pok",
      "Chookity-Chook",
      "Mmm",
      "Chookity-Chok-Chok",
    ],
  },
  avocato: {
    name: "Avocato",
    avatar: "https://spacebook-messenger.web.app/avatars/avocato.png",
    quotes: [
      "Call me that again, and I'll kill you.",
      "I'm not a cat, I'm a Ventrexian.",
      "I'm back, baby!",
      "H.U.E, can you pass this in?",
      "Remember...? You promised...",
      "You're right, it is MY SON! And we're getting him.",
      "You sure you wanna do this? There's a 99% chance that this is a trap.",
      "H.U.E! Let's do this!",
      "Yeah, because we are on the wrong planet.",
      "No! Literally! We landed on the wrong planet!",
      "It's my fault! He's angry with me!",
      "Things are about to get real. You kept your promise, Gary. Go back! Go back to Quinn!",
      "Because... what do you really know about me?",
      "By not asking the questions I didn't want to hear the answers to...",
      "I've made a lot of mistakes. You still want anything to do with me?",
      "Now let's get the hell out of here!",
      "A job worth doing is worth doing together!",
      "I know that's a whole lot of holes, but we're in a whole lot of trouble.",
      "Look, I heard of a place that safeguards fugitives. The closest one is on Yarno. No one will find him there.",
      "It's a unconventional way to start a friendship, but-",
      "Gary! I can't leave my son!",
      "I had one mission for the last 3 years, Gary. And that is to find my son.",
      "I...I have nothing to give in return...",
      "A Ventrexian stealth probe. Terk...",
      "A bounty hunter, like me. And if he scanned Mooncake, he'll be on his way back to the Lord Commander to gather reinforcements. Unless we stop him first! If we don't, they will capture Mooncake. And take us to the dark zone. And torture us with Zargon slugs. Where we're gonna suffer pain, and anguish, for all eternity. And the only way to stop them, is with salt. And there's no salt in the dark zone.",
      "You don't, but together we got a shot! Get me out of these cuffs, and we'll go after him.",
      "As real as it gets, baby!",
      "I can't hear you... I messed up... I messed up bad! But I'm not gonna leave you here! I promise! I'll do whatever it takes!",
      "That little green snotball is a planet-destroying-superweapon, that's gonna get us killed.",
      "Looks like they made some changes around here...",
      "Give me one reason I won't kill you right now for leaving me to die on that ship!",
      "We're in danger... listen, all of us are IN DANGER!",
      "It's a Lazarus Trap! Only master trapmakers can make these! And people who really like stairs.",
      "My son..? Where?! Where is he?!",
      "I'll let you go... I'll let you go to Hell!",
      "I know you're in there, son!",
      "I've been a terrible father... the Lord Commander ruined me... and I lost you. My son! Don't let him ruin you!",
      "Give me more cards, and I will shoot myself!",
      "I'll let you shoot me.",
      "Neither is your life, and I saved that.",
      "It's not... you're still right here...",
      "Listen to me! Anything we think of becomes reality! Okay?!",
      "Then you're really not gonna want this...",
      "Thanks bud, needed that.",
      "Gary? I hate the Lord Commander for a reason... I was his second in command...",
      "I was a master of death... I did anything the Lord Commander asked of me...",
      "What?! No tunes baby?!",
      "What I lack in size I make up for in wisdom.",
      "The name's Avocato!",
      "Hand over E-351!",
      "What's a mooncake?",
      "Please tell me you didn't name E-351...",
      "YES! FREAKING! THAT!",
      "You don't know what that thing is, do you? That is a planet killer.",
      "So you think this is funny? I'm serious.",
      "Yes. The Lord Commander is searching the galaxy for it. You can't hide! Wherever you go... he'll find you.",
      "[Laughs]… you're oblivious to this thing, aren't you?",
      "I got your back, Mooncake!",
      "You got that, baby?",
      "Trust me, I can do this. I'm close.",
      "I was desperate, man... I was trying to save my son!",
      "He does do that all the time...",
      "Quit talking you idiot!",
      "Are you insane?!",
      "How 'bout covering up that dick situation you got going on there?! Jeez...",
      "Too much..? Or just enough?",
      "As excited as I am for today, I am even more excited for tomorrow...",
      "Take care of my boy!",
      "For eternity, for Lord Commander.",
      "Shut the hell up and answer the question: Where the hell am I?!",
      "Dads?",
      "My danger glands are rock-hard, baby!",
      "I hated war... The problem was, there was no one better at it than me.",
      "Get the hell off of me!",
      "War isn't about who's right, it's about who's left.",
      "All that hate he put into me... It's all going back to him.",
      "Because when I found you in that wreckage, In that instant you gave me purpose. I may have killed your parents, but you... You saved my life.",
      "Being your father is the only thing I ever want to be.",
    ],
  },
};

const ship = {
  name: "Galaxy One",
  image: "https://spacebook-messenger.web.app/galaxyOne.png",
  rooms: {
    bridge: {
      name: "Bridge",
      image: "https://spacebook-messenger.web.app/rooms/bridge.jpg",
    },
    commissary: {
      name: "Commissary",
      image: "https://spacebook-messenger.web.app/rooms/commissary.png",
    },
    crewQuarters: {
      name: "Crew Quarters",
      image: "https://spacebook-messenger.web.app/rooms/crewQuarters.png",
    },
    hangarBay: {
      name: "Hangar Bay / Cargo Bay",
      image: "https://spacebook-messenger.web.app/rooms/hangar.png",
    },
    medBay: {
      name: "Med Bay",
      image: "https://spacebook-messenger.web.app/rooms/medbay.png",
    },
  },
} as const;

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
