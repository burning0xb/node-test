import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as storage from '../../web/utils/browserStorage';
export default class MHeader extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };
  handleLogOut(el) {
    el.preventDefault();
    this.props.logout(storage);
  }
  render() {
    return (
      <div>
        <div className="logo"><img src="images/hryb_logo.png"/></div>
      <div className="manblue manhearderpos">
    <div className="navbar-header">
      <span className="navbar-brand" style={{ color: '#fff', width: '100px' }}><span className="fa fa-paper-plane"></span>   欢迎</span></div>

    <div className="navbar-collapse collapse" style={{ height: '1px' }}>
      <ul id="main-menu" className="nav navbar-nav navbar-right">
        <li className="dropdown hidden-xs">
            <div className="manyonghu">
                <div className="manyonghu-name">
                <span className="glyphicon glyphicon-user padding-right-small" style={{ position: 'relative', top: '3px' }}></span> {this.props.user ? this.props.user.username : '用户名'}
                <i className="fa fa-caret-down" onClick={() => { global.jQuery('#userNmae').toggle(500); }}></i>
                </div>
            </div>

          <ul id="userNmae" className="username dropdown-menu" style={{ display: 'none' }}>
            <li><Link to="/ma/ResetPass">修改登陆密码</Link></li>
            <li className="divider"></li>
              <li onClick={this.handleLogOut.bind(this)}><Link to="/login">退出登录</Link></li>
          </ul>
        </li>
      </ul>

    </div>
  </div>
  </div>
    );
  }
}
