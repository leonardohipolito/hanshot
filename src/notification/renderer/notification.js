//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as renderer from '../../renderer.shim';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const ipc = renderer.createIpc('notification');

const container = document.querySelector('#container');

ipc.onMessage('text-updated', (event, text) => {
  container.innerHTML = text;
});

document.addEventListener('mouseover', () => {
  ipc.sendMessage('hover');
}, true);
