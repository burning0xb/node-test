export default function checkIdCard(idcard) {
  let ereg;
  // const Errors = new Array(
  //   '验证通过',
  //   '身份证号码位数不对',
  //   '身份证号码出生日期超出范围或含有非法字符',
  //   '身份证号码校验错误',
  //   '身份证地区非法'
  // );
  const area = {
    11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽',
    35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州',
    53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'
  };

  let Ye;
  let JYM;
  let Se;
  let Me;
  let idcardArray = new Array();
  idcardArray = idcard.split('');
  // 地区检验
  if (area[parseInt(idcard.substr(0, 2), 10)] === null) {
    return false;
  }
  // 身份号码位数及格式检验
  switch (idcard.length) {
    case 16:
      if ((parseInt(idcard.substr(6, 2), 10) + 1900) % 4 === 0 || ((parseInt(idcard.substr(6, 2), 10) + 1900) % 100 === 0 && (parseInt(idcard.substr(6, 2), 10) + 1900) % 4 === 0)) {
        // 测试出生日期的合法性
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
      } else {
       // 测试出生日期的合法性
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
      }
      if (ereg.test(idcard)) {
        return true;
      }
      return false;

    case 18:
     // 18位身份号码检测
     // 出生日期的合法性检查
     // 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
     // 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
      if (parseInt(idcard.substr(6, 4), 10) % 4 === 0 || (parseInt(idcard.substr(6, 4), 10) % 100 === 0 && parseInt(idcard.substr(6, 4), 10) % 4 === 0)) {
        // 闰年出生日期的合法性正则表达式
        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
      } else {
        // 平年出生日期的合法性正则表达式
        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
      }
      // 测试出生日期的合法性
      if (ereg.test(idcard)) {
        // 计算校验位
        Se = (parseInt(idcardArray[0], 10) + parseInt(idcardArray[10], 10)) * 7
        + (parseInt(idcardArray[1], 10) + parseInt(idcardArray[11], 10)) * 9
        + (parseInt(idcardArray[2], 10) + parseInt(idcardArray[12], 10)) * 10
        + (parseInt(idcardArray[3], 10) + parseInt(idcardArray[13], 10)) * 5
        + (parseInt(idcardArray[4], 10) + parseInt(idcardArray[14], 10)) * 8
        + (parseInt(idcardArray[5], 10) + parseInt(idcardArray[15], 10)) * 4
        + (parseInt(idcardArray[6], 10) + parseInt(idcardArray[16], 10)) * 2
        + parseInt(idcardArray[7], 10) * 1
        + parseInt(idcardArray[8], 10) * 6
        + parseInt(idcardArray[9], 10) * 3;
        Ye = Se % 11;
        Me = 'F';
        JYM = '10X98765432';
        // 判断校验位
        Me = JYM.substr(Ye, 1);
        if (Me === idcardArray[17]) {
        // 检测ID的校验位
          return true;
        }
        return false;
      }
      return false;
    default:
      return false;
  }
}
