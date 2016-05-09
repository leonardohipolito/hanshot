//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

export function writeText(text) {
  electron.clipboard.writeText(text);
}

export function readText() {
  return electron.clipboard.readText();
}

export function writeImageBuffer(buffer) {
  const image = electron.nativeImage.createFromBuffer(buffer);
  electron.clipboard.writeImage(image);
}

export function readImageBuffer() {
  const image = electron.clipboard.readImage();
  return image.toPng();
}
