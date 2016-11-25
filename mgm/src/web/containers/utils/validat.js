const isEmpty = value => value === undefined || value === null || value === '';

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return '邮件地址格式不正确!';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return '必填';
  }
}

export function minLength(value, min) {
  if (min > 0) {
    if (!isEmpty(value) && value.length < min) {
      return `至少 ${min} 个字符`;
    }
  }
}

export function maxLength(value, max) {
  if (max > 0) {
    if (!isEmpty(value) && value.length > max) {
      return `不能超过 ${max} 个字符`;
    }
  }
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return '必须是数字';
  }
}

export function oneOf(enumeration, value) {
  if (!~enumeration.indexOf(value)) {
    return `必须是其中一个: ${enumeration.join(', ')}`;
  }
}

export function validate(value, req, min, max) {
  let flag = undefined;
  if (req) {
    flag = required(value);
  }
  if (!flag && min) {
    flag = minLength(value, min);
  }
  if (!flag && max) {
    flag = maxLength(value, max);
  }
  return flag;
}

export function makeArray(obj) {
  let rs = [];
  try {
    rs = [].slice.call(obj, 0);
  } catch (exception) { // for IE
    for (let index = 1; index < obj.length; index++) {
      rs.push(obj[index]);
    }
  }
  return rs;
}
