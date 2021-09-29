/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
    let td = 0;

    for (let row of table.rows) {
        row.cells[td++].style.backgroundColor = 'red';
    }
}

