(function () {
    var fs = require('fs-extra');
    var path = require('path');
    var spawn = require(Editor.url('./spawn.js'));

    var task = {};

    task.config = {};

    task.init = function () {
        try {
            Editor.info('开始：加载toutiao-game配置信息');
            if (!cfg) {
                cfg = { autoCopy: false, appid: '' };
            }
            Editore.info(cfg);
            var url = Editor.url('packages://toutiao-game/config/config.json');
            var cfg = fs.readJsonSync(url, { encoding: 'utf8' });
            this.config = cfg;
            Editor.success('完成：加载toutiao-game配置信息');
        } catch (error) {
            Editor.error('错误: 加载toutiao-game配置信息: ' + error.name + ' - ' + error.message);
            console.error('错误: 加载toutiao-game配置信息: ' + error.name + ' - ' + error.message);
        }
    }

    task.save = function (cfg) {
        try {
            Editor.info('开始：保存toutiao-game配置信息');
            if (cfg) {
                this.config = cfg;
            }
            Editor.info(JSON.stringify(this.config));
            var url = Editor.url('packages://toutiao-game/config/config.json');
            fs.writeJsonSync(url, this.config, { encoding: 'utf8' });
            Editor.success('完成：保存toutiao-game配置信息');
        } catch (error) {
            Editor.error('错误: 保存toutiao-game配置信息: ' + error.name + ' - ' + error.message);
            console.error('错误: 保存toutiao-game配置信息: ' + error.name + ' - ' + error.message);
        }
    }

    task.setConfig = function (key, value) {
        if (!value && key instanceof Object) {
            this.config = key;
            return;
        }
        this.config[key] = value;
    }

    task.getConfig = function (key) {
        if (key) {
            return this.config[key];
        } else {
            return this.config;
        }
    }

    task.copy = function () {
        Editor.log('开始拷贝wechatgame到ttgame');
        try {
            var src = path.join(Editor.Project.path, 'build/wechatgame');
            var dest = path.join(Editor.Project.path, 'build/ttgame');
            fs.emptyDirSync(dest);
            fs.copySync(src, dest);
            var jsonPath = path.join(dest, 'project.config.json');
            var json = fs.readJSONSync(jsonPath, { encoding: 'utf8' });
            json.appid = 'tt16f0604d89daa450';
            fs.writeJSONSync(jsonPath, json, { encoding: 'utf8' });
            Editor.success('完成拷贝wechatgame到ttgame');
        } catch (error) {
            Editor.error('错误拷贝wechatgame到ttgame: ' + error.name + ' - ' + error.message);
        }
    }

    task.install = function () {
        Editor.info('开始: 安装第三方依赖包');
        try {
            var cwd = Editor.Package.packagePath('toutiao-game');
            var params = ['install'];
            spawn(cwd, params, function () {
                Editor.success('完成: 安装第三方依赖包');
            });
        } catch (error) {
            Editor.error('错误: 安装第三方依赖包: ' + error.name + ' - ' + error.message);
        }
    }

    task.modify = function () {
        Editor.info('开始: 修改头条appid');
        try {
            Editor.info('完成: 修改头条appid');
        } catch (error) {
            Editor.error('错误: 修改头条appid: ' + error.name + ' - ' + error.message);
        }
    }

    // var task = new Task();
    module.exports = task;
})();