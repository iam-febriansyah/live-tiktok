const modal = ({ idModal, judul, body, idBtn, ukuran = "" }) => {
  return `<div class="modal fade" id="${idModal}" role="dialog">
        <div class="modal-dialog modal-dialog-centered ${ukuran}" role="document">
            <div class="modal-content">
           
                <div class="modal-header bg-light p-3">
                <h5 class="modal-title" id="exampleModalLabel">${judul}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                    id="close-modal"></button>
                </div>
                <div class="modal-body">${body}</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                    ${idBtn ? `<button type="button" id="${idBtn}" class="btn btn-success">Save</button>` : ""}
                </div>
            </div>
        </div>
    </div>`;
};

const modal2 = ({ idModal, judul, body, idBtn, ukuran = "" }) => {
  return `<div class="modal fade" id="${idModal}" role="dialog">
        <div class="modal-dialog modal-dialog-centered ${ukuran}" role="document">
            <div class="modal-content">
           
                <div class="modal-header bg-light p-3">
                <h5 class="modal-title" id="exampleModalLabel">${judul}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                    id="close-modal"></button>
                </div>
                <div class="modal-body">${body}</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-dismiss="modal">Cancel</button>
                    ${idBtn ? `<button type="button" id="${idBtn}" class="btn btn-success">Save</button>` : ""}
                </div>
            </div>
        </div>
    </div>`;
};

function moneyFormat(price, sign = "") {
  const pieces = parseFloat(price).toFixed(2).split("");
  let ii = pieces.length - 3;
  while ((ii -= 3) > 0) {
    pieces.splice(ii, 0, ",");
  }
  return sign + pieces.join("");
}

const ajax = (url, data, aksi = "", param = "") => {
  $.ajax({
    url: baseUrl + url,
    type: "post",
    dataType: "json",
    data: data,
    success: (res) => {
      if (res.status) {
        success(res.remarks, aksi, param);
      } else {
        showSnackError(res.remarks);
      }
    },
    error: (XMLHttpRequest, textStatus, errorThrown) => {
      showSnackError(XMLHttpRequest);
    },
    timeout: 60000,
  });
};

async function ajaxPost(url, dataPost, btnId) {
  return await Promise.resolve(
    $.ajax({
      url: url,
      type: "post",
      dataType: "json",
      data: dataPost,
      beforeSend: function () {
        btnId.value = "Processing....";
        btnId.disabled = true;
      },
      success: (res) => {
        btnId.disabled = false;
        return res;
      },
      error: (XMLHttpRequest, textStatus, errorThrown) => {
        btnId.disabled = false;
        return false;
      },
    })
  );
}

function showLoading(info = "") {
  var html = `
        <div class="modal zoomIn" id="formModalLoading" tabindex="-1" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body p-5 text-center">
                        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style="width:90px;height:90px"></lord-icon>
                    </div>
                    <div class="modal-body p-5 text-center">
                        ${info}
                    </div>
                </div>
            </div>
        </div>;`;
  document.querySelector("#modalLoading").innerHTML = html;
  $("#formModalLoading").modal("show");
}

function dismisLoading() {
  $("#formModalLoading").modal("hide");
  return true;
}

function renderTinyMce(id) {
  tinymce.init({
    selector: `textarea${id}`,
    height: 200,
    menubar: false,
    plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table paste code help wordcount"],
    toolbar: "undo redo | formatselect | " + "bold italic backcolor | alignleft aligncenter " + "alignright alignjustify | bullist numlist outdent indent | " + "removeformat | help",
    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
    editor_selector: "mceEditor",
  });
}

async function select2General(list, idSelected = null, idSelect, idModal = null) {
  html = "";
  html += `<option value= "" >Pilih</option>`;
  list.forEach((d) => {
    if (d.selected) {
      if (d.selected != "") {
        html += `<option value = "${d.id}" ${d.selected}>${d.text} ${d.selected}</option>`;
      } else {
        html += `<option value = "${d.id}" ${d.id == idSelected ? "selected" : ""}>${d.text}</option>`;
      }
    } else {
      html += `<option value = "${d.id}" ${d.id == idSelected ? "selected" : ""}>${d.text}</option>`;
    }
  });
  $("#" + idSelect).html(html);
  if (idModal != null) {
    $("#" + idSelect).select2({
      dropdownParent: $("#" + idModal),
    });
  } else {
    $("#" + idSelect).select2({});
  }
}
function exSpecisalChar(string) {
  return string.replaceAll(/[^\w\s]/gi, "");
}

function formatMoney(num) {
  var p = num.toFixed(2).split(".");
  var chars = p[0].split("").reverse();
  var newstr = "";
  var count = 0;
  for (x in chars) {
    count++;
    if (count % 3 == 1 && count != 1) {
      newstr = chars[x] + "," + newstr;
    } else {
      newstr = chars[x] + newstr;
    }
  }
  return newstr + "." + p[1];
}

function formatRp(value) {
  return Intl.NumberFormat("en-US", { style: "currency", currency: "TRY" }).format(value).slice(4);
}

function stringToNumber(v) {
  var value = v.toString();
  var replComa = value.replaceAll(",", "");
  return replComa;
}

const ajaxAndRedirect = (url, data, aksi = "", param = "") => {
  $.ajax({
    url: baseUrl + url,
    type: "post",
    dataType: "json",
    data: data,
    success: (res) => {
      if (res.status) {
        success(res.remarks, aksi, param);
      } else {
        showSnackError(res.remarks);
      }
    },

    timeout: 60000,
  });
};

const showSnackError = (text) => {
  iziToast.error({
    title: "Info",
    message: text,
    leavetype: "topRight",
  });
};

const showSnackSuccess = (text, aksi = "") => {
  iziToast.success({
    title: "Info",
    message: text,
    leavetype: "topRight",
  });
  if (aksi) aksi();
};

const success = (text, aksi = "", param = "") => {
  Swal.fire({
    title: "Info",
    html: text,
    icon: "success",
    confirmButtonText: "Ok",
    confirmButtonColor: "#46b654",
  }).then((result) => {
    aksi ? aksi(param) : location.reload(true);
  });
};

const renderSelect = ({ url, param, cek, show, dataku, target }) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      let html = dataku == "" ? '<option value="">Pilih salah satu</option>' : "";
      res.data.forEach((data) => {
        html += `<option value="${data[param]}" ${data[cek] == dataku ? "selected" : ""}>${data[show]}</option>`;
      });
      document.querySelector(`#${target}`).innerHTML = html;
    });
};

const renderSelect2 = (idSelect, idInduk) => $(`#${idSelect}`).select2({ dropdownParent: $(`#${idInduk}`) });

async function getProvinsi(url, idSelected, idSelect, idModal) {
  var listItems = [];
  var dataPost = {};
  var btnId = "";
  var datas = await ajaxPost(url, dataPost, btnId);
  datas.data.forEach((element) => {
    var e = {
      id: element.id,
      text: element.name,
    };
    listItems.push(e);
  });
  select2General(listItems, idSelected, idSelect, idModal);
}

async function getKota(url, wil_provinsi_id, idSelected, idSelect, idModal) {
  var listItems = [];
  var dataPost = {
    wil_provinsi_id: wil_provinsi_id,
  };
  var btnId = "";
  var datas = await ajaxPost(url, dataPost, btnId);
  datas.data.forEach((element) => {
    var e = {
      id: element.id,
      text: element.name,
    };
    listItems.push(e);
  });
  select2General(listItems, idSelected, idSelect, idModal);
}

async function getKecamatan(url, wil_kabkota_id, idSelected, idSelect, idModal) {
  var listItems = [];
  var dataPost = {
    wil_kabkota_id: wil_kabkota_id,
  };
  var btnId = "";
  var datas = await ajaxPost(url, dataPost, btnId);
  datas.data.forEach((element) => {
    var e = {
      id: element.id,
      text: element.name,
    };
    listItems.push(e);
  });
  select2General(listItems, idSelected, idSelect, idModal);
}

async function getDesa(url, wil_kec_id, idSelected, idSelect, idModal) {
  var listItems = [];
  var dataPost = {
    wil_kec_id: wil_kec_id,
  };
  var btnId = "";
  var datas = await ajaxPost(url, dataPost, btnId);
  datas.data.forEach((element) => {
    var e = {
      id: element.id,
      text: element.kelurahan,
    };
    listItems.push(e);
  });
  select2General(listItems, idSelected, idSelect, idModal);
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
