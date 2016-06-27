//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import RendererIpc from '../../renderer-ipc.shim';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const ipc = new RendererIpc('notification');

const container = document.querySelector('#container');

ipc.onMessage('text-updated', (text) => {
  container.innerHTML = text;
});

document.addEventListener('mouseover', () => {
  ipc.sendMessage('hover');
}, true);
