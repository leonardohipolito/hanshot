//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';
import Jimp from 'jimp';

import * as clipboard from '../../src/clipboard';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('clipboard: write and read text', (assert) => {
  clipboard.writeText('foo');
  assert.equal(clipboard.readText(), 'foo');
  assert.end();
});

test('clipboard: write and read png image', (assert) => {
  assert.plan(1);

  const base64SamplePng = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABs0lEQVR42mL8//8/AyUAIICYGCgEAAFEsQEAAcSCTXB1aKjivz9/iv78/Gn86/Pnvz8/fTr74+PH7oIHD56iqwUIIEb0MFgREBACpObr//rFI/LtG8PfT58YHn/4wLDvw4ePQIMi6v782YGsHiCAUAxY5OKiwsTMfNXl7182iR8/GBg+f2Zg+PiRgeHdO4YbQPZCBoYvfxgYNLr//4e7BCCAUMLg15cvRfrv37NJvH3LwPDqFQPDixcMDM+eMXwDauYDyusxMPB8Y2DIQdYDEEAoYfD93Ttd4V+/gIzvQLu+MPwCeuE9UPwDEH+GqvnKwKCLrAcggFAM+Pb69a9fQM3AwGMAOhysGYQ/QTQyvAJZAnQosh6AAEI14MOH41cYGJyYoLa+A2KQQV8gGhkeAPFPBobjyHoAAgglEMsYGUWBCq6aMDCISiLZDvQ3w10gvsnA8JQZGIhb/v//AtMDEEAY0ZjByGgAtG0F0AB1diSnP2dguAx0WejO//9vIqsHCCBGbHkhhpGRExiJ4UDXWP5mYPj7D+Lslbv+//+FrhYggBgpzUwAAURxXgAIIIoNAAgwACEutU9ruYwlAAAAAElFTkSuQmCC';
  const bufferToWrite = new Buffer(base64SamplePng, 'base64');

  clipboard.writeImageBuffer(bufferToWrite);
  const bufferToRead = clipboard.readImageBuffer();

  // Compare images pixels
  // https://github.com/oliver-moran/jimp#comparing-images
  Jimp.read(bufferToWrite, (writeErr, imageToWrite) => {
    if (writeErr) throw writeErr;

    Jimp.read(bufferToRead, (readErr, imageToRead) => {
      if (readErr) throw readErr;

      const diff = Jimp.diff(imageToWrite, imageToRead);

      assert.equal(diff.percent, 0);
    });
  });
});

test('clipboard: write and read jpg image', (assert) => {
  assert.plan(1);

  const base64SampleJpg = '/9j/4AAQSkZJRgABAQIAHAAcAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAYI/8QAHxAAAgMBAQEAAwEAAAAAAAAAAgMBBAUGCAcREyIy/8QAFQEBAQAAAAAAAAAAAAAAAAAABQf/xAAfEQABAgYDAAAAAAAAAAAAAAABAiEAAwQGETEFI0H/2gAMAwEAAhEDEQA/ANieovVdz4hu53Hc5lUHa1iiOrZs6YkVddYjYsAAFmJEyTUczMzEDAx/qS/ie8h+0db7/wB1v/M+v5ujV18+gW1Qv5QmFV1MGKSxbFtYZg0WOCYmJkSEi/MBIR+wHtvxb23ofo8T6B8w7HLzt2nRHFv0NtjF0nUxY1q2rYlTDBwscYyMjImJDMSEhMMJ4a8Odj5w6zf+l/Tuxy9LodGgWJRo4hsZSTSNiXMaxjlLYTiYkIgYGBARKZk5ZELIArzX5J6ooiplpJtQISknkDsuz+DRGI//2Q==';
  const bufferToWrite = new Buffer(base64SampleJpg, 'base64');

  clipboard.writeImageBuffer(bufferToWrite);
  const bufferToRead = clipboard.readImageBuffer();

  // Compare images pixels
  // https://github.com/oliver-moran/jimp#comparing-images
  Jimp.read(bufferToWrite, (writeErr, imageToWrite) => {
    if (writeErr) throw writeErr;

    Jimp.read(bufferToRead, (readErr, imageToRead) => {
      if (readErr) throw readErr;

      const diff = Jimp.diff(imageToWrite, imageToRead);

      assert.equal(diff.percent, 0);
    });
  });
});
