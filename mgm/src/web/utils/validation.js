const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0/* first error */];

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

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `至少 ${min} 个字符`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `不能超过 ${max} 个字符`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return '必须是数字';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `必须是其中一个: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return '不匹配';
      }
    }
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export function isNull(value) {
  if (isEmpty(value)) {
    return true;
  }
}

export function checkInput(obj) {
  let content = '';
  if (this.isNull(obj.username)) {
    content = '账号不能为空！';
  } else if (this.isNull(obj.password)) {
    content = '密码不能为空！';
  } else if (this.isNull(obj.checkcode)) {
    content = '验证码不能为空！';
  }
  return content;
}
