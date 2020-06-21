/**
 * Основная функция для совершения запросов на сервер.
 * */
const createRequest = (options = {}) => {
  console.log('createRequest');
  console.log(options);
  let xhr = new XMLHttpRequest();

  xhr.responseType = options.responseType;
  xhr.withCredentials = true;
  let requestUrl;
  formData = {};

  if (options.method === 'GET') {
    requestUrl = `${options.url}?mail=${options.data.email}&password=${options.data.password}`;
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
