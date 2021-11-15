/**
 * Компонент, который реализует сортируемую таблицу
 * @param {Array} items - данные, которые нужно отобразить
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },
 *
 * @constructor
 */
function SortableTable(items) {
  /**
   * @property {Element} - обязательное свойство, которое ссылается на элемент <table>
   */
  this.el = document.createElement('table');
  createHead(this.el);
  createBody(items, this.el);

  /**
   * Метод выполняет сортировку таблицы
   * @param {number} column - номер колонки, по которой
   * нужно выполнить сортировку (отсчет начинается от 0)
   * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
   */
  this.sort = (column, desc = false) => {
    if (column === 0) {
      items.sort(function(a, b) {
        if (!desc && a.name > b.name || desc && a.name < b.name) {
          return 1;
        }
        if (a.name == b.name) {
          return 0;
        }
        if (!desc && a.name < b.name || desc && a.name > b.name) {
          return -1;
        }
      }); 
    }
    if (column === 2) {
      items.sort(function(a, b) {
        if (!desc) {
          return a.salary - b.salary;
        } else {
          return b.salary - a.salary;
        }
      });
    }
    
    removeBody(this.el);
    createBody(items, this.el);
  };

  function createHead(element) {
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');

    for (let i = 0; i < 4; i++) {
      let td = document.createElement('td');
      if (i === 0) {
        td.innerHTML = 'Name';
      }
      if (i === 1) {
        td.innerHTML = 'Age';
      }
      if (i === 2) {
        td.innerHTML = 'Salary';
      }
      if (i === 3) {
        td.innerHTML = 'City';
      }

      tr.append(td);
    }

    thead.append(tr);
    element.append(thead);

  }

  function createBody(items, element) {
    let tbody = document.createElement('tbody');

    for (let data of items) {
      let tr = document.createElement('tr');

      for (let key in data) {
        let td = document.createElement('td');

        td.innerHTML = data[key];

        tr.append(td);
      }

      tbody.append(tr);
    }

    element.append(tbody);
  }

  function removeBody(element) {
    element.lastElementChild.remove();
  }
}
