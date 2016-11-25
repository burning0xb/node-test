import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { menuFuc } from '../utils/menuFuc';
import { Link } from 'react-router';
class Menu extends Component {
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

  componentDidMount() {
    menuFuc();
  }
  setValue(el) {
    this.setState({ active: el.target.innerText });
  }
  render() {
    return (
      <div className="menu">
        <ul>
            	<li><div className="menua_a">
                		<div className="aaa0"><img src="../../../assets/images/sy_ml.png"/></div>
                    	<span className="cdyj">首页</span>
                    </div>
                </li>
                <li style={{ display: this.state.exhibit.display }}>
                	<div className="menua_a active">
                    	<div className="aaa"><img src="../../../assets/images/clgl_ml1.png"/></div>
                        <span className="cdyj">陈列管理</span>
                        <div className="jt_xl"><img src="../../../assets/images/xl_wxz_hui.png"/></div>
                    </div>
                	<div className="ejcasa">
                    	<ul>
                        	<li style={{ display: this.state.awardTrace.display }}><Link to="/ma/BonusTrack"><span >陈列活动</span></Link></li>
                          <li style={{ display: this.state.awardSearch.display }}><Link to="/ma/BonusQuery"><span >奖励查询</span></Link></li>
                        </ul>
                    </div>
                </li>
                <li style={{ display: this.state.content.display }}>
                	<div className="menua_a xz">
                    	<div className="aaa1"><img src="../../../assets/images/nrgl_ml.png"/></div>
                        <span className="cdyj">内容管理</span>
                        <div className="jt_xl"><img src="../../../assets/images/xl_wxz_hui.png"/></div>
                    </div>
                	<div className="ejcasa">
                    	<ul>
                        	<li style={{ display: this.state.materialManage.display }}><Link to="/ma/materialManage"><span >素材管理</span></Link></li>
                          <li style={{ display: this.state.messManage.display }}><Link to="/ma/msgManage"><span >消息管理</span></Link></li>
                        </ul>
                    </div>
                </li>
                <li style={{ display: this.state.bill.display }}>
                	<div className="menua_a">
                    	<div className="aaa2"><img src="../../../assets/images/zdgl_ml.png"/></div>
                        <span className="cdyj">账单管理</span>
                        <div className="jt_xl"><img src="../../../assets/images/xl_wxz_hui.png"/></div>
                    </div>
                    <div className="ejcasa">
                    	<ul>
                        	<li style={{ display: this.state.tradeSearch.display }}><Link to="/ma/SearchTrade"><span >账单详情</span></Link></li>
                          <li style={{ display: this.state.billCount.display }}><Link to="/ma/searchBaill"><span >账单统计</span></Link></li>
                          <li style={{ display: this.state.billChk.display }}><Link to="/ma/searchChk"><span >对账单管理</span></Link></li>
                        </ul>
                    </div>
                    </li>
                <li style={{ display: this.state.com.display }}>
                	<div className="menua_a">
                    	<div className="aaa3"><img src="../../../assets/images/shgl_ml.png"/></div>
                        <span className="cdyj">商户管理</span>
                        <div className="jt_xl"><img src="../../../assets/images/xl_wxz_hui.png"/></div>
                    </div>
                    <div className="ejcasa">
                    	<ul>
                        	<li style={{ display: this.state.wechatManage.display }}><Link to="/ma/WechatUser"><span>微信用户查询</span></Link></li>
                          <li style={{ display: this.state.comGroup.display }}><Link to="/ma"><span >商户分组</span></Link></li>
                        </ul>
                    </div>
                    </li>
                <li style={{ display: this.state.sysManage.display }}>
                	<div className="menua_a">
                    	<div className="aaa4"><img src="../../../assets/images/xtgl_ml.png"/></div>
                        <span className="cdyj">系统管理</span>
                        <div className="jt_xl"><img src="../../../assets/images/xl_wxz_hui.png"/></div>
                    </div>
                    <div className="ejcasa">
                    	<ul>
                        	<li style={{ display: this.state.userManage.display }}><Link to="/ma/product"><span >系统用户管理</span></Link></li>
                          <li style={{ display: this.state.roleManage.display }}><Link to="/ma/roleEdit"><span >权限管理</span></Link></li>
                          <li style={{ display: this.state.logManagement.display }}><Link to="/ma/logManagement" ><span>日志管理</span></Link></li>
                        </ul>
                    </div>
                    </li>
            </ul>
        </div>
    );
  }
}
export default connect(
  state => ({ authorities: state.application.user && state.application.user.authorities ? state.application.user.authorities : undefined }),
)(Menu);
