//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import RendererIpc from '../../renderer-ipc.shim';

import './notification.css';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const ipc = new RendererIpc('notification');

const container = document.querySelector('#notification');

ipc.onMessage('text-updated', (text) => {
  container.innerHTML = text;
});

document.addEventListener('mouseover', () => {
  ipc.sendMessage('hover');
}, true);
