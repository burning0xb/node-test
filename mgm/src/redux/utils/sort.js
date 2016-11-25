export function sortMethod(list, actionK, actionS) {
  const json = [];
  const val = [];
  const tempSort = [];
  let is = 0;
  list.map((key) => {
    val[is] = key[actionK];
    json['list' + (is++)] = key[actionK];
  });
  if (actionS === 0) {
    val.sort();
  } else {
    val.reverse();
  }
  let jj = 0;
  val.map((key) => {
    let js = '';
    for (js in json) {
      if (js !== '') {
        if (json[js] === key) {
          tempSort[(jj++)] = list[js.substring(4, js.length)];
          delete json[js];
          break;
        }
      }
    }
  });
  return tempSort;
}
