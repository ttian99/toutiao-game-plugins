var fs = require('fs-extra');
let task = require(Editor.url('packages://toutiao-game/lib/task.js'));

// panel/index.js, this filename needs to match the one registered in package.json
Editor.Panel.extend({
  data: {}, // 数据

  dependencies: [
    // 'packages://toutiao-game/lib/task.js',
  ],

  // css style for panel
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  // html template for panel
  template: `
    <h2>头条小游戏插件</h2>
    <section>
      <ui-prop name="自动拷贝" tooltip="自动拷贝构建完成的wechatgame到ttgame">
        <ui-checkbox id="autoCopy"></ui-checkbox>
      </ui-prop>
      <ui-prop name="AppID" tooltip="头条小程序的AppID，真机调试需要填写正确">
        <ui-input id="appid" placeholder="输入头条小程序appid"></ui-input>
      </ui-prop>
    </section>
    <div style="margin-top: 20px; margin-bottom: 20px; text-align: center">
      <ui-button id="btn" class="green">保存</ui-button>
    </div>
  `,

  // element and variable binding
  $: {
    btn: '#btn',
    autoCopy: '#autoCopy',
    appid: "#appid",
  },

  run(data) {
    console.log('--- panel data ====');
    console.log(data);
    this.data = data;
    this.$appid.value = data.appid;
    this.$autoCopy.checked = data.autoCopy;
  },

  getData() {
    return this.data;
  },
  // method executed when template and styles are successfully loaded and initialized
  ready() {
    console.error('==============');
    window.pn = this;
    window.task = task;
    // var appid = task.getConfig('appid');
    // this.$appid.$input.value = appid;
    // this.$autoCopy.$checkbox.checked = true;
    this.$btn.addEventListener('confirm', () => {
      // Editor.log(JSON.stringify(this.data));
      // Editor.Ipc.sendToPackage('toutiao-game', 'save', this.data);
      var data = this.getData();
      data.appid = this.$appid.$input.value;
      data.autoCopy = this.$autoCopy.checked;
      Editor.Ipc.sendToMain('toutiao-game:save', data);
      // task.setConfig('appid', appid);
      // task.save();
    });
  },

  // register your ipc messages here
  messages: {
    'hello'() {
      Editor.info('panel hello');;
    },
    
    'toutiao-game:hello'() {
      Editor.info('panel toutiao-game hello');
    },
    'toutiao-game:init'() {

    },
    'editor:build-finished'() {
      Editor.info('哈哈哈 panel also recieve the event');
    }
  }
});