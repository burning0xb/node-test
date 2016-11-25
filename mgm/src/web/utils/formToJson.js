import jquery from 'jquery';

export default function formToJson(form) {
  const array = jquery(form).serializeArray();
  const json = {};
  for (const item of array) {
    Object.assign(json, { [item.name]: item.value });
  }
  return json;
}
