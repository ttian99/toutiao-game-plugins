'use strict';
let task = require('./lib/task.js');
// let fs = require('fs-extra');
var Fs = require('fire-fs');

function onBeforeBuildFinish(options, callback) {
  task.copy();
}

module.exports = {
  load() {
    // execute when package loaded
    task.init();
    // Editor.Builder.on('before-change-files', onBeforeBuildFinish);
  },

  unload() {
    // execute when package unloaded
    // Editor.Builder.removeListener('before-change-files', onBeforeBuildFinish);
  },

  // register your ipc messages here
  messages: {
    'open'() {
      // open entry panel registered in package.json
      var cfg = task.getConfig();
      Editor.Panel.open('toutiao-game', cfg);
    },
    'save'(event, arg) {
      task.save(arg);
    },
    'copy'() {
      task.copy();
    },
    'hello'() {
      // task.copy();
      Editor.info('Hello !!!');
    },
    'install'() {
      task.install();
    },
    'editor:build-finished'(event, arg) {
      Editor.Ipc.sendToMain('toutiao-game:copy');
    }
  }
};