import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import * as actions from '../../../../redux/modules/wechatUser.js';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { getStatus } from '../../../../web/utils/status.js';
// import { asyncConnect } from 'redux-connect';
import { yyyyMMdd } from '../../../../web/utils/Format.js';
class WechatUserDetail extends Component {
  static propTypes = {
    wechatUser: PropTypes.object,
    findUserByUsrNo: PropTypes.func,
    params: PropTypes.object.isRequired
  }
  componentWillMount() {
    console.log(this.props.params.usrNo);
    this.props.findUserByUsrNo(this.props.params.usrNo);
  }

  render() {
    return (
    <div>
      <div className="header">
          <h1>微信用户信息详情</h1>
      </div>
      <form className="form-inline" >
      <div className="search">
        <div className="form-group search-text" style={{ width: '44%' }}>
          <label className="control-label">微信编号</label>
          <input type="text" data-info="empty" placeholder="请输入登录ID" name="loginId" className="form-control search-input" id="loginId" readOnly value={ this.props.wechatUser.UserDetail ? this.props.wechatUser.UserDetail.usrNo : ''}/>
          <i className="error"/>
        </div>
        <div className="form-group search-text" style={{ width: '44%' }}>
          <label className="control-label">真实姓名</label>
          <input readOnly type="text" data-info="empty" placeholder="请输入会员ID" name="memId" className="form-control search-input" id="memId" value={ this.props.wechatUser.UserDetail ? this.props.wechatUser.UserDetail.name : ''}/>
          <i className="error"/>
        </div>
        <div className="form-group search-text" style={{ width: '44%' }}>
          <label className="control-label">open ID</label>
          <input readOnly type="text" data-info="empty num" placeholder="请输入支付份数" name="usrNo" className="form-control search-input" id="copie" value={ this.props.wechatUser.UserDetail ? this.props.wechatUser.UserDetail.openId : ''}/>
          <i className="error"/>
        </div>
        <div className="form-group search-text" style={{ width: '44%' }}>
          <label className="control-label">用户状态</label>
          <input readOnly type="text" data-info="empty num" placeholder="请输入支付份数" name="usrNo" className="form-control search-input" id="copie" value={ this.props.wechatUser.UserDetail ? getStatus('wechatStatus', this.props.wechatUser.UserDetail.status) : ''}/>
          <i className="error"/>
        </div>
        <div className="form-group search-text" style={{ width: '44%' }}>
          <label className="control-label">关注时间</label>
          <input readOnly type="text" data-info="empty num" placeholder="请输入支付份数" name="usrNo" className="form-control search-input" id="copie" value={ this.props.wechatUser.UserDetail ? yyyyMMdd(this.props.wechatUser.UserDetail.createTime) : ''}/>
          <i className="error"/>
        </div>
        <div className="form-group search-text" style={{ width: '44%' }}>
          <label className="control-label">地址</label>
          <input readOnly type="text" data-info="empty num" placeholder="请输入支付份数" name="usrNo" className="form-control search-input" id="copie" value={ this.props.wechatUser.UserDetail ? this.props.wechatUser.UserDetail.addresProvince + '省 ' + this.props.wechatUser.UserDetail.addresCity + '市 ' + this.props.wechatUser.UserDetail.addresCountry + '区 ' + this.props.wechatUser.UserDetail.addresDetail : ''}/>
          <i className="error"/>
        </div>
      </div>
      <Button bsStyle="primary" onClick={() => { window.history.go(-1); }}>
        <i className="fa fa-reply"/>返回
      </Button>
    </form>
    </div>
    );
  }
}
export default connect(
  state => ({ wechatUser: state.wechatUser }),
  { ...actions, pushState }
)(WechatUserDetail);
