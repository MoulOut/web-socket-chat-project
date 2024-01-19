import { chatsCollection } from './dbConnect.js';

function obtainChats() {
  const chats = chatsCollection.find().toArray();
  return chats;
}

function findChat(chatName) {
  const chat = chatsCollection.findOne({ name: chatName });

  return chat;
}

function updateChat(chatName, text) {
  const update = chatsCollection.updateOne(
    { name: chatName },
    {
      $set: {
        text,
      },
    }
  );

  return update;
}

export { findChat, updateChat, obtainChats };
