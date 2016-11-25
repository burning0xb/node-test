let len;
export function dateFormat(GMT) {
  let FullDate;
  const year = new Date(GMT).getFullYear().toString();
  let month = (new Date(GMT).getMonth() + 1).toString();
  let date = new Date(GMT).getDate().toString();
  let hours = new Date(GMT).getHours().toString();
  let minute = new Date(GMT).getMinutes().toString();
  if (month.length === 1) {
    month = '0' + month;
  }
  if (date.length === 1) {
    date = '0' + date;
  }
  if (hours.length === 1) {
    hours = '0' + hours;
  }
  if (minute.length === 1) {
    minute = '0' + minute;
  }
  FullDate = year + '-' + month + '-' + date + ' ' + hours + ':' + minute;
  return FullDate;
}

export function yyyyMMdd(GMT) {
  if (GMT !== null) {
    let FullDate;
    const year = new Date(GMT).getFullYear().toString();
    let month = (new Date(GMT).getMonth() + 1).toString();
    let date = new Date(GMT).getDate().toString();
    if (month.length === 1) {
      month = '0' + month;
    }
    if (date.length === 1) {
      date = '0' + date;
    }
    FullDate = year + '-' + month + '-' + date;
    return FullDate;
  }
}

export function hhMMss(GMT) {
  let FullDate;
  const year = new Date(GMT).getFullYear().toString();
  let month = (new Date(GMT).getMonth() + 1).toString();
  let date = new Date(GMT).getDate().toString();
  let hours = new Date(GMT).getHours().toString();
  let minute = new Date(GMT).getMinutes().toString();
  let seconds = new Date(GMT).getSeconds().toString();
  if (month.length === 1) {
    month = '0' + month;
  }
  if (date.length === 1) {
    date = '0' + date;
  }
  if (hours.length === 1) {
    hours = '0' + hours;
  }
  if (minute.length === 1) {
    minute = '0' + minute;
  }
  if (seconds.length === 1) {
    seconds = '0' + seconds;
  }
  FullDate = year + '-' + month + '-' + date + '  ' + hours + ':' + minute + ':' + seconds;
  return FullDate;
}

export function subFormat(str) {
  if (str !== null) {
    len = '';
    if (str.length > 10) {
      len = str.substring(0, 10);
      len = len + '...';
    } else {
      len = str;
    }
    return len;
  }
}
export function subFormat2(length, str) {
  if (str !== null) {
    len = '';
    if (str.length > length) {
      len = str.substring(0, length);
      len = len + '...';
    } else {
      len = str;
    }
    return len;
  }
}
