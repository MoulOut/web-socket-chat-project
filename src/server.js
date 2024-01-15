import express from 'express';
import 'dotenv/config';
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 3000;

const actualPath = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(actualPath, '../..', 'public');
app.use(express.static(publicDirectory));

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('A client has connected');
    socket.on('disconnect',() =>{
        console.log('A client has disconnected');
    })
})