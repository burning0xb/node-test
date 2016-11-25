import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as storage from '../../web/utils/browserStorage';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Header extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    show: PropTypes.string,
    hide: PropTypes.string,
    currentIndex: PropTypes.number,
    authorities: PropTypes.array,
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      showsecd: false,
      showstate: false,
      showthird: false,
      showfource: false,
      auths: {}
    };
  }

  componentWillMount() {
    this.updateStateAuths(this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.updateStateAuths(nextProps.user);
    }
  }

  setCurIndex(index) {
    this.setState({ currentIndex: index });
  }

  getStyles() {
    return {
      show: { display: 'block', borderTop: 'thick double #aba4a4', marginTop: '27px' },
      hide: { display: 'none' }
    };
  }

  updateStateAuths(user) {
    if (user && user.authorities) {
      const tmp = {};
      user.authorities.forEach((auth) => {
        tmp[auth.authority] = {display: ''};
      });
      this.setState({auths: tmp});
    } else {
      this.setState({auths: {}});
    }
  }

  mouseOver(state, event) {
    event.preventDefault();
    const obj = {};
    obj[state] = true;
    this.setState(obj);
  }

  mouseLeave(state, event) {
    event.preventDefault();
    const obj = {};
    obj[state] = false;
    this.setState(obj);
  }

  handleLogOut(event) {
    event.preventDefault();
    this.props.logout(storage);
    this.props.pushState('/');
  }
  render() {
    const index = this.props.currentIndex;
    const styles = this.getStyles();
    return (
        <div>
          <div className="wrapper-top-line">
            <div className="block-top-line width-980">
              { !this.props.user ?
                <div className="block-login">
                  <Link to="login">登录</Link>
                  <span>|</span>
                  <Link to="regist">注册</Link>
                </div>
                :
                <div className="block-login">
                  <a href="#"><span>当前用户：{this.props.user.username}</span></a>
                  <a href="#" onClick={this.handleLogOut.bind(this)}>退出</a>
                </div>
              }

              <div className="fr">
                <img src="../../assets/images/call.png"></img>
                <span>&nbsp;&nbsp;400-0000-000&nbsp;&nbsp;</span>
              </div>
              <div>
                <span className="span"></span>
              </div>
            </div>
          </div>
          <div className="wrapper-nav-line">
            <div className="block-nav-line width-980">
              <span>
                <Link className="logo" to="" />
              </span>
              <nav>
                <ul>
                  <li className="two"
                      style={this.state.auths.userManage ? this.state.auths.userManage : {display: 'none'}}
                      onMouseLeave={this.mouseLeave.bind(this, 'userManageExpansion')}
                      onMouseOver={this.mouseOver.bind(this, 'userManageExpansion')}>
                    <Link className={index === 4 ? 'active' : ''} to="product">用户管理</Link>
                    <dl style={this.state.userManageExpansion ? styles.show : styles.hide}>
                      <dd><Link to="product">用户查询</Link></dd>
                    </dl>
                  </li>

                  <li className="two"
                      style={this.state.auths.roleEdit ? this.state.auths.roleEdit : {display: 'none'}}
                      onMouseLeave={this.mouseLeave.bind(this, 'roleEditExpansion')}
                      onMouseOver={this.mouseOver.bind(this, 'roleEditExpansion')}>
                    <Link className={index === 5 ? 'active' : ''} to="roleEdit">角色管理</Link>
                    <dl style={this.state.roleEditExpansion ? styles.show : styles.hide}>
                      <dd><Link to="roleedit">编辑角色</Link></dd>
                    </dl>
                  </li>

                  <li><Link className={index === 0 ? 'active' : ''} to="" >首页</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

    );
  }
}
export default connect(
  () => ({ }),
  {pushState: push}
)(Header);
