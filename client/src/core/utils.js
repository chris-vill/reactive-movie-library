import { format } from 'date-fns';

export function typeOf(data) {
  let type = ({})
    .toString
    .call(data)
    .slice(8, -1)
    .toLowerCase();

  if (type === 'object') {
    let constructor = data.__proto__.constructor.name;

    return constructor !== 'Object' ? constructor : type;

  } else if (type === 'number' && isNaN(data)) {
    return 'nan';

  } else {
    return type;
  }
}

/**
 * NOTE
 * 
 * 1 args will return curry function
 * @param type: string | [string]
 * 
 * 2 args
 * @param data: any
 * @param type: string | [string]
 * 
 * Curry function
 * @param data: any
 */
function baseIsTypeOf() {
  const args = Array(...arguments);
  const equals = args.pop();
  let type, data;

  if (args.length === 1) {
    type = args[0];

    return _data => equals
      ? typeOf(_data) === type
      : typeOf(_data) !== type;
  }

  type = args.pop();
  data = args[0];
  let types = typeof(type) === 'array'
    ? type
    : [ type ];

  return types.some(type => equals
    ? typeOf(data) === type
    : typeOf(data) !== type);
}

export function isNotTypeOf() {
  const args = Array(...arguments);
  args.push(false);
  return baseIsTypeOf(...args);
}

export function isTypeOf() {
  const args = Array(...arguments);
  args.push(true);
  return baseIsTypeOf(...args);
}

export function objectMap(obj, fn) {
  return Object
    .entries(obj)
    .map((entry, i) => {
      const key = entry[0];
      const val = entry[1];

      return fn(val, key, i);
    });
}

export function firstLetterUpperCase(text) {
  return text.replace(/^\w/, letter => letter.toUpperCase());
}

export function formatDate(dateString, formatString='MMM dd, yyyy') {
  return format(new Date(dateString), formatString);
}

export function formatTime(time) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${ hours }h ${ minutes }m`
}

export function unique(list) {
  const newList = [];

  list.forEach(item => {
    const copies = newList.find(newItem => {
      return Object.keys(newItem).every(prop =>
        item[prop] === newItem[prop]
      );
    });

    if (!copies) {
      newList.push(item);
    }
  });

  return newList;
}