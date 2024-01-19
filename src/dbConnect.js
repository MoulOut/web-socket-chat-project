import { MongoClient } from 'mongodb';
import 'dotenv/config'

const client = new MongoClient(process.env.DB_URL);

let chatsCollection;

try {
  await client.connect();

  const db = client.db('chat-websockets');
  chatsCollection = db.collection('chats');
  console.log('Connected with database sucessfully!');
} catch (error) {
  console.log(error);
  await client.close()
}

export { chatsCollection };
