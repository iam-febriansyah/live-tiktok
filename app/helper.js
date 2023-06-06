const emailValidator = require('deep-email-validator');

const dateTimeNow = (now = "") => {
    let today = now == "" ? new Date() : new Date(now);
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let hh = String(today.getHours()).padStart(2, "0");
    let ii = String(today.getMinutes()).padStart(2, "0");
    let ss = String(today.getSeconds()).padStart(2, "0");
    today = `${yyyy}-${mm}-${dd} ${hh}:${ii}:${ss}`;
    return today;
};

function randonNumAlpha(length) {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}

function randonNum(length) {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}

function randonAlpha(length) {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}


function baseurl(req) {
    var hostname = req.headers.host;
    return process.env.HTTP + "" + hostname;
}
const dateToString = (date) => {
    let today = new Date(date);
    // today.setHours(today.getHours() + 7);
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let hh = String(today.getHours()).padStart(2, "0");
    let ii = String(today.getMinutes()).padStart(2, "0");
    let ss = String(today.getSeconds()).padStart(2, "0");
    today = `${yyyy}-${mm}-${dd} ${hh}:${ii}:${ss}`;
    return today;
  };

module.exports = {
    dateTimeNow,
    randonAlpha,
    randonNum,
    randonNumAlpha,
    baseurl,
    dateToString
};
