/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

homeworkContainer.style.position = 'relative';
homeworkContainer.style.overflow = 'hidden';
homeworkContainer.style.height = '100vh';

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */

function createDiv() {
    let newDiv = document.createElement('div');
    let dim = { width: 0, height: 0, posTop: 0, posLeft: 0 }
    let getRandomInt = (min, max) => { 
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let randomColor = { r: 0, g: 0, b: 0 }

    for (const prop in randomColor) {
        if (randomColor.hasOwnProperty(prop)) {
            
            randomColor[prop] = getRandomInt(0, 255);
        }
    }

    for (let prop in dim) {
        if (dim.hasOwnProperty(prop)) {

            dim[prop] = Math.floor(Math.random() * 100);
        }
    }

    newDiv.className = 'draggable-div';
    newDiv.style.width = `${dim.width / 2}%`;
    newDiv.style.height = `${dim.height / 2}%`;
    newDiv.style.backgroundColor = `rgb(${randomColor.r}, ${randomColor.g}, ${randomColor.b})`;
    newDiv.style.position = 'absolute';
    newDiv.style.top = `${dim.posTop}%`;
    newDiv.style.left = `${dim.posLeft}%`;

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    let currentTarget = target.parentNode;
    let box;
    let handlers = {
        handlerMouseDown(event) {
            if (event.target.classList.contains('draggable-div')) {
                box = event.target;
                document.addEventListener('mousemove', handlers.handlerMouseMove);
            }
        },
        handlerMouseMove(event) {
            if (window.innerHeight > event.pageY && window.innerWidth > event.pageX) {
                box.style.top = event.pageY - box.offsetHeight / 2 + 'px';
                box.style.left = event.pageX - box.offsetWidth / 2 + 'px';
            }
        },
        handlerRemoveMouseMove() {
            document.removeEventListener('mousemove', handlers.handlerMouseMove);
        }
    };

    currentTarget.addEventListener('mousedown', handlers.handlerMouseDown);
    currentTarget.addEventListener('mouseup', handlers.handlerRemoveMouseMove);
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
