import { chatsCollection } from './dbConnect.js';

function findDocument(documentName) {
  const document = chatsCollection.findOne({ name: documentName });

  return document;
}

function updateChat(documentName, text) {
  const update = chatsCollection.updateOne(
    { name: documentName },
    {
      $set: {
        text,
      },
    }
  );

  return update;
}

export { findDocument, updateChat };
