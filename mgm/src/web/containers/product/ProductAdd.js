import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { clearValidations, subValidations, checkStatus } from '../../../web/utils/validations.js';
import { Modal } from 'antd';
import { getStatus } from '../../utils/status';
import * as actions from '../../../redux/modules/user';
class ProductAdd extends Component {

  static propTypes = {
    pushState: React.PropTypes.func.isRequired,
    goBack: React.PropTypes.func.isRequired,
    getRole: React.PropTypes.func.isRequired,
    user: React.PropTypes.object,
    addUser: React.PropTypes.func.isRequired,
    clearUser: React.PropTypes.func.isRequired,
    roleInfo: React.PropTypes.array
  };
  constructor(props) {
    super(props);
    this.state = {
      selected: {
        0: 'option selected',
        1: 'option'
      },
      status: 'A'
    };
  }
  componentWillMount() {
    this.props.getRole();
  }
  componentWillReceiveProps(nextProps) {
    if (this.state !== nextProps.roleInfo) {
      this.setState({ ...nextProps.roleInfo });
    }
  }
  componentWillUnmount() {
    this.props.clearUser();
  }
  info(info, func) {
    Modal.info({
      title: 'message info',
      content: info,
      onOk() {
        if (func) func();
      },
    });
  }
  handleSubmit() {
    const data = { };
    data.name = this.refs.username.value;
    data.password = this.refs.password.value;
    data.pwdTries = this.refs.pwdTries.value;
    data.status = this.state.status;
    clearValidations('.gg_xx_l');
    subValidations('.gg_xx_l');
    if (checkStatus('.gg_xx_l') === true) {
      this.props.addUser(data, (info) => { this.info(info, () => {this.props.pushState('/ma/product');}); });
    }
  }
  render() {
    return (
      <div>
        <link rel="stylesheet" href="/assets/css/xgyhjs.css" />
        <div className="dyh4">
          <span className="biaoti">新增用户</span>
          <div className="sousu4">
            <input type="submit" defaultValue="删除" />
          </div>
          <div className="sousu4">
            <input type="submit" defaultValue="提交" onClick={this.handleSubmit.bind(this)}/>
          </div>
        </div>
        <div style={{ clear: 'both' }}></div>
        <div className="yhoxx">
          <div className="yh_jiben">
            <div className="yh_jb_top">
              <div className="yh_jb_top_l"><img src="../../../../assets/images/jbxx_ml.png" /><span>基本信息</span></div>
            </div>
            <div className="yh_jb_dw">
              <div className="gg_xx">
                <div className="gg_xx_l"><span className="txx">用户名：</span><span className="zjbjj" style={{ fontFamily: 'Helvetica' }}><input type="text" data-info="password" ref="username"/><i className="error"></i></span></div>
                <div className="gg_xx_r"><span className="czz">重置</span></div>
              </div>
              <div className="gg_xx">
                <div className="gg_xx_l"><span className="txx">密码：</span><span className="zjbjj"><input data-info="password" type="password" ref="password"/><i className="error"></i></span></div>
                <div className="gg_xx_r"><span className="czz">重置</span></div>
              </div>
              <div className="gg_xx">
                <div className="gg_xx_l"><span className="txx">密码尝试次数：</span><span className="zjbjj" style={{ fontFamily: 'Helvetica' }}><input data-info="no" type="num" ref="pwdTries"/></span></div>
              </div>
              <div className="gg_xx" style={{borderBottom: 'none'}}>
                <div className="gg_xx_l">
                  <span className="txx">修改角色：</span>
                  <span className="zjbjj">
                    <div className="inout" onClick={() => { this.setState({ select: !this.state.select }); }}>
                      <div className="select select-zhong">
                      <div className="selected-box" style={{ border: 'none' }}><span ref="status" name="roleId" className="ab">{getStatus('userState', this.state.status)}</span></div>
                      <div className="xljt_js"><img src="../../../../../assets/images/xl_wxz_hui	.png"/></div>
                        <ul className="option-box option-box-zhong" style={{ width: '159px', top: '-1', display: this.state.select ? 'block' : 'none' }}>
                          <div className="gdt_ml">
                            <li className={this.state.selected[0]} onClick={() => { this.setState({ select: false, status: 'A', selected: {} }); this.setState({ selected: {0: 'option selected', 1: 'option'} });}}><span>活跃</span></li>
                            <li className={this.state.selected[1]} onClick={() => { this.setState({ select: false, status: 'L', selected: {} }); this.setState({ selected: {0: 'option', 1: 'option selected'} });}}><span>锁定</span></li>
                          </div>
                        </ul>
                    </div>
                    <div className="jt_top" style={{ display: this.state.selected ? 'block' : 'none' }}></div>
                  </div>
               </span>
               </div>
              </div>
              {/* <div className="gg_xx" style={{ borderBottom: 'none' }}>
                <div className="gg_xx_l"><span className="txx">状态：</span>
                  <span className="zjbjj">
                    <div className="inout"><img src={ this.state.select === true ? '../../../../assets/images/select_bg1.png' : '../../../../assets/images/select_bg.png' }/>
                    <div className="select select-zhong">
                    <div className="selected-box" onClick={() => { this.setState({ select: true }); }}><span ref="status">{getStatus('userState', this.state.status)}</span></div>
                <ul className="option-box option-box-zhong" style={{ display: this.state.select === true ? 'block' : 'none'}}>
                  <li className={this.state.selected[0]} onClick={()=> { this.setState({ select: false, status: 'A', selected: {} }); this.setState({ selected: {0: 'option selected', 1: 'option'} });}}><span>活跃</span></li>
                  <li className={this.state.selected[1]} onClick={()=> { this.setState({ select: false, status: 'L', selected: {} }); this.setState({ selected: {0: 'option', 1: 'option selected'} });}}><span>锁定</span></li>
                </ul>
              </div>
              <div className="jt_top" style={{display: this.state.select === true ? 'block' : 'none'}}></div>
            </div>
            </span>
          </div>
        </div>*/}
      </div>
    </div>
    </div>
    </div>
    );
  }
}

export default connect(
  ({ user }) => ({ ...user }),
  { ...actions, pushState: push, goBack }
)(ProductAdd);
