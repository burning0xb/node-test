import jquery from 'jquery';
import { getFlag } from './status.js';
import checkIdCard from './checkidCard.js';
const isEmpty = value => value === undefined || value === null || value === '';
let text;

function getValue(obj) {
  let type = obj.getAttribute('data-info');
  const value = obj.value;
  let len;
  let model;
  if (type.indexOf('length') > -1) {
    const temp = type;
    type = type.split(':')[0];
    model = temp.split(':')[1];
    len = temp.split(':')[2];
  }
  if (type.indexOf('num.') > -1) {
    const temp = type;
    type = type.split('.')[0] + '.';
    len = temp.split('.')[1];
  }
  if (type.indexOf('num:') > -1) {
    const temp = type;
    type = type.split(':')[0];
    len = temp.split(':')[1];
  }
  switch (type) {
    case 'no':
      return;
    case 'empty':
      if (isEmpty(value)) {
        jquery(obj).parent().find('.error:first').html('必填');
        return;
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    case 'tel':
      if (isEmpty(value)) {
        jquery(obj).parent().find('.error:first').html('必填');
        return;
      }
      if (/^1(3[0-9]|4[57]|5[012356789]|7[0-9]|8[0-9]|9[8])[0-9]{8}$/.test(value) === false) {
        jquery(obj).parent().find('.error:first').html('手机号格式不正确');
        return;
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    case 'password':
      if (isEmpty(value)) {
        jquery(obj).parent().find('.error:first').html('必填');
        return;
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    case 'mobile':
      if (isEmpty(value) === false) {
        if (/^1(3[0-9]|4[57]|5[012356789]|7[0-9]|8[0-9]|9[8])[0-9]{8}$/.test(value) === false) {
          jquery(obj).parent().find('.error:first').html('手机号格式不正确');
          return;
        }
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    case 'num':
      if (isEmpty(value)) {
        jquery(obj).parent().find('.error:first').html('必填');
        return;
      }
      if (/^[0-9]*$/.test(value) === false) {
        jquery(obj).parent().find('.error:first').html('必须是整数');
        return;
      }
      if (len !== undefined) {
        if (value.length > len) {
          jquery(obj).parent().find('.error:first').html(`不能超过 ${len} 个字符`);
          return;
        }
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    case 'date':
      if ( value !== null && value !== '') {
        if (/^(0?[1-9]|1[0-2])$/.test(value) === false) {
          jquery(obj).parent().parent().parent().find('.pada').show();
          jquery(obj).parent().parent().parent().find('.error:first').html('必须是1-12月的月份');
          return;
        }
        jquery(obj).parent().parent().parent().find('.pada').hide();
        jquery(obj).parent().parent().parent().find('.error:first').html('');
        return;
      }
      jquery(obj).parent().parent().parent().find('.pada').hide();
      jquery(obj).parent().parent().parent().find('.error:first').html('');
      return;
    case 'bbb':
      if (/^[0-9]*$/.test(value) === false) {
        jquery(obj).parent().parent().parent().find('.pada').show();
        jquery(obj).parent().parent().parent().find('.error:first').html('必须是整数');
        return;
      }
      if (value.length > 11) {
        jquery(obj).parent().parent().parent().find('.pada').show();
        jquery(obj).parent().parent().parent().find('.error:first').html(`不能超过 ${11} 个字符`);
        return;
      }
      jquery(obj).parent().parent().parent().find('.pada').hide();
      jquery(obj).parent().parent().parent().find('.error:first').html('');
      return;
    case 'nm':
      if (/^[0-9]*$/.test(value) === false) {
        jquery(obj).parent().parent().parent().find('.pada').show();
        jquery(obj).parent().parent().parent().find('.error:first').html('必须是整数');
        return;
      }
      jquery(obj).parent().parent().parent().find('.pada').hide();
      jquery(obj).parent().parent().parent().find('.error:first').html('');
      return;
    case 'ydm':
      if (/^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/.test(value) === false && value !== '') {
        jquery(obj).parent().parent().parent().find('.pada').show();
        jquery(obj).parent().parent().parent().find('.error:first').html('请填写正确的日期');
        return;
      }
      jquery(obj).parent().parent().parent().find('.pada').hide();
      jquery(obj).parent().parent().parent().find('.error:first').html('');
      return;
    case 'num.':
      if (isEmpty(value)) {
        jquery(obj).parent().find('.error:first').html('必填');
        return;
      }
      if (/^\d+(\.\d+)?$/.test(value) === false) {
        jquery(obj).parent().find('.error:first').html('必须是整数或小数');
        return;
      }
      if (value.split('.')[1] && value.split('.')[1].length > 4) {
        jquery(obj).parent().find('.error:first').html('小数部分不能超过四位');
        return;
      }
      if (value.length > len) {
        jquery(obj).parent().find('.error:first').html(`不能超过 ${len} 个字符`);
        return;
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    case 'idcard':
      if (isEmpty(value)) {
        jquery(obj).parent().find('.error:first').html('必填');
        return;
      }
      if (checkIdCard(value) === false) {
        jquery(obj).parent().find('.error:first').html('证件号码格式不正确');
        return;
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    case 'length':
      if (isEmpty(value)) {
        jquery(obj).parent().find('.error:first').html('必填');
        return;
      }
      if (model === 'min') {
        if (value.length < parseInt(len, 10)) {
          jquery(obj).parent().find('.error:first').html(`至少 ${len} 个字符`);
          return;
        }
      }
      if (model === 'max') {
        if (value.length > parseInt(len, 10)) {
          jquery(obj).parent().find('.error:first').html(`不能超过 ${len} 个字符`);
          return;
        }
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    case 'port':
      if (isEmpty(value)) {
        jquery(obj).parent().find('.error:first').html('必填');
        return;
      }
      if (getFlag('port', value) === undefined) {
        jquery(obj).parent().find('.error:first').html('没有找到对应选项');
        return;
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    case 'portcode':
      if (isEmpty(value)) {
        jquery(obj).parent().find('.error:first').html('必填');
        return;
      }
      if (getFlag('portcode', value) === undefined) {
        jquery(obj).parent().find('.error:first').html('没有找到对应选项');
        return;
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    case 'trafWay':
      if (isEmpty(value)) {
        jquery(obj).parent().find('.error:first').html('必填');
        return;
      }
      if (getFlag('trafWay', value) === undefined) {
        jquery(obj).parent().find('.error:first').html('没有找到对应选项');
        return;
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    case 'wrapTypeCode':
      if (isEmpty(value)) {
        jquery(obj).parent().find('.error:first').html('必填');
        return;
      }
      if (getFlag('wrapTypeCode', value) === undefined) {
        jquery(obj).parent().find('.error:first').html('没有找到对应选项');
        return;
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    case 'country':
      if (isEmpty(value)) {
        jquery(obj).parent().find('.error:first').html('必填');
        return;
      }
      if (getFlag('country', value) === undefined) {
        jquery(obj).parent().find('.error:first').html('没有找到对应选项');
        return;
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    case 'countrynoEmpty':
      if (!isEmpty(value) && getFlag('country', value) === undefined) {
        jquery(obj).parent().find('.error:first').html('没有找到对应选项');
        return;
      }
      jquery(obj).parent().find('.error:first').html('');
      return;
    default:
      return;
  }
}

function getValuePersonel(obj) {
  let type = obj.getAttribute('data-info');
  const value = obj.value;
  let len;
  let model;
  if (type.indexOf('length') > -1) {
    const temp = type;
    type = type.split(':')[0];
    model = temp.split(':')[1];
    len = temp.split(':')[2];
  }
  if (type.indexOf('num.') > -1) {
    const temp = type;
    type = type.split('.')[0] + '.';
    len = temp.split('.')[1];
  }
  switch (type) {
    case 'no':
      return true;
    case 'empty':
      if (value === '') {
        text = '必填';
        return false;
      }
      return true;
    case 'length':
      if (isEmpty(value)) {
        text = '必填';
        return false;
      }
      if (model === 'min') {
        if (value.length < parseInt(len, 10)) {
          text = `至少 ${len} 个字符`;
          return false;
        }
      }
      if (model === 'max') {
        if (value.length > parseInt(len, 10)) {
          text = `不能超过 ${len} 个字符`;
          return false;
        }
      }
      return true;
    case 'country':
      if (isEmpty(value)) {
        text = '必填';
        return false;
      }
      if (getFlag('country', value) === undefined) {
        text = '没有找到对应选项';
        return false;
      }
      return true;
    case 'unit':
      if (isEmpty(value)) {
        text = '必填';
        return false;
      }
      if (getFlag('unit', value) === undefined) {
        text = '没有找到对应选项';
        return false;
      }
      return true;
    case 'num':
      if (isEmpty(value)) {
        text = '必填';
        return false;
      }
      if (/^[0-9]*$/.test(value) === false) {
        text = '必须是整数';
        return false;
      }
      return true;
    case 'num.':
      if (isEmpty(value)) {
        text = '必填';
        return false;
      }
      if (/^\d+(\.\d+)?$/.test(value) === false) {
        text = '必须是整数或小数';
        return false;
      }
      if (value.split('.')[1] && value.split('.')[1].length > 4) {
        text = '小数部分不能超过四位';
        return false;
      }
      if (value.length > len) {
        text = `不能超过 ${len} 个字符`;
        return false;
      }
      return true;
    case 'flag':
      if (isEmpty(value)) {
        text = '必填';
        return false;
      }
      if (getFlag('Flag', value) === undefined) {
        text = '没有找到对应选项';
        return false;
      }
      return true;
    default:
      return true;
  }
}

export function subValidations(place) {
  jquery(place).find('input').each((index, el) => {
    getValue(el);
  });
}

function check(obj) {
  const iLeft = jquery(obj).parent().position().left + 35;
  const iTop = jquery(obj).parent().position().top - 30;
  if (getValuePersonel(obj) === false) {
    if (jquery('#' + obj.name + obj.id).length === 0) {
      jquery(obj).css('border', '1px solid #fb4b53');
      jquery('#warn').after('<div class="smalltib" id="' + obj.name + obj.id + '">' +
                              '<span>' + text + '</span>' +
                            '</div>');
      const node = jquery('#warn').next();
      node.css({ 'left': iLeft });
      node.css({ 'top': iTop });
      jquery(obj).hover(function on() {
        node.show();
      },
      function out() {
        node.hide();
      });
    }
  } else {
    if (jquery(obj).id % 2 === 0) {
      jquery(obj).css('border', '1px solid white');
    } else {
      jquery(obj).css('border', '1px solid #f9f9f9');
    }
    if (jquery('#' + obj.name + obj.id).length > 0) jquery('#' + obj.name + obj.id).remove();
  }
}

export function perValidations(place) {
  jquery(place).find('input').each((index, el) => {
    check(el);
  });
}

export function rpValidations(obj) {
  check(obj);
}

export function runValidations(obj) {
  getValue(obj);
}

export function checkStatus(place) {
  let flag = true;
  jquery(place).parents('sjmcinput').find('span').each((index, el) => {
    if (!isEmpty(jquery(el).html())) {
      return (flag = false);
    }
  });
  return flag;
}

export function checkSpanStatus(place) {
  let flag = true;
  jquery(place).each((index, el) => {
    if (!isEmpty(jquery(el).find('.pd').find('.pada').find('span').html())) {
      return (flag = false);
    }
  });
  return flag;
}


export function checkStatusPer() {
  let flag = true;
  if (jquery('.smalltib').length > 0) {
    return (flag = false);
  }
  return flag;
}

export function clearValidations(place) {
  jquery(place).find('i').each((index, el) => {
    jquery(el).html('');
  });
}
