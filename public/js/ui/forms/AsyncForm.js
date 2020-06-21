/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else throw 'Элемент не существует!';
  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    console.log('AsyncForm registerEvents');
    console.log(this);
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    console.log('AsyncForm getData');
    console.log(this);
    const formData = new FormData(this.element),
      entries = formData.entries();
    const data = {};
    for (let item of entries) {
      const key = item[0],
        value = item[1];
      data[key] = value;
    }
    console.log(data);
    return data;
  }

  onSubmit(options) {
    console.log('AsyncForm onSubmit');
    console.log(this);
    console.log(options);
  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    console.log('AsyncForm submit');
    console.log(this);
    const data = this.getData();
    console.log(data);
    this.onSubmit(data);
  }
}
