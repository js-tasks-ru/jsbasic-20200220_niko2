/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
    let i;
    i = str.slice(0).toLowerCase();
	if (i.includes('1xbet') || i.includes('xxx')) {
	    return true;
	} else {
	    return false;
	}
}
