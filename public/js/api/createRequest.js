/**
 * Основная функция для совершения запросов на сервер.
 * */
const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();

  xhr.responseType = options.responseType;
  xhr.withCredentials = true;
  let requestUrl;
  formData = {};

  if (options.method === 'GET') {
    requestUrl = `${options.url}?`;
    if (options.data) {
      Object.entries(options.data).forEach((elem) => {
        requestUrl += `${elem[0]}=${elem[1]}&`;
      });
    }
    requestUrl = requestUrl.substring(0, requestUrl.length - 1);
  }

  if (options.method === 'POST') {
    formData = new FormData();
    for (let prop in options.data) {
      formData.append(prop, options.data[prop]);
    }
    requestUrl = options.url;
  }

  try {
    xhr.open(options.method, requestUrl);

    xhr.send(formData);
  } catch (error) {
    options.callback(error);
  }

  xhr.onload = function () {
    let err = null;

    if (xhr.status === 500) {
      err = xhr.statusText;
      options.callback(err);
    }

    response = xhr.response;
    options.callback(err, response);
  };

  xhr.onerror = function () {
    let err = xhr.statusText;
    options.callback(err);
  };
};
