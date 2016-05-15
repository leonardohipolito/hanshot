//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import createWindow from '../window.shim';
import * as screen from '../screen.shim';

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

export default function createNotification(text = 'undefined', options = {
  delay: 5000,
}) {
  const width = 300;
  const height = 100;
  const offset = 20;

  const activeDisplay = screen.getActiveDisplay();
  const bounds = activeDisplay.workArea;

  const LOCATION_TOP = 'top';
  const LOCATION_BOTTOM = 'bottom';

  let location = LOCATION_TOP;

  const locations = {
    [LOCATION_TOP]: {
      x: bounds.width - width - offset,
      y: bounds.y + offset,
    },
    [LOCATION_BOTTOM]: {
      x: bounds.width - width - offset,
      y: bounds.height - height - offset,
    },
  };

  const window = createWindow('notification', {
    width,
    height,
    x: locations[location].x,
    y: locations[location].y,
    transparent: true,
    frame: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    show: false,
  });

  window.on('load', () => {
    window.sendMessage('text-updated', text);
    window.show({ focus: false });
  });

  window.onMessage('hover', () => {
    location = location === LOCATION_TOP ? LOCATION_BOTTOM : LOCATION_TOP;
    window.setPosition(locations[location].x, locations[location].y);
  });

  window.load(`file://${__dirname}/renderer/notification.html`);

  if (options.delay) {
    setTimeout(() => {
      window.destroy();
    }, options.delay);
  }
}
