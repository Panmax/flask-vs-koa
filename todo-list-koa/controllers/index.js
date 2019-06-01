const hello = require('./hello.js');
const task = require('./task.js');

module.exports.init = async function (router) {
    hello.init(router);
    task.init(router);
}