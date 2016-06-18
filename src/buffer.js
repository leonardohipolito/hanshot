//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function fromDataURL(dataURL) {
  const base64 = dataURL.split('base64,');
  const buffer = Buffer.from(base64[1], 'base64');
  return buffer;
}

// TODO: think about identifying mime type by buffer
// https://github.com/sindresorhus/file-type
export function toDataURL(buffer) {
  const dataURL = `data:image/png;base64,${buffer.toString('base64')}`;
  return dataURL;
}
