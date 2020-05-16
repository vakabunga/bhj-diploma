/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = Array.from(document.getElementsByTagName('body'));
    const toggleButton = document.querySelector('.sidebar-toggle');
    toggleButton.addEventListener('click', () => {
      body[0].classList.toggle('sidebar-collapse');
      body[0].classList.toggle('sidebar-open');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const authLinks = Array.from(document.getElementsByClassName('menu-item'));
    authLinks.forEach((e) => {
      e.addEventListener('click', () => {
        if (e.classList.contains('menu-item_login')) {
          App.getModal('login').open();
        }
        if (e.classList.contains('menu-item_register')) {
          App.getModal('register').open();
        }
        if (e.classList.contains('menu-item_logout')) {
          const data = User.current();
          User.logout(data, App.setState('init'));
        }
      });
    });
  }
}
