import { https } from 'firebase-functions';
import { default as next } from 'next';

const nextjsServer = next({
  dev: false,
});
const nextjsHandle = nextjsServer.getRequestHandler();

export const api = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
