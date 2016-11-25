import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'redux-router';
// import { Panel } from 'react-bootstrap';
// import ProductForm from './_ProductForm';
import { push } from 'react-router-redux';

import { getStatus } from '../../utils/status';
import * as actions from '../../../redux/modules/user';

class ProductView extends Component {

  static propTypes = {
    params: React.PropTypes.object.isRequired,
    pushState: React.PropTypes.func.isRequired,
    goBack: React.PropTypes.func.isRequired,
    user: React.PropTypes.object,
    getUser: React.PropTypes.func.isRequired,
    clearUser: React.PropTypes.func.isRequired,
    updateUser: React.PropTypes.func.isRequired,
    removeUser: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: {
        0: 'option selected',
        1: 'option'
      },
      status: undefined
    };
  }

  state = {
    showModal: false
  };

  componentWillMount() {
    this.props.getUser(this.props.params.productId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.status !== undefined) {
      this.setState({ status: nextProps.user.status });
    }
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  handleSubmit() {
    const data = { };
    data.userId = this.refs.userId.value;
    data.username = this.refs.username.value;
    data.password = this.refs.password.value;
    data.pwdTries = this.refs.pwdTries.value;
    data.status = this.state.status;
    this.props.updateUser(data, () => {this.props.pushState('/ma/product');});
  }

  handleChange() {
  }

  return() {
    window.history.go(-1);
  }

  render() {
    return (
      <div>
        {/* <Panel collapsible defaultExpanded header={`编辑用户：${this.props.params.productId}`}>
          <ProductForm initialdefaultValues={this.props.user} onSubmit={this.handleSubmit.bind(this)} submitText="提交" handleReset={() => { window.history.go(-1); }} resetText="返回"/>
        </Panel> */}
        <link rel="stylesheet" href="/assets/css/xgyhjs.css" />
        <div className="dyh4">
                	<span className="biaoti">用户详情</span>
                    <div className="sousu4">
                    	<input type="submit" defaultValue="返回" onClick={this.return.bind(this)}/>
                    </div>
                </div>
                <div style={{ clear: 'both' }}></div>
				<div className="yhoxx">
                    <div className="yh_jiben">
                        <div className="yh_jb_top">
                            <div className="yh_jb_top_l"><img src="../../../../assets/images/jbxx_ml.png"/><span>基本信息</span></div>
                        </div>
                        <div className="yh_jb_dw">
                            <div className="gg_xx">
                                <div className="gg_xx_l"><span className="txx">用户ID：</span><span className="zjbjj" style={{ fontFamily: 'Helvetica' }}><input ref="userId" type="text" readOnly value={this.props.user.userId}/></span></div>
                            </div>
                            <div className="gg_xx">
                                <div className="gg_xx_l"><span className="txx">用户名：</span><span className="zjbjj" style={{ fontFamily: 'Helvetica' }}><input type="text" ref="username" value={this.props.user.username} onChange={this.handleChange.bind(this)}/></span></div>
                            </div>
                            <div className="gg_xx">
                                <div className="gg_xx_l"><span className="txx">密码：</span><span className="zjbjj"><input type="password" value={this.props.user.password + ''} ref="password" onChange={this.handleChange.bind(this)}/></span></div>
                            </div>
                            <div className="gg_xx">
                                <div className="gg_xx_l"><span className="txx">密码尝试次数：</span><span className="zjbjj" style={{ fontFamily: 'Helvetica' }}><input type="num" ref="pwdTries" value={this.props.user.pwdTries} onChange={this.handleChange.bind(this)}/></span></div>
                            </div>
                            <div className="gg_xx" style={{borderBottom: 'none'}}>
                              <div className="gg_xx_l">
                                <span className="txx">修改角色：</span>
                                <span className="zjbjj">
                                  <div className="inout" onClick={() => { this.setState({ select: !this.state.select }); }}>
                                    <div className="select select-zhong">
                                    <div className="selected-box" style={{ border: 'none' }}><span ref="status" name="roleId" className="ab">{getStatus('userState', this.state.status)}</span></div>
                                    <div className="xljt_js"></div>
                                  </div>
                                  <div className="jt_top" style={{ display: this.state.selected ? 'block' : 'none' }}></div>
                                </div>
                             </span>
                             </div>
                            </div>
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
)(ProductView);
