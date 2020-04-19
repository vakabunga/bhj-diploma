/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = (f) => f) {
    let response = createRequest({
      url: this.host + this.url + '/current',
      data,
      responseType: 'json',
      method: 'GET',
      callback,
    });
    // if (response.success) {
    //   user.setCurrent({ id: response.user.id, name: response.user.name });
    // } else {
    //   user.unsetCurrent();
    // }
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = (f) => f) {
    let response = createRequest({
      url: this.host + this.url + '/login',
      data,
      responseType: 'json',
      method: 'POST',
      callback,
    });
    // if (response.success) {
    //   user.setCurrent({ id: response.user.id, name: response.user.name });
    // }

  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = (f) => f) {
    let response = createRequest({
      url: this.host + this.url + '/register',
      data,
      responseType: 'json',
      method: 'POST',
      callback,
    });
    if (response.success) {
      user.setCurrent({ id: response.user.id, name: response.user.name });
    }
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = (f) => f) {
    let response = createRequest({
      url: this.host + this.url + '/logout',
      data,
      responseType: 'json',
      method: 'POST',
      callback,
    });
    if (response.success) {
      user.unsetCurrent();
    }
  }
}

User.host = Entity.host;
User.url = '/user';
