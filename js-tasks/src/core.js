/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
    return typeof n === 'number' && (n | 0) === n;
}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
    const result = [];
    for (let i = 2; i <= 20; i += 2) {
        result.push(i);
    }
    return result;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
    if (n <= 1) return n;
    return n + recSumTo(n - 1);
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
    let res = 1;
    for (let i = 2; i <= n; i++) {
        res *= i;
    }
    return res;
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) {
    return typeof n === 'number' && n > 0 && (n & (n - 1)) === 0;
}

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
    if (n <= 2) return 1;
    let a = 1,
        b = 1;
    for (let i = 3; i <= n; i++) {
        const c = a + b;
        a = b;
        b = c;
    }
    return b;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    let storedValue = initialValue;
    return function (newValue) {
        if (typeof operatorFn === 'function') {
            storedValue = operatorFn(storedValue, newValue);
            return storedValue;
        }
        return initialValue;
    };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start, step) {
    let current = typeof start === 'number' ? start : 0;
    const delta = typeof step === 'number' ? step : 1;
    return function () {
        const value = current;
        current += delta;
        return value;
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    // Strict equality covers primitives and same reference (including functions)
    if (firstObject === secondObject) return true;

    // Handle NaN equality
    if (
        typeof firstObject === 'number' &&
        typeof secondObject === 'number' &&
        Number.isNaN(firstObject) &&
        Number.isNaN(secondObject)
    ) {
        return true;
    }

    // Different types are not equal
    if (typeof firstObject !== typeof secondObject) return false;

    // Null handling (typeof null === 'object')
    if (firstObject === null || secondObject === null) return false;

    // Functions: if not strictly equal (handled above), consider not equal
    if (typeof firstObject === 'function') return false;

    // Arrays handling
    if (Array.isArray(firstObject)) {
        if (!Array.isArray(secondObject)) return false;
        if (firstObject.length !== secondObject.length) return false;
        for (let i = 0; i < firstObject.length; i++) {
            if (!deepEqual(firstObject[i], secondObject[i])) return false;
        }
        return true;
    }

    // Objects handling
    if (typeof firstObject === 'object') {
        const keysA = Object.keys(firstObject);
        const keysB = Object.keys(secondObject);
        if (keysA.length !== keysB.length) return false;
        for (const key of keysA) {
            if (!keysB.includes(key)) return false;
        }
        for (const key of keysA) {
            if (!deepEqual(firstObject[key], secondObject[key])) return false;
        }
        return true;
    }

    // Fallback for remaining primitives
    return false;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
