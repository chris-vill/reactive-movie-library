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

export function isTypeOf(type, data) {
  return _data => typeOf(_data) === type;
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
