export function validateRequired() {
  return (label, value) => {
    if (!value || value === '') {
      return `${label}不能为空`;
    }
  };
}

export function validateLengthRange(min, max) {
  return (label, value) => {
    if (value.length < min) {
      return `${label}的长度不能小于${min}`;
    }
    if (value.length > max) {
      return `${label}的长度不能大于${max}`;
    }
  };
}

export function buildValidators(props) {
  const validators = [];
  if (props.required) {
    validators.push(validateRequired());
  }
  if (props.lengthRange) {
    validators.push(validateLengthRange(props.lengthRange[0], props.lengthRange[1]));
  }
  return validators;
}

export function validate(validators, label, value, errorCB, passCB) {
  for (let i = 0; i < validators.length; i++) {
    const msg = validators[i](label, value);
    if (msg) {
      errorCB(msg);
      return false;
    }
  }
  passCB();
  return true;
}
