let newData = '';

export default function DataFormat(data) {
  let js = '';
  newData = '';
  for (js in data) {
    if (js !== '') {
      newData += js + '=' + data[js] + '&';
    }
  }
  newData = newData.substring(0, newData.length - 1);
  // alert(newData);
  return newData;
}
