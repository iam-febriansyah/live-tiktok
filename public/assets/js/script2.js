  
  
  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }
  const dollarId = (dollar = 0) => {
    let dollarUSLocale = Intl.NumberFormat('id');
    return dollarUSLocale.format(dollar)
  };
  const validateData = async () => {
    formData = new FormData($(`#${body.formData}`)[0])
    let total = 0;
    let data = {};
    for (id of bodyWajib) {
      total += 1;
      const input = document.querySelector(`#${id}`);
      if (!input ?.value) {
        input ?.classList.add('is-invalid');
        showSnackError(id + ' Harap diisi');
      } else {
        input.classList.remove('is-invalid');
        data[id] = input.value;
        body[id] = input.value;
      }
    }
    for (id of bodySunnah) {
      const input = document.querySelector(`#${id}`);
      body[id] = input.value;
    }
    if (Object.keys(data).length == total) {
      return true
    } else {
      return false
    }
  }
  const postForm = async () => {
    var res = await validateData()
    if (res) {
      await $(`#${body.modal}`).modal('hide');
      await showLoading("Please wait...");
      await $.ajax({
        url: body.url,
        type: 'POST',
        // dataType: 'JSON',
        // data: body,
        contentType: false,
        processData: false,
        cache: false,
        data: formData,
        success: function (res) {
          console.log(res)
          Swal.fire({
            position: 'center',
            icon: res.status == 200 ?"success" : "error",
            title: res.message,
            showConfirmButton: false,
            timer: 3500
          })
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(res)
          Swal.fire({
            position: 'center',
            icon: "error",
            title: res.data,
            showConfirmButton: false,
            timer: 3500
          })
        }
      })
      await dismisLoading();
      renderUtama();
    }
  }
  const postJson = async () => {
    var resData;
    await $(`#${body.modal}`).modal('hide');
    await showLoading("Please wait...");
    await $.ajax({
      url: body.url,
      type: 'POST',
      dataType: 'JSON',
      data: body,
      success: function (res) {
        resData = res;
        Swal.fire({
          position: 'center',
          icon: res.status == 200 ?"success" : "error",
          title: res.message,
          showConfirmButton: false,
          timer: 3500
        })
      },
      error: function (jqXHR, textStatus, textStatus) {
        resData = textStatus;
        Swal.fire({
          position: 'center',
          icon: "error",
          title: textStatus,
          showConfirmButton: false,
          timer: 3500
        })
      }
    })
    await dismisLoading();
    renderUtama();
    return resData;
  }
  const getJson = async () => {
    await showLoading("Please wait...");
    var resData;
    await $.ajax({
      url: body.url,
      dataType: 'JSON',
      type: 'GET',
      success: function (res) {
        resData = res;
      },
      error: function (jqXHR, textStatus, errorThrown) {
        resData = errorThrown;
      }
    })
    await dismisLoading();
    return resData;
  }
  const arrByClassName =  (name = '') => {
    var arr = []
     $(`.${name}`).each(function (index, element) {
        arr.push({id:element.id, value:element.value})
    });
    return arr
  }