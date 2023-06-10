const { Worker } = require("worker_threads");
const path = require("path");

function worker_insertGift(data) {
  const worker = new Worker(path.join(__dirname, "worker_insertGift.js"), { workerData: { data: data } });
  worker.once("message", (result) => {
    console.log(result);
  });
  worker.on("error", (error) => {
    console.error(error);
  });
  worker.on("exit", (exitCode) => {
    console.info(`It exited with code ${exitCode} worker_insertGift.js`);
  });
}

module.exports = {
  worker_insertGift,
};
