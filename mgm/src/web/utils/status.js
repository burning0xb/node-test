const comType = {
  'E0': '电商',
  'E1': '物流',
  'E2': '货代'
};

const userState = {
  'A': '活跃',
  'L': '锁定',
  '': '全部'
};

const Flag = {
  'Y': '是',
  'N': '否'
};

const userStatus = {
  'N': '新增',
  'A': '活跃',
  'L': '锁定'
};
const apprStatus = {
  'P': '审批通过',
  'R': '审批拒绝'
};
const wechatStatus = {
  'Y': '已绑定启用',
  'N': '暂未绑定停用'
};
const confirmStatus = {
  'A': '确认中',
  'B': '已确认'
};
const messageType = {
  'M0': '文本消息',
  'M1': '单图文消息',
  'M2': '单图文消息'
};
const isSend = {
  'Y': '已发送',
  'N': '未发送'
};
const rewardType = {
  'online': '微信支付',
  'offline': '银行卡支付'
};
const tradeType = {
  'O': '出账',
  'I': '入账'
};

const sendScope = {
  'S0': '全部',
  'S1': '华东',
  'S2': '华南',
  'S3': '华中',
  'S4': '华北',
  'S5': '西南',
  'S6': '东北',
  'S7': '港澳台'
};

const relationType = {
  'R0': '文本消息',
  'R1': '单图文消息',
  'R2': '多图文消息'
};
const operationUserType = {
  'U': '用户',
  'M': '管理员'
};
const openationType = {
  'LOGIN': '登陆',
  'REWARD': '发放奖励'
};
const optionsType = {
  'EVENT_TYPE_SUBSCRIBE': '关注事件',
  'EVENT_TYPE_UNSUBSCRIBE': '取消关注事件',
  'EVENT_TYPE_SCAN': '扫描二维码事件',
  'EVENT_TYPE_LOCATION': '位置上报事件',
  'EVENT_TYPE_CLICK': '自定义菜单点击事件',
  'EVENT_TYPE_VIEW': '自定义菜单 View 事件',
  'REQ_MESSAGE_TYPE_TEXT': '文本消息',
  'REQ_MESSAGE_TYPE_IMAGE': '图片消息',
  'REQ_MESSAGE_TYPE_LINK': '链接消息',
  'REQ_MESSAGE_TYPE_LOCATION': '位置消息',
  'REQ_MESSAGE_TYPE_VIDEO': '视频消息',
  'REQ_MESSAGE_TYPE_VOICE': '语音消息'
};

const payStatus = {
  'P': '待支付',
  'C': '支付完成',
  'E': '支付异常'
};

const rewardStatus = {
  'S0': '活动执行中',
  'S1': '照片不合格',
  'S2': '奖励发放中',
  'S3': '已完成'
};

export function getStatus(flag, info) {
  switch (flag) {
    case 'rewardType':
      return rewardType[info];
    case 'rewardStatus':
      return rewardStatus[info];
    case 'isSend':
      return isSend[info];
    case 'comType':
      return comType[info];
    case 'userState':
      return userState[info];
    case 'wechatStatus':
      return wechatStatus[info];
    case 'Flag':
      return Flag[info];
    case 'userStatus':
      return userStatus[info];
    case 'apprStatus':
      return apprStatus[info];
    case 'confirmStatus':
      return confirmStatus[info];
    case 'messageType':
      return messageType[info];
    case 'tradeType':
      return tradeType[info];
    case 'relationType':
      return relationType[info];
    case 'payStatus':
      return payStatus[info];
    case 'optionsType':
      return optionsType[info];
    case 'operationUserType':
      return operationUserType[info];
    case 'openationType':
      return openationType[info];
    case 'sendScope':
      return sendScope[info];
    default:
  }
}

function getKey(json, info) {
  let js = '';
  for (js in json) {
    if (js !== '') {
      if (json[js] === info) {
        return js;
      }
    }
  }
}

export function getFlag(flag, info) {
  switch (flag) {
    case 'rewardType':
      return getKey(rewardType, info);
    case 'userState':
      return getKey(userState, info);
    case 'Flag':
      return getKey(Flag, info);
    case 'userStatus':
      return getKey(userStatus, info);
    case 'apprStatus':
      return getKey(apprStatus, info);
    case 'messageType':
      return getKey(messageType, info);
    case 'confirmStatus':
      return confirmStatus(apprStatus, info);
    case 'tradeType':
      return getKey(tradeType, info);
    case 'relationType':
      return getKey(relationType, info);
    case 'payStatus':
      return getKey(payStatus, info);
    case 'rewardStatus':
      return getKey(rewardStatus, info);
    case 'optionsType':
      return getKey(optionsType, info);
    case 'operationUserType':
      return getKey(operationUserType, info);
    case 'openationType':
      return getKey(openationType, info);
    case 'sendScope':
      return getKey(sendScope, info);
    default:
  }
}

export function getJson(flag) {
  switch (flag) {
    case 'userState':
      return userState;
    case 'Flag':
      return Flag;
    default:
  }
}
