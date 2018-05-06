/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {

    for (let i = 0; i < array.length; i++) {
        
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {

    let newArr = [];

    for (let i = 0; i < array.length; i++) {
        
        newArr.push(fn(array[i], i, array));
    }

    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 */
function reduce(array, fn, initial) {
    
    let previousValue = initial || array[0];
    let i = initial ? 0 : 1;
   
    for (i; i < array.length; i++) {
        
        previousValue = fn(previousValue, array[i], i, array);  
    }
    
    return previousValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {

    let result = [];

    for (const prop in obj) {
        result.push(prop.toUpperCase());
    }

    return result;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {

    let result = [];
    let start = (from < 0) ? from + array.length : from;
    let end = (to < 0) ? to + array.length : to;

    for (let i = 0; i < array.length; i++) {
        if (i >= start && i < end) {

            result.push(array[i]);
        }   
    }

    return result;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

    return new Proxy (obj, {
        set(obj, prop, value) {

            return obj[prop] = Math.pow(value, 2);
        }
    })
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
