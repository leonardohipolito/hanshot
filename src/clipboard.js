//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function writeText(text) {
  electron.clipboard.writeText(text);
}

export function readText() {
  return electron.clipboard.readText();
}

export function writeImage(buffer) {
  const image = electron.nativeImage.createFromBuffer(buffer);
  electron.clipboard.writeImage(image);
}

export function readImage() {
  const nativeImage = electron.clipboard.readImage();
  // TODO: pick a default
  return nativeImage.toPng();
}
