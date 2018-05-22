/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// кнопка "удалить cookie"
// const removeButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

window.addEventListener('load', () => {
    let cookieObj = cookieParse();

    createTable(cookieObj);
});

const createTable = (cookieObj) => {
    listTable.innerHTML = '';
    
    for (const name in cookieObj) {
        const removeButton = document.createElement('button')
        const tr = document.createElement('tr');

        removeButton.setAttribute('id', 'removeButton')
        removeButton.innerText = 'Удалить cookie';

        tr.innerHTML = `<td>${name}</td><td>${cookieObj[name]}</td><td></td>`;
        const lastChild = tr.lastChild;

        listTable.appendChild(tr);
        lastChild.appendChild(removeButton);
    }
}

const cookieParse = () => {
    if (!document.cookie) {
        return;
    }

    const cookieObj = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;
    
        return (prev);
    }, {});

    return cookieObj;
}

const filterCookie = () => {
    let cookieObj = cookieParse();
    let value = filterNameInput.value;

    for (const name in cookieObj) {
        if (!name.includes(value) && !cookieObj[name].includes(value)) {
            delete cookieObj[name];
        }
    }

    createTable(cookieObj)
}

filterNameInput.addEventListener('keyup', () => {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    filterCookie();
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    filterCookie();
});

listTable.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const removeElement = event.target.parentNode.parentNode;
        const cookieName = removeElement.firstElementChild.innerText;
        const date = new Date(0);

        document.cookie = `${cookieName}=; expires=${date.toUTCString()}`;
        listTable.removeChild(removeElement);
    }
})