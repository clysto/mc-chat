import * as AV from 'leancloud-storage';
import { log } from 'pili-rtc-web';
import 'tailwindcss/tailwind.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './global.css';
import App from './App.svelte';

log.setLevel('disable');

AV.init({
  appId: 'XFtuwd9ISOqurS5PPUJ1OkjE-gzGzoHsz',
  appKey: 'TEw6XRFfGxx5MdKMCspBDFNg',
  serverURL: 'https://mc-chat-api.maoyachen.com',
});

const app = new App({
  target: document.getElementById('root'),
});

export default app;
