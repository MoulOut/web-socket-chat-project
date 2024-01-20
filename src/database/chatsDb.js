import { chatsCollection } from './dbConnect.js';

function obtainChats() {
  const chats = chatsCollection.find().toArray();
  return chats;
}

function addChat(chatName) {
  const chatToAdd = chatsCollection.insertOne({
    name: chatName,
    text: '',
  });
  return chatToAdd;
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

function deleteChat(chatName) {
  const deletedChat = chatsCollection.deleteOne({ name: chatName });
  
  return deletedChat;
}

export { findChat, updateChat, obtainChats, addChat, deleteChat };
