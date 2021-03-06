import { https } from 'firebase-functions';
import next from 'next';

const server = next({});
const handler = server.getRequestHandler();

export const api = https.onRequest((req, res) => {
  return server.prepare().then(() => handler(req, res));
});
