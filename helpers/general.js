const pdf = require("html-pdf");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const moment = require("moment");
const math = require("mathjs");
const { v1: uuidv1 } = require("uuid");
const { dirname } = require("path");
const { QueryTypes } = require("sequelize");
var getDirName = require("path").dirname;

const appDir = dirname(require.main.filename);

const month = () => {
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD hh:mm");
  const endOfMonth = moment().endOf("month").format("YYYY-MM-DD hh:mm");
  return (it = {
    startOfMonth,
    endOfMonth,
  });
};

const dateMonthNow = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = `${yyyy}-${mm}`;
  return today;
};

const dateNow = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  return today;
};

const dateNowYear = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = `${yyyy}`;
  return today;
};

const dateTimeNow = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let hh = String(today.getHours()).padStart(2, "0");
  let ii = String(today.getMinutes()).padStart(2, "0");
  let ss = String(today.getSeconds()).padStart(2, "0");
  today = `${yyyy}-${mm}-${dd} ${hh}:${ii}:${ss}`;
  return today;
};

const dateToString = (date) => {
  let today = new Date(date);
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let hh = String(today.getHours()).padStart(2, "0");
  let ii = String(today.getMinutes()).padStart(2, "0");
  let ss = String(today.getSeconds()).padStart(2, "0");
  today = `${yyyy}-${mm}-${dd} ${hh}:${ii}:${ss}`;
  return today;
};

const nowNoSpace = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let hh = String(today.getHours()).padStart(2, "0");
  let ii = String(today.getMinutes()).padStart(2, "0");
  let ss = String(today.getSeconds()).padStart(2, "0");
  today = `${yyyy}${mm}${dd}${hh}${ii}${ss}`;
  return today;
};

const setDateTime = (date) => {
  let today = new Date(date);
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let hh = String(today.getHours()).padStart(2, "0");
  let ii = String(today.getMinutes()).padStart(2, "0");
  let ss = String(today.getSeconds()).padStart(2, "0");
  today = `${yyyy}-${mm}-${dd} ${hh}:${ii}:${ss}`;
  return today;
};

const plusMinusDate = (date, plusMinus) => {
  //date yyyy-mm-dd
  var today = new Date(new Date(date).setDate(new Date(date).getDate() + plusMinus));
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  return today;
};

const plusMinusHourDateTime = (date, plusMinus) => {
  //date yyyy-mm-dd
  var today = new Date(new Date(date).setDate(new Date(date).getHours() + plusMinus));
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  let hh = String(today.getHours()).padStart(2, "0");
  let ii = String(today.getMinutes()).padStart(2, "0");
  let ss = String(today.getSeconds()).padStart(2, "0");
  today = `${yyyy}-${mm}-${dd} ${hh}:${ii}:${ss}`;

  return today;
};

function strToFloat(str) {
  var string = str.toString();
  var temp = string.replaceAll(",", "");
  return parseFloat(temp);
}

function baseurl(req) {
  var hostname = req.headers.host;
  var port = process.env.PORT;
  if (port == "" || port == null) {
    return process.env.HTTP + "" + hostname;
  } else {
    return process.env.HTTP + "" + hostname + ":" + process.env.PORT;
  }
}

async function generatePdfNew(req, { pathFolder, fileName, dataView, view, options }) {
  try {
    var dir = `./public/uploads/${pathFolder}`;
    var dirResult = `/uploads/${pathFolder}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    var dateTimeNow = moment().format("DD-MM-YYYY HH:mm:ss");
    var render = new Promise((resolve, reject) => {
      ejs.renderFile(path.join(view), dataView, async (err, data) => {
        console.log(err);
        if (err) {
          var result = {
            remarks: err.toString(),
            data: err.toString(),
            status: false,
          };
          return result;
        } else {
          var option = options;
          if (options == null) {
            option = {
              format: "A4",
              header: {
                height: "10mm",
                contents: {
                  default: `<div style="pageHeader" ></div>`,
                },
              },
              footer: {
                height: "10mm",
                contents: {
                  default: '<div id="pageFooter" style="font-size: 7pt; color:#abaaad">PRINT DATE : ' + dateTimeNow + "</div>",
                },
              },
            };
          }
          var create = new Promise((resolve, reject) => {
            pdf.create(data, option).toFile(`${dir}/${fileName}`, function (err, data) {
              if (err) {
                var result = {
                  remarks: err.toString(),
                  data: err.toString(),
                  status: false,
                };
              } else {
                var result = {
                  remarks: "File created successfully",
                  data: baseurl(req) + `${dirResult}/${fileName}`,
                  status: true,
                };
              }
              resolve(result);
            });
          });
          var resCreate = await create.then(function (result) {
            return result;
          });
          resolve(resCreate);
        }
      });
    });
    var resRender = await render.then(function (result) {
      return result;
    });
    return resRender;
  } catch (err) {
    var result = {
      remarks: err.toString(),
      data: err.toString(),
      status: false,
    };
    return result;
  }
}

async function fileToBase64(file) {
  var bas64 = fs.readFileSync(file, { encoding: "base64" });
  return bas64;
}

async function base64ToFile(base64String, path) {
  let base64Image = base64String.split(";base64,").pop();
  fs.mkdir(getDirName(path), { recursive: true }, function (err) {
    if (err) return cb(err);
    fs.writeFile(path, base64Image, { encoding: "base64" }, function (err) {
      console.log("File created");
      console.log(err);
    });
  });
}

async function getExtBase64(mime) {
  if (mime == ".aac") {
    return "audio/aac";
  } else if (mime == ".abw") {
    return "application/x-abiword";
  } else if (mime == ".arc") {
    return "application/x-freearc";
  } else if (mime == ".avif") {
    return "image/avif";
  } else if (mime == ".avi") {
    return "video/x-msvideo";
  } else if (mime == ".azw") {
    return "application/vnd.amazon.ebook";
  } else if (mime == ".bin") {
    return "application/octet-stream";
  } else if (mime == ".bmp") {
    return "image/bmp";
  } else if (mime == ".bz") {
    return "application/x-bzip";
  } else if (mime == ".bz2") {
    return "application/x-bzip2";
  } else if (mime == ".cda") {
    return "application/x-cdf";
  } else if (mime == ".csh") {
    return "application/x-csh";
  } else if (mime == ".css") {
    return "text/css";
  } else if (mime == ".csv") {
    return "text/csv";
  } else if (mime == ".doc") {
    return "application/msword";
  } else if (mime == ".docx") {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  } else if (mime == ".eot") {
    return "application/vnd.ms-fontobject";
  } else if (mime == ".epub") {
    return "application/epub+zip";
  } else if (mime == ".gz") {
    return "application/gzip";
  } else if (mime == ".gif") {
    return "image/gif";
  } else if (mime == ".htm .html") {
    return "text/html";
  } else if (mime == ".ico") {
    return "image/vnd.microsoft.icon";
  } else if (mime == ".ics") {
    return "text/calendar";
  } else if (mime == ".jar") {
    return "application/java-archive";
  } else if (mime == ".jog") {
    return "image/jpg";
  } else if (mime == ".jpeg") {
    return "image/jpeg";
  } else if (mime == ".js") {
    return "text/javascript";
  } else if (mime == ".json") {
    return "application/json";
  } else if (mime == ".jsonld") {
    return "application/ld+json";
  } else if (mime == ".mid .midi") {
    return "audio/midi audio/x-midi";
  } else if (mime == ".mjs") {
    return "text/javascript";
  } else if (mime == ".mp3") {
    return "audio/mpeg";
  } else if (mime == ".mp4") {
    return "video/mp4";
  } else if (mime == ".mpeg") {
    return "video/mpeg";
  } else if (mime == ".mpkg") {
    return "application/vnd.apple.installer+xml";
  } else if (mime == ".odp") {
    return "application/vnd.oasis.opendocument.presentation";
  } else if (mime == ".ods") {
    return "application/vnd.oasis.opendocument.spreadsheet";
  } else if (mime == ".odt") {
    return "application/vnd.oasis.opendocument.text";
  } else if (mime == ".oga") {
    return "audio/ogg";
  } else if (mime == ".ogv") {
    return "video/ogg";
  } else if (mime == ".ogx") {
    return "application/ogg";
  } else if (mime == ".opus") {
    return "audio/opus";
  } else if (mime == ".otf") {
    return "font/otf";
  } else if (mime == ".png") {
    return "image/png";
  } else if (mime == ".pdf") {
    return "application/pdf";
  } else if (mime == ".php") {
    return "application/x-httpd-php";
  } else if (mime == ".ppt") {
    return "application/vnd.ms-powerpoint";
  } else if (mime == ".pptx") {
    return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  } else if (mime == ".rar") {
    return "application/vnd.rar";
  } else if (mime == ".rtf") {
    return "application/rtf";
  } else if (mime == ".sh") {
    return "application/x-sh";
  } else if (mime == ".svg") {
    return "image/svg+xml";
  } else if (mime == ".tar") {
    return "application/x-tar";
  } else if (mime == ".tif .tiff") {
    return "image/tiff";
  } else if (mime == ".ts") {
    return "video/mp2t";
  } else if (mime == ".ttf") {
    return "font/ttf";
  } else if (mime == ".txt") {
    return "text/plain";
  } else if (mime == ".vsd") {
    return "application/vnd.visio";
  } else if (mime == ".wav") {
    return "audio/wav";
  } else if (mime == ".weba") {
    return "audio/webm";
  } else if (mime == ".webm") {
    return "video/webm";
  } else if (mime == ".webp") {
    return "image/webp";
  } else if (mime == ".woff") {
    return "font/woff";
  } else if (mime == ".woff2") {
    return "font/woff2";
  } else if (mime == ".xhtml") {
    return "application/xhtml+xml";
  } else if (mime == ".xls") {
    return "application/vnd.ms-excel";
  } else if (mime == ".xlsx") {
    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  } else if (mime == ".xml") {
    return "application/xml";
  } else if (mime == ".xul") {
    return "application/vnd.mozilla.xul+xml";
  } else if (mime == ".zip") {
    return "application/zip";
  } else if (mime == ".3gp") {
    return "video/3gpp";
  } else if (mime == ".3g2") {
    return "video/3gpp2";
  } else if (mime == ".7z") {
    return "application/x-7z-compressed";
  } else {
    return null;
  }
}

async function getExt(mime) {
  if (mime == "audio/aac") {
    return ".aac";
  } else if (mime == "application/x-abiword") {
    return ".abw";
  } else if (mime == "application/x-freearc") {
    return ".arc";
  } else if (mime == "image/avif") {
    return ".avif";
  } else if (mime == "video/x-msvideo") {
    return ".avi";
  } else if (mime == "application/vnd.amazon.ebook") {
    return ".azw";
  } else if (mime == "application/octet-stream") {
    return ".bin";
  } else if (mime == "image/bmp") {
    return ".bmp";
  } else if (mime == "application/x-bzip") {
    return ".bz";
  } else if (mime == "application/x-bzip2") {
    return ".bz2";
  } else if (mime == "application/x-cdf") {
    return ".cda";
  } else if (mime == "application/x-csh") {
    return ".csh";
  } else if (mime == "text/css") {
    return ".css";
  } else if (mime == "text/csv") {
    return ".csv";
  } else if (mime == "application/msword") {
    return ".doc";
  } else if (mime == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    return ".docx";
  } else if (mime == "application/vnd.ms-fontobject") {
    return ".eot";
  } else if (mime == "application/epub+zip") {
    return ".epub";
  } else if (mime == "application/gzip") {
    return ".gz";
  } else if (mime == "image/gif") {
    return ".gif";
  } else if (mime == "text/html") {
    return ".htm .html";
  } else if (mime == "image/vnd.microsoft.icon") {
    return ".ico";
  } else if (mime == "text/calendar") {
    return ".ics";
  } else if (mime == "application/java-archive") {
    return ".jar";
  } else if (mime == "image/jpg") {
    return ".jog";
  } else if (mime == "image/jpeg") {
    return ".jpeg";
  } else if (mime == "text/javascript") {
    return ".js";
  } else if (mime == "application/json") {
    return ".json";
  } else if (mime == "application/ld+json") {
    return ".jsonld";
  } else if (mime == "audio/midi audio/x-midi") {
    return ".mid .midi";
  } else if (mime == "text/javascript") {
    return ".mjs";
  } else if (mime == "audio/mpeg") {
    return ".mp3";
  } else if (mime == "video/mp4") {
    return ".mp4";
  } else if (mime == "video/mpeg") {
    return ".mpeg";
  } else if (mime == "application/vnd.apple.installer+xml") {
    return ".mpkg";
  } else if (mime == "application/vnd.oasis.opendocument.presentation") {
    return ".odp";
  } else if (mime == "application/vnd.oasis.opendocument.spreadsheet") {
    return ".ods";
  } else if (mime == "application/vnd.oasis.opendocument.text") {
    return ".odt";
  } else if (mime == "audio/ogg") {
    return ".oga";
  } else if (mime == "video/ogg") {
    return ".ogv";
  } else if (mime == "application/ogg") {
    return ".ogx";
  } else if (mime == "audio/opus") {
    return ".opus";
  } else if (mime == "font/otf") {
    return ".otf";
  } else if (mime == "image/png") {
    return ".png";
  } else if (mime == "application/pdf") {
    return ".pdf";
  } else if (mime == "application/x-httpd-php") {
    return ".php";
  } else if (mime == "application/vnd.ms-powerpoint") {
    return ".ppt";
  } else if (mime == "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
    return ".pptx";
  } else if (mime == "application/vnd.rar") {
    return ".rar";
  } else if (mime == "application/rtf") {
    return ".rtf";
  } else if (mime == "application/x-sh") {
    return ".sh";
  } else if (mime == "image/svg+xml") {
    return ".svg";
  } else if (mime == "application/x-tar") {
    return ".tar";
  } else if (mime == "image/tiff") {
    return ".tif .tiff";
  } else if (mime == "video/mp2t") {
    return ".ts";
  } else if (mime == "font/ttf") {
    return ".ttf";
  } else if (mime == "text/plain") {
    return ".txt";
  } else if (mime == "application/vnd.visio") {
    return ".vsd";
  } else if (mime == "audio/wav") {
    return ".wav";
  } else if (mime == "audio/webm") {
    return ".weba";
  } else if (mime == "video/webm") {
    return ".webm";
  } else if (mime == "image/webp") {
    return ".webp";
  } else if (mime == "font/woff") {
    return ".woff";
  } else if (mime == "font/woff2") {
    return ".woff2";
  } else if (mime == "application/xhtml+xml") {
    return ".xhtml";
  } else if (mime == "application/vnd.ms-excel") {
    return ".xls";
  } else if (mime == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
    return ".xlsx";
  } else if (mime == "application/xml") {
    return ".xml";
  } else if (mime == "application/vnd.mozilla.xul+xml") {
    return ".xul";
  } else if (mime == "application/zip") {
    return ".zip";
  } else if (mime == "video/3gpp") {
    return ".3gp";
  } else if (mime == "video/3gpp2") {
    return ".3g2";
  } else if (mime == "application/x-7z-compressed") {
    return ".7z";
  } else {
    return null;
  }
}

function bulan(bulan) {
  if (bulan == "01") {
    return "Januari";
  } else if (bulan == "02") {
    return "Februari";
  } else if (bulan == "03") {
    return "Maret";
  } else if (bulan == "04") {
    return "April";
  } else if (bulan == "05") {
    return "Mei";
  } else if (bulan == "06") {
    return "Juni";
  } else if (bulan == "07") {
    return "Juli";
  } else if (bulan == "08") {
    return "Agustus";
  } else if (bulan == "09") {
    return "September";
  } else if (bulan == "10") {
    return "Oktober";
  } else if (bulan == "11") {
    return "November";
  } else {
    return "Desember";
  }
}

async function phoneCode() {
  var jsonFile = "./public/json/phone_code.json";
  let rawdata = fs.readFileSync(jsonFile);
  let data = JSON.parse(rawdata);
  return data;
}

function randonNumAlpha(length) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function forceLogout(res, req) {
  console.log("forceLogout");
  req.flash("alertMessage", `Session anda telah habis, harap login kembali`);
  req.flash("alertStatus", "danger");
  res.cookie("auth", "null");
  req.session.destroy();
  res.redirect("/");
}

function isFileExist(path) {
  try {
    if (fs.existsSync(path)) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

function arFilter(user) {
  return Object.keys(this).every((key) => user[key] === this[key]);
}

function bulanIndo(val) {
  if (val == "1" || val == "01") {
    return "Januari";
  } else if (val == "2" || val == "02") {
    return "Februari";
  } else if (val == "3" || val == "03") {
    return "Maret";
  } else if (val == "4" || val == "04") {
    return "April";
  } else if (val == "5" || val == "05") {
    return "Mei";
  } else if (val == "6" || val == "06") {
    return "Juni";
  } else if (val == "7" || val == "07") {
    return "Juli";
  } else if (val == "8" || val == "08") {
    return "Agustus";
  } else if (val == "9" || val == "09") {
    return "September";
  } else if (val == "10") {
    return "Oktober";
  } else if (val == "11") {
    return "November";
  } else if (val == "12") {
    return "Desember";
  } else {
    return "invalid";
  }
}

function moneyFormat(price, sign = "", decimal = 2) {
  const pieces = parseFloat(price).toFixed(decimal).split("");
  let ii = pieces.length - 3;
  while ((ii -= 3) > 0) {
    pieces.splice(ii, 0, ",");
  }
  return (sign + pieces.join("")).replace(/\.00$/, "");
}

function isInt(value) {
  return (
    !isNaN(value) &&
    (function (x) {
      return (x | 0) === x;
    })(parseFloat(value))
  );
}

async function upsert(db, values, condition, isUpdate = true) {
  try {
    return await db.findOne({ where: condition })
      .then(async function(obj) {
          if(obj){
            if(isUpdate){
              return await obj.update(values);
            }
            return obj;
          }else{
            return await db.create(values);
          }
      })
  } catch (error) {
    console.log('upsert', error)
  }
  
}

module.exports = {
  dateNow,
  dateMonthNow,
  dateNowYear,
  dateTimeNow,
  nowNoSpace,
  plusMinusDate,
  plusMinusHourDateTime,
  setDateTime,
  month,
  strToFloat,
  generatePdfNew,
  baseurl,
  fileToBase64,
  getExt,
  getExtBase64,
  bulan,
  phoneCode,
  randonNumAlpha,
  forceLogout,
  isFileExist,
  base64ToFile,
  arFilter,
  bulanIndo,
  moneyFormat,
  dateToString,
  isInt,
  upsert
};
