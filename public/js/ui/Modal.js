/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      Modal.registerEvents();
    } else throw 'Элемент не существует!';
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const closeModal = element.querySelectorAll('[data-dismiss="modal"]');
    closeModal.forEach((e) => {
      e.addEventListener('click', Modal.onClose);
    });
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    e.preventDefault();
    Modal.close();
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    const closeModal = element.querySelectorAll('[data-dismiss="modal"]');
    closeModal.forEach((e) => {
      e.removeEventListener('click', Modal.onClose);
    });
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    element.style.display = null;
  }
}
