'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var metadata = require('../config/metadata');
import appActions from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

exports.imageContext = function (appDispatch, image) {

  var uploadersSubMenu = metadata.uploadHosts.map(function (host) {
    return {
      label: host.name,
      click: function () {
        appDispatch(appActions.uploadImage(image.getFilePath(), host.id));
      }
    };
  });

  var publicUrlsSubMenu = image.getPublicUrls().map(function (publicUrl) {
    return {
      label: publicUrl,
      click: function () {
        appDispatch(appActions.copyText(publicUrl));
      }
    };
  });

  var template = [
    {
      label: 'Copy',
      click: function () {
        appDispatch(appActions.copyImage(image.getFilePath()));
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Upload',
      submenu: uploadersSubMenu
    }
  ];

  if (publicUrlsSubMenu.length) {
    template.push({
      label: 'Public URLs',
      submenu: publicUrlsSubMenu
    });
  }

  template = template.concat([
    {
      type: 'separator'
    },
    {
      label: 'Show in folder',
      click: function () {
        appDispatch(appActions.showImageInFolder(image.getFilePath()));
      }
    }
  ]);

  return template;
};
