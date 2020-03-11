/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
	let j = 1;
	for (let i = 1; i <= n; i++) {
		j = j * i;
	}
	return j;
}
