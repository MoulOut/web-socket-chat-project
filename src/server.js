import express from 'express';
import 'dotenv/config';
import url from 'url';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

const actualPath = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(actualPath, '../..', 'public');
app.use(express.static(publicDirectory));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
