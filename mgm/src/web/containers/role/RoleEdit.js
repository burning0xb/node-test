import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Modal, Input } from 'antd';
import * as actions from 'redux/modules/role';
import { asyncConnect } from 'redux-async-connect';
import jquery from 'jquery';

const confirm = Modal.confirm;
const authoritys = ['sysManage', 'userManage', 'roleManage', 'logManagement', 'exhibit', 'awardTrace', 'awardSearch', 'content', 'messManage', 'materialManage', 'bill', 'tradeSearch', 'billCount', 'billChk', 'com', 'wechatManage', 'comGroup'];
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    const promises = [];
    promises.push(dispatch(actions.getRole()));
    promises.push(dispatch(actions.getRoleName()));
    return Promise.all(promises);
  }
}])
class RoleEdit extends Component {
  static propTypes = {
    getRole: PropTypes.func.isRequired,
    roleInfo: PropTypes.object,
    updateRole: PropTypes.func.isRequired,
    getauth: PropTypes.func.isRequired,
    pushState: PropTypes.func,
    getRoleName: PropTypes.func.isRequired,
    removeRole: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    roleName: PropTypes.object,
    addRole: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    // 默认显示第一个角色
    this.state = {
      roleId: this.props.roleInfo.role[0].roleId,
      roleName: this.props.roleInfo.role[0].roleName,
      authority: this.props.roleInfo.role[0].authority
    };
  }

  componentWillMount() {
    this.initAuthority(0);
  }

  componentDidMount() {
    jquery('.js_l_dw').perfectScrollbar();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.roleInfo) {
      this.setState({
        roleId: nextProps.roleInfo.role[0].roleId,
        roleName: nextProps.roleInfo.role[0].roleName,
        authority: nextProps.roleInfo.role[0].authority
      });
    }
    if (nextProps.delete === true) {
      this.props.clear();
      this.success(() => { this.props.pushState('/ma/roleEdit'); });
    }
  }

  handleSelect(event) {
    const index = event.target.selectedIndex;
    const roleInfo = this.props.roleInfo.role[index];
    this.setState({
      roleId: roleInfo.roleId,
      roleName: roleInfo.roleName,
      authority: roleInfo.authority
    });
  }

  success(pushState) {
    Modal.success({
      title: 'This is a success message',
      content: '删除成功',
      onOk() {
        if (pushState) pushState();
      }
    });
  }

  info(info, func) {
    Modal.info({
      title: info,
      onOk() {
        if (func) func();
      },
    });
  }

  addRolesuccess(pushState) {
    Modal.success({
      title: 'This is a success message',
      content: '添加成功',
      onOk() {
        if (pushState) pushState();
      }
    });
  }

  error() {
    Modal.error({
      title: '请输入角色名称',
    });
  }

  showConfirm() {
    const func = () => { this.props.removeRole(this.state.roleId); };
    confirm({
      title: '确定删除该角色吗？',
      onOk() {
        func();
      },
      onCancel() {},
    });
  }

  changeRoleName(event) {
    this.setState({roleId: event.target.value});
  }

  sysManage() {
    this.setState({ sysManage: !this.state.sysManage });
    if (this.state.sysManage !== true) {
      this.setState({ userManage: true, roleManage: true, logManagement: true });
    } else {
      this.setState({ userManage: false, roleManage: false, logManagement: false });
    }
  }

  exhibit() {
    this.setState({ exhibit: !this.state.exhibit });
    if (this.state.exhibit !== true) {
      this.setState({ awardTrace: true, awardSearch: true });
    } else {
      this.setState({ awardTrace: false, awardSearch: false });
    }
  }

  content() {
    this.setState({ content: !this.state.content });
    if (this.state.content !== true) {
      this.setState({ messManage: true, materialManage: true });
    } else {
      this.setState({ messManage: false, materialManage: false });
    }
  }

  bill() {
    this.setState({ bill: !this.state.bill });
    if (this.state.bill !== true) {
      this.setState({ tradeSearch: true, billCount: true, billChk: true });
    } else {
      this.setState({ tradeSearch: false, billCount: false, billChk: false });
    }
  }

  com() {
    this.setState({ com: !this.state.com });
    if (this.state.com !== true) {
      this.setState({ wechatManage: true, comGroup: true });
    } else {
      this.setState({ wechatManage: false, comGroup: false });
    }
  }

  chk(authority) {
    this.setState({ [authority]: !this.state[authority] });
    switch (authority) {
      case 'userManage':
        if (!this.state.userManage && this.state.roleManage && this.state.logManagement) {this.setState({ sysManage: true });} else {this.setState({ sysManage: false });}
        break;
      case 'roleManage':
        if (this.state.userManage && !this.state.roleManage && this.state.logManagement) {this.setState({ sysManage: true });} else {this.setState({ sysManage: false });}
        break;
      case 'logManagement':
        if (this.state.userManage && this.state.roleManage && !this.state.logManagement) {this.setState({ sysManage: true });} else {this.setState({ sysManage: false });}
        break;
      case 'awardTrace':
        if (!this.state.awardTrace && this.state.awardSearch) {this.setState({ exhibit: true });} else {this.setState({ exhibit: false });}
        break;
      case 'awardSearch':
        if (this.state.awardTrace && !this.state.awardSearch) {this.setState({ exhibit: true });} else {this.setState({ exhibit: false });}
        break;
      case 'messManage':
        if (!this.state.messManage && this.state.materialManage) {this.setState({ content: true });} else {this.setState({ content: false });}
        break;
      case 'materialManage':
        if (this.state.messManage && !this.state.materialManage) {this.setState({ content: true });} else {this.setState({ content: false });}
        break;
      case 'tradeSearch':
        if (!this.state.tradeSearch && this.state.billCount && this.state.billChk) {this.setState({ bill: true });} else {this.setState({ bill: false });}
        break;
      case 'billCount':
        if (this.state.tradeSearch && !this.state.billCount && this.state.billChk) {this.setState({ bill: true });} else {this.setState({ bill: false });}
        break;
      case 'billChk':
        if (this.state.tradeSearch && this.state.billCount && !this.state.billChk) {this.setState({ bill: true });} else {this.setState({ bill: false });}
        break;
      case 'wechatManage':
        if (!this.state.wechatManage && this.state.comGroup) {this.setState({ com: true });} else {this.setState({ com: false });}
        break;
      case 'comGroup':
        if (this.state.wechatManage && !this.state.comGroup) {this.setState({ com: true });} else {this.setState({ com: false });}
        break;
      default:
        break;
    }
  }

  initAuthority(index) {
    authoritys.map((key) => {
      this.setState({ [key]: false });
    });
    this.props.roleInfo.role[index].authority.map((key) => {
      this.setState({ [key]: true });
    });
  }

  addRole() {
    this.props.addRole({roleName: document.getElementById('roleName').value}, () => {
      this.setState({ visible: false });
      this.addRolesuccess(() => {this.props.pushState('/ma/roleEdit');});
    });
  }

  handleOk(func, addRole) {
    if (document.getElementById('roleName').value === '') {
      if (func) func();
    } else {
      if (addRole) addRole();
    }
  }

  addAuthority() {
    const auths = [];
    authoritys.map((key) => {
      if (this.state[key] === true) {
        auths.push(key);
      }
    });
    const filter = {
      roleId: this.state.roleId,
      roleName: this.state.roleName,
      authority: auths
    };
    this.props.updateRole(filter, (info) => {
      this.info(info, () => { this.props.pushState('/ma/roleEdit'); });
    });
  }

  render() {
    return (
      <div>
        <Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk.bind(this, () => { this.error(); }, () => { this.addRole(); })} onCancel={() => { this.setState({visible: false}); }}>
          <Input placeholder="请输入角色名称" id="roleName"/>
        </Modal>
        <div className="dyh5">
          <span className="biaoti">修改角色信息</span>
        </div>
        <div style={{ clear: 'both' }}></div>
        <div className="js_age">
          <div className="js_l">
            <div className="js_l_top">
              <div className="js_l_top_l"><img src="../../../../assets/images/jslb.png"/><span>角色列表</span></div>
              <div className="js_l_top_r" onClick={() => { this.setState({visible: true}); }}><img src="../../../../assets/images/tianjia.png"/></div>
            </div>
            <div className="js_l_dw">
              <div className="wuxian">
                {
                  this.props.roleInfo.role && this.props.roleInfo.role.length > 0 ?
                  this.props.roleInfo.role.map((key, value) => (
                    <div className="jslb_ml" key={value} style={{ borderBottom: (value + 1) === this.props.roleInfo.role.length ? 'none' : '1px solid #e6ecef' }}>
                      <div className="ygjs">
                        <div className="gly">
                          <div className="inout">
                            <div className="select select-zhong" style={{ left: '-15px', marginTop: '29px' }}>
                              <div className="selected-box"><span className="ab">{key.roleName}</span></div>
                            </div>
                          </div>
                        </div>
                        <div className="fg_l"><img src="../../../../assets/images/fg_l.png"/></div>
                        <div className="ids"><span className="aa">ID</span>
                          <div className="inout">
                            <div className="select select-zhong1" style={{ left: '-15px', marginTop: '29px' }}>
                              <div className="selected-box"><span className="ab1">{key.roleId}</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="qxlb"><span className="ckqx" onClick={this.showConfirm.bind(this)}>删除</span>
                        <div className="fg"><img src="../../../../assets/images/fengexian.png"/></div><span className="sc" onClick={() => { this.setState({ roleId: key.roleId, roleName: key.roleName }); this.initAuthority(value); }}>查看权限</span></div>
                    </div>
                  )) : ''
                }
              </div>
            </div>
          </div>
          <div className="js_r">
            <div className="js_l_top">
              <div className="js_l_top_l"><img src="../../../../assets/images/xgqx.png"/><span>修改角色权限</span></div>
              <div className="js_l_top_r"><input type="submit" value="提交" onClick={this.addAuthority.bind(this)}/></div>
            </div>
            <div className="js_r_dw">
              <ul>
                <li>
                  <div className="zong" style={{ background: this.state.sysManage ? 'rgb(35, 168, 108)' : 'none' }}>
                    <div className={ this.state.sysManage ? 'anniu mn' : 'anniu' } onClick={this.sysManage.bind(this)}><img src={'../../../../assets/images/' + (this.state.sysManage ? '5yccd_js_lv.png' : '5yccd_js_hui.png')}/></div>
                    <div className="yiji" style={{ color: this.state.sysManage ? 'rgb(255, 255, 255)' : 'rgb(120, 144, 156)' }} onClick={() => { this.setState({ sysManageShow: !this.state.sysManageShow }); }}><img src={'../../../../assets/images/' + (this.state.sysManage ? 'xtgl_ml_bai.png' : 'xtgl_ml.png')}/><span>系统管理</span></div>
                  </div>
                  <div className="erji" style={{ display: this.state.sysManageShow ? 'block' : 'none' }}>
                    <ul>
                      <li className={this.state.userManage ? 'lo' : ''} style={{ borderRight: this.state.userManage ? '3px solid rgb(255, 202, 40)' : 'none' }} onClick={() => { this.chk('userManage');}}>
                        <div className="li_l"></div>
                        <div className={this.state.userManage ? 'li_r huang' : 'li_r' }><img src={'../../../../assets/images/' + (this.state.userManage ? '5yccd_js_huang.png' : '5yccd_js_hui.png')}/><span>系统用户管理</span></div>
                      </li>
                      <li className={this.state.roleManage ? 'lo' : ''} style={{ borderRight: this.state.roleManage ? '3px solid rgb(255, 202, 40)' : 'none' }} onClick={() => { this.chk('roleManage'); }}>
                        <div className="li_l"></div>
                        <div className={this.state.roleManage ? 'li_r huang' : 'li_r' }><img src={'../../../../assets/images/' + (this.state.roleManage ? '5yccd_js_huang.png' : '5yccd_js_hui.png')}/><span>权限管理</span></div>
                      </li>
                      <li className={this.state.logManagement ? 'lo' : ''} style={{ borderRight: this.state.logManagement ? '3px solid rgb(255, 202, 40)' : 'none' }} onClick={() => { this.chk('logManagement'); }}>
                        <div className="li_l"></div>
                        <div className={this.state.logManagement ? 'li_r huang' : 'li_r' }><img src={'../../../../assets/images/' + (this.state.logManagement ? '5yccd_js_huang.png' : '5yccd_js_hui.png')}/><span>日志管理</span></div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="zong" style={{ background: this.state.exhibit ? 'rgb(35, 168, 108)' : 'none' }}>
                    <div className={ this.state.exhibit ? 'anniu mn' : 'anniu' } onClick={this.exhibit.bind(this)}><img src={'../../../../assets/images/' + (this.state.exhibit ? '5yccd_js_lv.png' : '5yccd_js_hui.png')}/></div>
                    <div className="yiji" style={{ color: this.state.exhibit ? 'rgb(255, 255, 255)' : 'rgb(120, 144, 156)' }} onClick={() => { this.setState({ exhibitShow: !this.state.exhibitShow }); }}><img src={'../../../../assets/images/' + (this.state.exhibit ? 'clgl_ml_bai.png' : 'clgl_ml1.png')}/><span>陈列管理</span></div>
                  </div>
                  <div className="erji" style={{ display: this.state.exhibitShow ? 'block' : 'none' }}>
                    <ul>
                      <li className={this.state.awardTrace ? 'lo' : ''} style={{ borderRight: this.state.awardTrace ? '3px solid rgb(255, 202, 40)' : 'none' }} onClick={() => { this.chk('awardTrace');}}>
                        <div className="li_l"></div>
                        <div className={this.state.awardTrace ? 'li_r huang' : 'li_r' }><img src={'../../../../assets/images/' + (this.state.awardTrace ? '5yccd_js_huang.png' : '5yccd_js_hui.png')}/><span>奖励跟踪</span></div>
                      </li>
                      <li className={this.state.awardSearch ? 'lo' : ''} style={{ borderRight: this.state.awardSearch ? '3px solid rgb(255, 202, 40)' : 'none' }} onClick={() => { this.chk('awardSearch'); }}>
                        <div className="li_l"></div>
                        <div className={this.state.awardSearch ? 'li_r huang' : 'li_r' }><img src={'../../../../assets/images/' + (this.state.awardSearch ? '5yccd_js_huang.png' : '5yccd_js_hui.png')}/><span>奖励查询</span></div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="zong" style={{ background: this.state.content ? 'rgb(35, 168, 108)' : 'none' }}>
                    <div className={ this.state.content ? 'anniu mn' : 'anniu' } onClick={this.content.bind(this)}><img src={'../../../../assets/images/' + (this.state.content ? '5yccd_js_lv.png' : '5yccd_js_hui.png')}/></div>
                    <div className="yiji" style={{ color: this.state.content ? 'rgb(255, 255, 255)' : 'rgb(120, 144, 156)' }} onClick={() => { this.setState({ contentShow: !this.state.contentShow }); }}><img src={'../../../../assets/images/' + (this.state.content ? 'nrgl_ml_bai.png' : 'nrgl_ml.png')}/><span>内容管理</span></div>
                  </div>
                  <div className="erji" style={{ display: this.state.contentShow ? 'block' : 'none' }}>
                    <ul>
                      <li className={this.state.messManage ? 'lo' : ''} style={{ borderRight: this.state.messManage ? '3px solid rgb(255, 202, 40)' : 'none' }} onClick={() => { this.chk('messManage');}}>
                        <div className="li_l"></div>
                        <div className={this.state.messManage ? 'li_r huang' : 'li_r' }><img src={'../../../../assets/images/' + (this.state.messManage ? '5yccd_js_huang.png' : '5yccd_js_hui.png')}/><span>消息管理</span></div>
                      </li>
                      <li className={this.state.materialManage ? 'lo' : ''} style={{ borderRight: this.state.materialManage ? '3px solid rgb(255, 202, 40)' : 'none' }} onClick={() => { this.chk('materialManage'); }}>
                        <div className="li_l"></div>
                        <div className={this.state.materialManage ? 'li_r huang' : 'li_r' }><img src={'../../../../assets/images/' + (this.state.materialManage ? '5yccd_js_huang.png' : '5yccd_js_hui.png')}/><span>素材查询</span></div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="zong" style={{ background: this.state.bill ? 'rgb(35, 168, 108)' : 'none' }}>
                    <div className={ this.state.bill ? 'anniu mn' : 'anniu' } onClick={this.bill.bind(this)}><img src={'../../../../assets/images/' + (this.state.bill ? '5yccd_js_lv.png' : '5yccd_js_hui.png')}/></div>
                    <div className="yiji" style={{ color: this.state.bill ? 'rgb(255, 255, 255)' : 'rgb(120, 144, 156)' }} onClick={() => { this.setState({ billShow: !this.state.billShow }); }}><img src={'../../../../assets/images/' + (this.state.bill ? 'zdgl_ml_bai.png' : 'zdgl_ml.png')}/><span>账单管理</span></div>
                  </div>
                  <div className="erji" style={{ display: this.state.billShow ? 'block' : 'none' }}>
                    <ul>
                      <li className={this.state.tradeSearch ? 'lo' : ''} style={{ borderRight: this.state.tradeSearch ? '3px solid rgb(255, 202, 40)' : 'none' }} onClick={() => { this.chk('tradeSearch');}}>
                        <div className="li_l"></div>
                        <div className={this.state.tradeSearch ? 'li_r huang' : 'li_r' }><img src={'../../../../assets/images/' + (this.state.tradeSearch ? '5yccd_js_huang.png' : '5yccd_js_hui.png')}/><span>交易查询</span></div>
                      </li>
                      <li className={this.state.billCount ? 'lo' : ''} style={{ borderRight: this.state.billCount ? '3px solid rgb(255, 202, 40)' : 'none' }} onClick={() => { this.chk('billCount'); }}>
                        <div className="li_l"></div>
                        <div className={this.state.billCount ? 'li_r huang' : 'li_r' }><img src={'../../../../assets/images/' + (this.state.billCount ? '5yccd_js_huang.png' : '5yccd_js_hui.png')}/><span>账单统计</span></div>
                      </li>
                      <li className={this.state.billChk ? 'lo' : ''} style={{ borderRight: this.state.billChk ? '3px solid rgb(255, 202, 40)' : 'none' }} onClick={() => { this.chk('billChk'); }}>
                        <div className="li_l"></div>
                        <div className={this.state.billChk ? 'li_r huang' : 'li_r' }><img src={'../../../../assets/images/' + (this.state.billChk ? '5yccd_js_huang.png' : '5yccd_js_hui.png')}/><span>对账单管理</span></div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="zong" style={{ background: this.state.com ? 'rgb(35, 168, 108)' : 'none' }}>
                    <div className={ this.state.com ? 'anniu mn' : 'anniu' } onClick={this.com.bind(this)}><img src={'../../../../assets/images/' + (this.state.com ? '5yccd_js_lv.png' : '5yccd_js_hui.png')}/></div>
                    <div className="yiji" style={{ color: this.state.com ? 'rgb(255, 255, 255)' : 'rgb(120, 144, 156)' }} onClick={() => { this.setState({ comShow: !this.state.comShow }); }}><img src={'../../../../assets/images/' + (this.state.com ? 'shgl_ml_bai.png' : 'shgl_ml.png')}/><span>商户管理</span></div>
                  </div>
                  <div className="erji" style={{ display: this.state.comShow ? 'block' : 'none' }}>
                    <ul>
                      <li className={this.state.wechatManage ? 'lo' : ''} style={{ borderRight: this.state.wechatManage ? '3px solid rgb(255, 202, 40)' : 'none' }} onClick={() => { this.chk('wechatManage');}}>
                        <div className="li_l"></div>
                        <div className={this.state.wechatManage ? 'li_r huang' : 'li_r' }><img src={'../../../../assets/images/' + (this.state.wechatManage ? '5yccd_js_huang.png' : '5yccd_js_hui.png')}/><span>微信用户管理</span></div>
                      </li>
                      <li className={this.state.comGroup ? 'lo' : ''} style={{ borderRight: this.state.comGroup ? '3px solid rgb(255, 202, 40)' : 'none' }} onClick={() => { this.chk('comGroup'); }}>
                        <div className="li_l"></div>
                        <div className={this.state.comGroup ? 'li_r huang' : 'li_r' }><img src={'../../../../assets/images/' + (this.state.comGroup ? '5yccd_js_huang.png' : '5yccd_js_hui.png')}/><span>商户分组</span></div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  ({ role }) => ({ ...role }),
  { ...actions, pushState: push }
)(RoleEdit);
