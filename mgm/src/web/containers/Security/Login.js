import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import jquery from 'jquery';
import { input, ButtonInput } from 'react-bootstrap';
import * as actions from '../../../redux/modules/application';
import * as storage from '../../utils/browserStorage';
import { asyncConnect } from 'redux-connect';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(actions.closeSuccess())
}])

class Login extends Component {

  static propTypes = {
    application: PropTypes.object,
    closeSuccess: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.application.loginStatus === 2 ) {
      const dt = document.getElementById('save');
      dt.innerHTML = nextProps.application.error;
      jquery('#save').show();
    }
  }

  handleSubmit(el) {
    el.preventDefault();
    const ml = jquery('.yhm').eq(0).find('input').val();
    const mll = jquery('.yhm').eq(1).find('input').val();
    if ( ml === '' || mll === '') {
      jquery('#save').show();
    } else {
      jquery('#save').hide();
      // el.preventDefault();
      const info = jquery(el.target).serialize() + '&IP=' + jquery('#keleyivisitorip').text();
      this.props.login(info, storage, () => {
        setTimeout(() => { // FIXME: 模拟登陆rpc延时过程，登录button会被disable掉，应该删除
          this.props.pushState('/ma');
        }, 1000);
      });
    }
  }

  render() {
    return (
      <div>
        <link href="/assets/css/denglu.css" rel="stylesheet"/>
      <div className="dl_nr">
	<div className="dl_br_bg">
    	<div className="denglu">
        	<p>华润怡宝移动支付平台</p>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="yhm">
                <input type="text" name="username" placeholder="用户名"
               />
                </div>
                <div className="yhm">
                  <input type="password" name="password" placeholder="密码"
                  />
                  </div>
              <div className="pd">
              	<div className="pada" id="save">
                  	<img src="../../../assets/images/not-kong.png"/><span>用户名或密码不能为空</span>
                  </div>
              </div>
              <div className="dl_an">
              {/* {this.props.application.loginStatus === 2 ? <label>{this.props.application.error}</label> : ''} */}
              <ButtonInput type="submit" bsStyle="primary" bsSize="large" block disabled={this.props.application.loginStatus <= 1}>
                {(this.props.application.loginStatus <= 1) ? '登录中...' : '登录' }
              </ButtonInput></div>
              </form>
        </div>
    </div>
</div>
</div>
    );
  }
}

export default connect(
  state => ({ application: state.application }),
  { ...actions, pushState: push }
)(Login);
