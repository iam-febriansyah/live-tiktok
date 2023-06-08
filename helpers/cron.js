const cron = require("node-cron");
const fsExtra = require("fs-extra");

const db = require("../db/config");
const helpGen = require("../helpers/general");
const workers = require("../workers/_index");
const { isSessionFileExists2, createSession, isSessionExists, shouldReconnect, updateDisconected } = require("../whatsapp/whatsapp.js");
const chatCtrl = require("../app/whatsapp/chatController");
const dashboardCtrl = require("../app/dashboard/controller");

var cronStatus = {};
async function cronFunction(time, timeTxt, io) {
  var variableName = timeTxt;
  cronStatus[variableName] = true;

  var task = cron.schedule(time, async () => {
    var dateNow = helpGen.dateTimeNow();

    if (cronStatus[timeTxt]) {
      cronStatus[variableName] = false;
      console.log(`RUNNING CRON ${timeTxt}.....`, helpGen.dateTimeNow());
      //   console.log(io);
      /*start set your function*/
      if (timeTxt == "30second") {
        workers.worker_sendmessage();
        workers.worker_copysession();
      }
      if (timeTxt == "1hour") {
      }
      cronStatus[variableName] = true;
    }

    /**for 1 time in everyday/everymonth */
    if (timeTxt == "11am") {
    }

    cronStorage[`${timeTxt}${dateNow}`] = task;
  });
}

async function copySession() {
  try {
    const srcDir = `./sessions/`;
    const destDir = `./session_temps/`;
    fsExtra.copy(srcDir, destDir, { overwrite: true }).catch((err) => console.error("error copy file", err));
  } catch (err) {
    console.error(err);
  }
}

async function cronSendMessage() {
  checkFile();
  var second = getWaiting();
  var wait = second * 1000;
  setTimeout(function () {
    sendMessage();
  }, wait);
}

var userIds = [];
async function sendMessage() {
  await db.device.findAll({ where: { status: "true" } }).then(async (res) => {
    for (let index = 0; index < res.length; index++) {
      const element = res[index];
      var sessionId = element.device_id;
      var userId = element.user_id;
      chatCtrl.sendMessageQueue(sessionId);
      var cek = userIds.includes(userId);
      if (!cek) {
        userIds.push(userId);
      }
    }
    userIds = [];
  });
}

async function checkFile(io) {
  await db.device.findAll().then(async (res) => {
    for (let index = 0; index < res.length; index++) {
      const element = res[index];
      var sessionId = element.device_id;
      var status = element.status;
      var sesFile = isSessionExists(sessionId);
      if (status != "false" && !sesFile) {
        createSession(sessionId, false, null);
      }
    }
  });
}

function getWaiting() {
  return Math.floor(Math.random() * 5) + 1;
}

module.exports = {
  cronFunction,
  copySession,
  cronSendMessage,
};
