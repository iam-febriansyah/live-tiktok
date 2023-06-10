const { parentPort, workerData } = require("worker_threads");
const dbMysql = require("../db/mysql");

function runWorker() {
  return new Promise(async (resolve, reject) => {
    if (1) {
      await dbMysql.gift.create(workerData.data);
      console.log("woker_finished", "worker_insertGift");
      resolve({ woker_finished: "worker_insertGift" });
    } else {
      reject("error!");
    }
  });
}
runWorker();
