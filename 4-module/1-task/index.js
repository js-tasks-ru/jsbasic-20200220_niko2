/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {

    let list = document.createElement('ul');
    let items = friends.map(item => `<li>${item.firstName} ${item.lastName}</li>`);

    list.innerHTML = items.join('');

    return list;

}
