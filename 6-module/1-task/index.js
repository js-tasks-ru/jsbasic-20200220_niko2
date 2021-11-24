/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
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
class ClearedTable {
  constructor(data) {
    this.el = document.createElement('table');
    this.data = data;
    this.render();
    this.createContent(data);
    this.remove(data);
  }

  remove(data) {
    this.el.addEventListener('click', (event) => {
      const { target } = event;
      let id;

      if (target.tagName != 'A') return;

      for (let key of data) {
        id = key.id;

        for (let index in key) {
          if (key[index] === id) {
            let el = target.closest('tr');
            el.remove();
          }
        }
      }

      this.onRemoved(id);
    });
  }

  render() {
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    this.el.setAttribute('class', 'pure-table');

    for (let i = 0; i < 6; i++) {
      let td = document.createElement('td');

      if (i === 0) {
        td.innerHTML = 'id';
      }
      if (i === 1) {
        td.innerHTML = 'name';
      }
      if (i === 2) {
        td.innerHTML = 'age';
      }
      if (i === 3) {
        td.innerHTML = 'salary';
      }
      if (i === 4) {
        td.innerHTML = 'city';
      }
      if (i === 5) {
        td.innerHTML = '';
      }
      tr.append(td);
    }
    thead.append(tr);
    this.el.append(thead);
    
  }

  createContent(data) {
    let tbody = document.createElement('tbody');

    for (let key of data) {
      let tr = document.createElement('tr');

      for (let index in key) {
        let td = document.createElement('td');

        td.innerHTML = key[index];

        tr.append(td);
      }

      let newTd = tr.insertCell(5);
      let btn = document.createTextNode('x');
      let link = document.createElement('a');

      newTd.append(link);
      link.setAttribute("href", "#delete");
      link.append(btn);

      tbody.append(tr);
    }

    this.el.append(tbody);
  }

  /**
   * Метод который вызывается после удалении строки
   * @param {number} id - идентификатор удаляемого пользователя
   */
  onRemoved(id) {
    this.id = id;
  }
}

window.ClearedTable = ClearedTable;
