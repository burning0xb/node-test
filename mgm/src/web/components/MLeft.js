import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jquery from 'jquery';
import { Link } from 'react-router';
class MLeft extends Component {
  static propTypes = {
    authorities: PropTypes.array
  };
  constructor(props) {
    super(props);
    this.state = {
      active: '',
      arr1: undefined,
      arr2: undefined,
      arr3: undefined,
      arr4: undefined,
      arr5: undefined,
      arr6: undefined,
      arrow: {
        0: 'nav-header',
        1: 'nav-header collapsed'
      },
      exhibit: { display: 'none' },                                              // 订单查询
      content: { display: 'none' },                                           // 物流信息查询
      bill: { display: 'none' },                                          // 物流状态管理
      com: { display: 'none' },                                             // 国内物流退单
      awardTrace: { display: 'none' },                                         // 电商订单管理
      awardSearch: { display: 'none' },                                        // 订单审批公共收件箱
      messManage: { display: 'none' },                                        // 订单审批个人收件箱
      materialManage: { display: 'none' },                                          // 订单修改公共收件箱
      tradeSearch: { display: 'none' },                                          // 订单修改个人收件箱
      billCount: { display: 'none' },                                       // 海关订单管理
      billChk: { display: 'none' },                                          // 订单公共收件箱
      wechatManage: { display: 'none' },                                          // 订单个人收件箱
      comGroup: { display: 'none' },                                       // 运单管理
      sysManage: { display: 'none' },                                         // 用户管理
      userManage: { display: 'none' },                                             // 用户详情
      logManagement: { display: 'none' },                                             // 用户详情
      roleManage: { display: 'none' }                                            // 新增角色
    };
  }
  componentWillMount() {
    for (let is = 0; is < (this.props.authorities ? this.props.authorities.length : 0); is++) {
      switch (this.props.authorities[is].authority) {
        case 'exhibit':
          this.setState({ exhibit: { display: '' } });
          break;
        case 'content':
          this.setState({ content: { display: '' } });
          break;
        case 'bill':
          this.setState({ bill: { display: '' } });
          break;
        case 'com':
          this.setState({ com: { display: '' } });
          break;
        case 'awardTrace':
          this.setState({ awardTrace: { display: '' } });
          break;
        case 'awardSearch':
          this.setState({ awardSearch: { display: '' } });
          break;
        case 'messManage':
          this.setState({ messManage: { display: '' } });
          break;
        case 'materialManage':
          this.setState({ materialManage: { display: '' } });
          break;
        case 'tradeSearch':
          this.setState({ tradeSearch: { display: '' } });
          break;
        case 'billCount':
          this.setState({ billCount: { display: '' } });
          break;
        case 'billChk':
          this.setState({ billChk: { display: '' } });
          break;
        case 'wechatManage':
          this.setState({ wechatManage: { display: '' } });
          break;
        case 'comGroup':
          this.setState({ comGroup: { display: '' } });
          break;
        case 'sysManage':
          this.setState({ sysManage: { display: '' } });
          break;
        case 'userManage':
          this.setState({ userManage: { display: '' } });
          break;
        case 'roleManage':
          this.setState({ roleManage: { display: '' } });
          break;
        case 'logManagement':
          this.setState({ logManagement: { display: '' } });
          break;
        default:
      }
    }
  }

  getEmail(el) {
    switch (el[0].id) {
      case 'order':
        if (this.state.arr1) {
          this.setState({
            arr1: undefined
          });
        } else {
          this.setState({
            arr1: 1
          });
        }
        break;
      case 'Customs':
        if (this.state.arr2) {
          this.setState({
            arr2: undefined
          });
        } else {
          this.setState({
            arr2: 1
          });
        }
        break;
      case 'waybill':
        if (this.state.arr3) {
          this.setState({
            arr3: undefined
          });
        } else {
          this.setState({
            arr3: 1
          });
        }
        break;
      case 'payment':
        if (this.state.arr4) {
          this.setState({
            arr4: undefined
          });
        } else {
          this.setState({
            arr4: 1
          });
        }
        break;
      case 'billOfEntry':
        if (this.state.arr5) {
          this.setState({
            arr5: undefined
          });
        } else {
          this.setState({
            arr5: 1
          });
        }
        break;
      case 'user':
        if (this.state.arr6) {
          this.setState({
            arr6: undefined
          });
        } else {
          this.setState({
            arr6: 1
          });
        }
        break;
      default:
    }
    jquery(el).slideToggle();
  }
  setValue(el) {
    this.setState({ active: el.target.innerText });
  }
  render() {
    return (
          <div >
            <div className="sidebar-nav" style={{ marginTop: '50px' }}>
              <div onClick={this.setValue.bind(this)}>
                <div style={{ display: this.state.exhibit.display }} className={this.state.arr1 ? this.state.arrow[0] : this.state.arrow[1]} onClick={() => { jquery('#exhibit').slideToggle(500); }}><i className="fa fa-server"></i>陈列管理<i className="fa fa-collapse"></i></div>
                    <ul id="exhibit" className="order premium-menu nav nav-list collapse" style={{ display: 'none' }}>
                      <li style={{ display: this.state.awardTrace.display }} className={this.state.active === ' 陈列活动' ? 'active' : ''}><Link to="/ma/BonusTrack"><span className="fa fa-caret-right"></span> 陈列活动</Link></li>
                      <li style={{ display: this.state.awardSearch.display }} className={this.state.active === ' 奖励查询' ? 'active' : ''}><Link to="/ma/BonusQuery"><span className="fa fa-caret-right"></span> 奖励查询</Link></li>
                    </ul>
                <div style={{ display: this.state.content.display }} className={this.state.arr2 ? this.state.arrow[0] : this.state.arrow[1]} onClick={() => { jquery('#material').slideToggle(500); }}><i className="fa fa-television"></i>内容管理<i className="fa fa-collapse"></i></div>
                    <ul id="material" className="order premium-menu nav nav-list collapse" style={{ display: 'none' }}>
                      <li style={{ display: this.state.materialManage.display }} className={this.state.active === ' 素材管理' ? 'active' : ''}><Link to="/ma/MaterialManage"><span className="fa fa-caret-right"></span> 素材管理</Link></li>
                     <li style={{ display: this.state.messManage.display }} className={this.state.active === ' 消息管理' ? 'active' : ''}><Link to="/ma"><span className="fa fa-caret-right"></span> 消息管理</Link></li>
                    </ul>
                <div style={{ display: this.state.bill.display }} className={this.state.arr3 ? this.state.arrow[0] : this.state.arrow[1]} onClick={() => { jquery('#bail').slideToggle(500); }}><i className="fa fa-file-text-o"></i>帐单管理<i className="fa fa-collapse"></i></div>
                    <ul id="bail" className="order premium-menu nav nav-list collapse" style={{ display: 'none' }}>
                      <li style={{ display: this.state.tradeSearch.display }} className={this.state.active === ' 账单详情' ? 'active' : ''}><Link to="/ma/SearchTrade"><span className="fa fa-caret-right"></span> 账单详情</Link></li>
                      <li style={{ display: this.state.billCount.display }} className={this.state.active === ' 账单统计' ? 'active' : ''}><Link to="/ma/searchBaill"><span className="fa fa-caret-right"></span> 账单统计</Link></li>
                      <li style={{ display: this.state.billChk.display }} className={this.state.active === ' 对账单管理' ? 'active' : ''}><Link to="/ma/searchChk"><span className="fa fa-caret-right"></span> 对账单管理</Link></li>
                    </ul>
                <div style={{ display: this.state.com.display }} className={this.state.arr4 ? this.state.arrow[0] : this.state.arrow[1]} onClick={() => { jquery('#com').slideToggle(500); }}><i className="fa fa-user"></i>商户管理<i className="fa fa-collapse"></i></div>
                    <ul id="com" className="order premium-menu nav nav-list collapse" style={{ display: 'none' }}>
                      <li style={{ display: this.state.wechatManage.display }} className={this.state.active === ' 微信用户信息查询' ? 'active' : ''}><Link to="/ma/WechatUser"><span className="fa fa-caret-right"></span> 微信用户信息查询</Link></li>
                      <li style={{ display: this.state.comGroup.display }} className={this.state.active === ' 商户分组' ? 'active' : ''}><Link to="/ma"><span className="fa fa-caret-right"></span> 商户分组</Link></li>
                    </ul>
                <div style={{ display: this.state.sysManage.display }} className={this.state.arr6 ? this.state.arrow[0] : this.state.arrow[1]} onClick={() => { jquery('#user').slideToggle(500); }}><i className="fa fa-fw fa-comment"></i> 系统管理<i className="fa fa-collapse"></i></div>
                    <ul id="user" className=" user premium-menu nav nav-list collapse" style={{ display: 'none' }}>
                      <li style={{ display: this.state.userManage.display }} className={this.state.active === ' 系统用户管理' ? 'active' : ''}><Link to="/ma/product"><span className="fa fa-caret-right"></span> 系统用户管理</Link></li>
                      <li style={{ display: this.state.roleManage.display }} className={this.state.active === ' 新增角色' ? 'active' : ''}><Link to="/ma/roleEdit"><span className="fa fa-caret-right"></span> 权限管理</Link></li>
                      <li style={{ display: this.state.logManagement.display }} className={this.state.active === ' 新增角色' ? 'active' : ''}><Link to="/ma/logManagement"><span className="fa fa-caret-right"></span> 日志管理</Link></li>
                    </ul>
                </div>
            </div>
          </div>
    );
  }
}
export default connect(
  state => ({ authorities: state.application.user && state.application.user.authorities ? state.application.user.authorities : undefined }),
)(MLeft);
