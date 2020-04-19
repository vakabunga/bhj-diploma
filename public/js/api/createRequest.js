/**
 * Основная функция для совершения запросов на сервер.
 * */
const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();

  options.responseType === undefined
    ? (xhr.responseType = 'json')
    : (xhr.responseType = options.responseType);
  xhr.withCredentials = true;

  if (options.method === 'GET') {
    const formData = null;
    const requestUrl = `${options.url}?mail=${options.data.mail}&password=${options.data.password}`;
  }

  if (options.method === 'POST') {
    formData = new FormData();
    formData.append('mail', options.data.user.mail);
    formData.append('password', options.data.user.password);
    requestUrl = options.url;
  }

  try {
    xhr.open(options.method, requestUrl);

    if (options.headers != undefined) {
      for (var prop in options.headers)
        xhr.setRequestHeader(prop, options.headers[prop]);
    } else {
      xhr.setRequestHeader('Content-type', 'application/json');
    }

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

    response = JSON.parse(xhr.response);
    options.callback(err, response);
  };

  xhr.onerror = function () {
    let err = xhr.statusText;
    options.callback(err);
  };
};
