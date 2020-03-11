/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
    let i;
    i = str.slice(0,1).toUpperCase();
	return i + (str.slice(1));
}