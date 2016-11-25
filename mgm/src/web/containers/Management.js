import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loginFuc } from '../utils/loginFuc';
// import MHeader from '../components/MHearder';
// import MFooter from '../components/MFooter';
import Menu from '../components/Menu';
import * as actions from '../../redux/modules/application';
class Management extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  static childContextTypes = {
    user: PropTypes.object
  };

  getChildContext() {
    return {
      user: this.props.user
    };
  }

  componentDidMount() {
    loginFuc();
  }

  render() {
    // const { user, logout } = this.props;

    return (
      <div className="center">
        <div className="left fl">
          	<div className="logo"><img src="../../../assets/images/hryb_logo.png"/></div>
            <Menu/>
          </div>
        <div className="right fr">
        	<div className="right_top">
            	<div className="dl_ml">
                	<img src="../../../assets/images/dltx_ml_photo.png"/>
                    <span className="yhm">{ this.props.user ? this.props.user.username : '用户名' }</span>
                    <div className="delu_xl"><img src="../../../assets/images/xl_wxz_hui.png"/></div>
                </div>
            </div>
            <div className="right_dw">
            	<div className="right_dw_cen">
                    <div className="dl_zuxe">
                    	<ul>
                        	<li><span>查看账户</span></li>
                            <li className="active"><span>修改资料</span></li>
                            <li style={{ borderBottom: 'none' }} onClick={() => { this.props.logout(); }}><Link to="/login"><span>注销</span></Link></li>
                        </ul>
                    </div>
                    {this.props.children}
                </div>
            </div>
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    );
  }
}

export default connect(
  ({ application, menu }) => ({ ...application, ...menu }),
    dispatch => ({ ...bindActionCreators(actions, dispatch) })
)(Management);
