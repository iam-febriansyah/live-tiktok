// $.ajaxSetup({
//   headers: {
//       'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//   }
// })

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

function moneyFormat(price, sign = "", decimal=2) {
  // const pieces = parseFloat(price).toFixed(decimal).split("");
  // let ii = pieces.length - 3;
  // while ((ii -= 3) > 0) {
  //   pieces.splice(ii, 0, ",");
  // }
  // return (sign + pieces.join("")).replace(/\.00$/,'');
  var res = price;
  if(res == null){
      res = "0";
  }else if(res.toString().includes(".")){
      res = parseFloat(res.toString()).toFixed(2);
  }else{
      res = parseFloat(res.toString()).toFixed(0);
  }
  res = res.replace(/\B(?=(\d{3})+(?!\d))/g, "|").replaceAll('.', ',');
  res = res.replaceAll('|', '.');
  return res;
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
  try {
    // dataPost['_token'] = $('meta[name="csrf-token"]').attr('content');
    // var header = { 
    //   "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
    // }
    return await Promise.resolve(
      $.ajax({
        url: url,
        headers: header,
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
          // console.log('XMLHttpRequest', XMLHttpRequest)
          // console.log('textStatus', textStatus)
          // console.log('errorThrown', errorThrown)
          btnId.disabled = false;
          return {
            status : false,
            remarks : errorThrown.toString()
          };
        },
      }).fail(function (jqXHR, exception) {
        // Our error logic here
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'No connection.\n Verify Network.';
            //ERR_CONNECTION_REFUSED hits this one
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        return {
          status : false,
          remarks : msg
        };
      })
    ) ;
  } catch (error) {
    console.log(url)
    console.log(error)
    return {
      status : false,
      remarks : error.toString()
    };
  }
}

async function ajaxPostWIthList(url, dataPost, btnId) {
  try {
    // dataPost['_token'] = $('meta[name="csrf-token"]').attr('content');
    // var header = { 
    //   "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
    // }
    return await Promise.resolve(
      $.ajax({
          url: url,
          headers: header,
          type: "post",
          dataType: "json",
          data: JSON.stringify(dataPost),
          contentType: "application/json; charset=utf-8",
          beforeSend: function() {
              btnId.value = "Processing....";
              btnId.disabled = true;
          },
          success: (res) => {
              btnId.disabled = false;
              return res;
          },
          error: (XMLHttpRequest, textStatus, errorThrown) => {
              // console.log('XMLHttpRequest', XMLHttpRequest)
              // console.log('textStatus', textStatus)
              // console.log('errorThrown', errorThrown)
              btnId.disabled = false;
              return {
                status : false,
                remarks : errorThrown.toString()
              };
          },
      }).fail(function (jqXHR, exception) {
        // Our error logic here
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'No connection.\nVerify Network.';
            //ERR_CONNECTION_REFUSED hits this one
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        return {
          status : false,
          remarks : msg
        };
      })
    );
  } catch (error) {
    console.log(url)
    console.log(error)
    return {
      status : false,
      remarks : error.toString()
    };
  }
}

function showLoading(info = "", disableDismis = false) {
  var backdrop = ' ';
  if(disableDismis){
    backdrop = ' data-bs-keyboard="false" data-bs-backdrop="static" ';
  }
  var html = `
        <div class="modal zoomIn" id="formModalLoading" tabindex="-1" aria-hidden="true" ${backdrop}>
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body p-5 text-center">
                        <lord-icon src="../../json/xjovhxra.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style="width:90px;height:90px"></lord-icon>
                    </div>
                    <div class="modal-body p-5 text-center">
                        ${info}
                    </div>
                </div>
            </div>
        </div>`;
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

async function select2GeneralNew(list, idSelected = null, idSelect, option = {}) {
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
  $("#" + idSelect).select2(option);
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

async function confirmDelete() {
  return await Swal.fire({
    title: 'Apakah kamu yakin?',
    text: "Data yang sudah dihapus, tidak bisa dikembalikan lagi",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Hapus!'
  }).then((result) => {
    return result; 
  })
};

async function confirmSubmit(text, btnText) {
  return await Swal.fire({
    title: 'Apakah kamu yakin?',
    text: text,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: btnText,
    // closeOnConfirm: true
  }).then((result) => {
    window.onkeydown = null;
    window.onfocus = null;
    return result; 
  })
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

function showAlertInfo(header, type, text, hideShow){
  var divAlertInfo = document.getElementById("divAlertInfo");
  var alertInfo = `<div class="alert alert-${type}" role="alert" id="div2AlertInfo">
                    <h4 class="alert-heading">${header}</h4>
                    <p>${text}</p>
                   </div>`
  if(hideShow == 'show'){
    divAlertInfo.innerHTML = alertInfo;
  }else{
    divAlertInfo.innerHTML = '';
  }
}

function getRomawi(bulan){
  if(bulan == '01'){
    return "I";
  }else if(bulan == '02'){
    return "II";
  }else if(bulan == '03'){
    return "III";
  }else if(bulan == '04'){
    return "IV";
  }else if(bulan == '05'){
    return "V";
  }else if(bulan == '06'){
    return "VI";
  }else if(bulan == '07'){
    return "VII";
  }else if(bulan == '08'){
    return "VIII";
  }else if(bulan == '09'){
    return "IX";
  }else if(bulan == '10'){
    return "X";
  }else if(bulan == '11'){
    return "XI";
  }else{
    return "XII";
  }
}

function getBulanIndo(bulan){
  if(bulan == '01'){
    return "Janurai";
  }else if(bulan == '02'){
    return "Februari";
  }else if(bulan == '03'){
    return "Maret";
  }else if(bulan == '04'){
    return "April";
  }else if(bulan == '05'){
    return "Mei";
  }else if(bulan == '06'){
    return "Juni";
  }else if(bulan == '07'){
    return "Juli";
  }else if(bulan == '08'){
    return "Agustus";
  }else if(bulan == '09'){
    return "September";
  }else if(bulan == '10'){
    return "Oktober";
  }else if(bulan == '11'){
    return "November";
  }else{
    return "Desember";
  }
}

function zeroFirst(val, max){
  return val.toString().padStart(max, "0");
}

function rp(res, sep ='.'){
  if(res == null){
      res = "0";
  }else if(res.toString().includes(".")){
      res = parseFloat(res.toString()).toFixed(2);
  }else{
      res = parseFloat(res.toString()).toFixed(0);
  }
  res = res.replace(/\B(?=(\d{3})+(?!\d))/g, "|").replaceAll('.', ',');
  res = res.replaceAll('|', sep);
  return res;
}

function loadInputOption(data_list, idInput, idUl, trigger=null){
  var input = document.getElementById(idInput);
  var options = document.getElementById(idUl);
  var temp_list = data_list;

  $("#"+idInput).on('change keydown paste input click', function(){
      var val = $(this).val();
      var data_list = temp_list.filter(function (str) { return str.toLowerCase().match(val.toLowerCase())!==null });
      options.innerHTML = '';
      if(val == ''){
          data_list = temp_list;
      }
      for(i=0; i<data_list.length; i++) {
          options.innerHTML+=`<li onclick="setValueOption('${idUl}','${idInput}', this.id, ${trigger})" id="${idInput}###${data_list[i]}">${data_list[i]}</li>`;
      }
  });

  document.body.onclick=function(event) {
      if(event.target!=input)
          options.style.display='none';
  }
  input.onclick=function() {
      options.style.display='block';
  }
}

function setValueOption(idUl, idInput, id, trigger){
  var options = document.getElementById(idUl);
  options.style.display='none';
  var input = document.getElementById(idInput);
  input.value = id.split("###")[1];
  if(trigger != null){
    trigger();
  }
}

function closeModal(id, body=null){
  $('#'+id).modal('hide');
  if(body == null){
    document.body.style.overflowY = "scroll";
    document.body.style.overflowX = "scroll";
    for (let index = 0; index < $(".modal-backdrop").length; index++) {
      $(".modal-backdrop")[index].remove();
    }
  }else{
    if ($(".modal-backdrop").length > 0) {
        $(".modal-backdrop")[0].remove();
    }
  }
}
