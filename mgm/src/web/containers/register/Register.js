import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import OpenShow from 'web/components/OpenShow';
import { LinkContainer } from 'react-router-bootstrap';
import dataFormat from 'web/utils/DataFormat';
import * as storage from 'web/utils/browserStorage';
import { showMsg, closeMsg } from 'redux/modules/application';
import * as action from 'redux/modules/register';
// import { loan004 } from './investment/protocol';
let status = false;
let clicked = false;
let receiveReferrer = '';
const LOGIN_ID = 'loginId';
class Register extends Component {

  static propTypes = {
    register: PropTypes.object,
    location: PropTypes.object,
    application: PropTypes.object,
    showMsg: PropTypes.func.isRequired,
    closeMsg: PropTypes.func.isRequired,
    validators: PropTypes.func.isRequired,
    verificationCode: PropTypes.func.isRequired,
    regist: PropTypes.func.isRequired,
    chkInfo: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    suInfo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      perSelected: 'P',
      compSelected: undefined,
      display: undefined,
      mobile: undefined,
      // read: undefined,
      agree: 'A',
      userId: undefined,
      pwd: undefined,
      repwd: undefined,
      code: undefined,
      tel: undefined
    };
  }

  componentWillMount() {
    const currentLocation = this.props.location.query;
    receiveReferrer = currentLocation[LOGIN_ID];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.register) {
      if (nextProps.register.codeSuccess !== undefined) {
        if (status === false && clicked === true) {
          clicked = false;
          this.timeStart();
          const data = {
            mobile: this.refs.tel.value,
            type: 'SMS_RZ_1',
            loginId: ''
          };
          this.props.verificationCode(dataFormat(data));
          this.setState({ mobile: nextProps.register.codeSuccess });
        }
      }

      if (nextProps.register.allSuccess === 1) {
        const data = {
          mobile: this.refs.tel.value,
          loginId: this.refs.name.value,
          referrer: receiveReferrer,
          smsCode: this.refs.code.value,
          loginPwd: this.refs.pwd.value,
          type: this.state.perSelected === undefined ? 'P' : 'C'
        };
        this.props.regist(dataFormat(data));
      }
    }
  }

  componentDidUpdate() {
    if (this.props.register.userInfo) {
      if (this.props.register.userInfo.user) {
        this.refs.success.style.display = 'block';
        status = false;
        this.props.login(this.props.register.userInfo.user, storage);
      }
    }
  }

  getCode() {
    if (status === false) {
      clicked = true;
      this.props.validators(this.refs.name.value, this.refs.tel.value, '', '', '', 0);
    }
  }

  timeStart() {
    status = true;
    let sec = 10;
    this.refs.checkcode2.value = sec + '秒后重新获取';
    this.refs.checkcode2.style.display = 'block';
    this.refs.checkcode1.style.display = 'none';
    this.timer = setInterval(function Timer() {
      if (sec > 1) {
        sec = sec - 1;
        if (this.refs.checkcode2) {
          this.refs.checkcode2.value = sec + '秒后重新获取';
        }
      } else {
        clearInterval(this.timer);
        if (this.refs.checkcode2) {
          this.refs.checkcode2.value = '重新获取验证码';
        }
        status = false;
      }
    }.bind(this), 1000);
  }

  selected(sel) {
    if (sel === 'P') {
      this.setState({ perSelected: 'P', compSelected: undefined });
    } else if (sel === 'A') {
      if (this.state.agree) {
        this.setState({ agree: undefined });
      } else {
        this.setState({ agree: 'A' });
      }
    } else {
      this.setState({ perSelected: undefined, compSelected: 'C' });
    }
  }

  next() {
    if (this.state.agree) {
      this.props.validators(this.refs.name.value, this.refs.tel.value, this.refs.pwd.value, this.refs.pwd2.value, this.refs.code.value, 1);
    } else {
      this.props.chkInfo('请阅读圆达协议条款');
    }
  }

  /* read() {
    this.props.showMsg(loan004());
  }*/

  goHome() {
    this.refs.success.style.display = 'none';
    this.props.pushState(null, '/');
  }

  goBindCard() {
    this.refs.success.style.display = 'none';
    this.props.pushState(null, '/app/account/bindcard');
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
        <div className="wrap">
          <div className="money logo">
          </div>
          <div className="input">
            <div className="search-box clear">
            {this.state.userId ? <div className="input-icon login login fl"></div> : <div className="input-icon login-active fl"></div>}
              <input ref="name" type="text" className="search-inp fl" placeholder="请输入账号" name="userId" onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="search-box clear">
            {this.state.tel ? <div className="input-icon tel tel fl"></div> : <div className="input-icon tel tel-active fl"></div>}
              <input ref="tel" type="telephone" className="search-inp fl" placeholder="请输入手机号码" name="tel" onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="search-box clear">
            {this.state.pwd ? <div className="input-icon psw psw fl"></div> : <div className="input-icon psw psw-active fl"></div>}
              <input ref="pwd" type="password" className="search-inp fl" placeholder="请输入登陆密码" name="pwd" onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="search-box clear">
            {this.state.repwd ? <div className="input-icon psw psw fl"></div> : <div className="input-icon psw psw-active fl"></div>}
              <input ref="pwd2" type="password" className="search-inp fl" placeholder="请重复输入密码" name="repwd" onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="search-box clear">
            {this.state.code ? <div className="input-icon code code fl"></div> : <div className="input-icon code code-active fl"></div>}
              <input ref="code" type="text" className="search-inp tel-code-inp fl" placeholder="请输入验证码" name="code" onChange={this.handleChange.bind(this)}/>
              {this.state.tel ? <input ref="checkcode1" className="code-btn fl" type="button" onClick={this.getCode.bind(this)} value="获取验证码"/>
               : <input ref="checkcode1" className="code-btn fl" type="button" value="获取验证码"/>}
              <input ref="checkcode2" className="code-btn fl" type="button" style={ { display: 'none' } } onClick={this.getCode.bind(this)}/>
            </div>
            <div className="search-box check-box clear">
              <div className="input-icon check-user fl">选择角色</div>
              <div className={this.state.perSelected ? 'checked checked-active fl' : 'checked fl'} onClick={this.selected.bind(this, 'P')}>个人客户</div>
              <div className={this.state.compSelected ? 'checked checked-active fl' : 'checked fl'} onClick={this.selected.bind(this, 'C')}>企业客户</div>
            </div>
          </div>
          <div className="agree w88 clear">
            <span className={this.state.agree ? 'selected fl' : 'fl'} onClick={this.selected.bind(this, 'A')}></span>
            <div className="fl"><p className="fl">我已阅读并同意</p></div>
          </div>
          {this.state.userId && this.state.tel && this.state.pwd && this.state.repwd && this.state.code ?
            <div className="btn w88 mt47 bg-color-red" onClick={this.next.bind(this)}>
              提交
            </div> : <div className="btn w88 mt47 bg-color-gray" onClick={this.next.bind(this)}>
              提交
            </div>}
          <LinkContainer to = {'/app/login'}>
            <a className="link-btn mt47">登陆</a>
          </LinkContainer>
          <div className="fixed-height-box"></div>
          <section className="dialog-box dialog-login" style={{ display: 'none' }} ref="success">
            <div className="drag"></div>
            <div className="dialog bg-fff-color">
              <p>注册成功！</p>
              <p>是否立即绑定银行卡？</p>
              <div className="dialog-btn-box clear">
                <div className="dialog-normalBind dialog-btn fl" onClick={this.goHome.bind(this)}>
                  暂不绑定
                </div>
                <div className="dialog-btn fl" onClick={this.goBindCard.bind(this)}>
                  绑定
                </div>
              </div>
            </div>
          </section>
          <OpenShow alertMsg={this.props.application.alertMsg} closeMsg={this.props.closeMsg} />
        </div>
    );
  }
}

export default connect(
  state => ({ register: state.register, application: state.application }),
  { ...action, pushState, showMsg, closeMsg }
)(Register);
