/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  let tbody = table.querySelector('tbody');
  let tr = tbody.querySelectorAll('tr');

  let i = 1;

  for (let elem of tr) {
    let available = elem.lastElementChild.getAttribute('data-available');

    if (available === 'true') {
      elem.classList.add('available');
    }
    if (available === 'false') {
      elem.classList.add('unavailable');
    }
    if (!available) {
      elem.setAttribute('hidden', '');
    }

    let male = table.rows[i].cells[2].innerHTML;

    if (male === 'm') {
      elem.classList.add('male');
    }
    if (male === 'f') {
      elem.classList.add('female');
    }

    let size = table.rows[i].cells[1].innerHTML;

    if (size <= 18) {
      elem.style.textDecoration = 'line-through';
    }
    i++;
  }
}
