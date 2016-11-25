import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
import formToJson from '../../../../web/utils/formToJson.js';
import { getStatus } from '../../../../web/utils/status.js';
import { clearValidations, subValidations, checkSpanStatus } from '../../../../web/utils/validations.js';
import * as actions from '../../../../redux/modules/wechatUser.js';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { asyncConnect } from 'redux-connect';
import Pagination from '../../../components/Pagination';
import config from './../config';
const json = {};
json.curPage = 1;
@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(actions.userFindAll(json, 1))
}])
class WechatUserSearch extends Component {
  static propTypes = {
    wechatUser: PropTypes.object,
    userFindAll: PropTypes.func
  }

select(se) {
  const data = formToJson('.form');
  data.curPage = se.eventKey;
  this.props.userFindAll(data, se.eventKey);
}

downloadExc(ev) {
  ev.preventDefault();
  const path = '..' + config.servicePath + '/com/export';
  this.refs.myImg.href = path;
  this.refs.myImg.click();
}

search() {
  const data = formToJson('.form');
  data.curPage = 1;
  clearValidations('.inout');
  subValidations('.inout');
  if (data.mobile === '') {
    this.refs.mobile.innerHTML = '';
    if (checkSpanStatus('.sjmcinput') === true) {
      this.props.userFindAll(data, 1);
    }
  } else {
    if (checkSpanStatus('.sjmcinput') === true) {
      this.props.userFindAll(data, 1);
    }
  }
}

  render() {
    return (
      <div>
        <link rel="stylesheet" href="/assets/css/bj6.css" />
        <form className="form">
        <div className="dyh">
           <div className="zuo_l"><span className="biaoti" style={{ fontSize: '19px'}}>微信查询</span></div>
           <div className="you_r">
            <div className="yiha">
               <div className="sjmcinput">
                 <div className="sj_top">
                 <span className="wbknr">商户ID</span>
                   <div className="inout">
                     <input type="text" data-info="nm" placeholder="请输入您的商户ID" ref="storeNo" name="usrNo"/>
                   </div>
                   <div className="pd">
            						<div className="pada">
                						<img src="../../../../../assets/images/icon.png"/>
                            <span className="error"></span>
                					</div>
            					</div>
             </div>
               </div>
               <div className="sjmcinput">
                 <div className="sj_top">
                 <span className="wbknr">手机号</span>
                   <div className="inout">
                     <input type="text" data-info="bbb" placeholder="请输入您的手机号" ref="mobile" name="mobile"/>
                   </div>
                   <div className="pd">
            					<div className="pada">
                				<img src="../../../../../assets/images/icon.png"/>
                        <span className="error"></span>
                					</div>
            					</div>
             </div>
               </div>
               <div className="sjmcinput">
                 <div className="sj_top">
                 <span className="wbknr">商户名称</span>
                   <div className="inout">
               <input type="text" data-info="no" placeholder="请输入您的商户名称" name="name"/>
               </div>
               <div className="pd">
                    <div className="pada">
                        <img src="../../../../../assets/images/icon.png"/>
                        <span className="error"></span>
                      </div>
                  </div>
             </div>
               </div>
           </div>
        <div className="erha">
                            <div className="sousu">
                    			<input type="button" onClick={this.search.bind(this)} value="搜索"/>
                    		</div>
                            <div className="sousu">
                            	<input type="reset" value="重置"/>
                            </div>
                    	</div>
</div>
          </div>
          </form>
          <div className="xinzeng">
          <input type="button" onClick={this.downloadExc.bind(this)} value="导出"/>
          <a href="" ref="myImg" target="_self" className="hidden" style={{display: 'none'}}>文档</a>
          </div>
        <div className="bg_ml">
          {this.props.wechatUser && this.props.wechatUser.userlist && this.props.wechatUser.userlist.length > 0 ?
          (<table cellPadding="0" cellSpacing="0">
            <thead id="thread">
              <tr className="first" style={{ height: '50px' }}>
                <td className="table_tittle" width="4%">商户ID</td>
                <td className="table_tittle" width="5%">商户名称</td>
                <td className="table_tittle" width="6%">店铺名称</td>
                <td className="table_tittle" width="7%">店铺地址</td>
                <td className="table_tittle" width="8%">手机号</td>
                <td className="table_tittle" width="6%">支付方式类型</td>
                <td className="table_tittle" width="8%">OPENID</td>
                <td className="table_tittle" width="5%">绑定状态</td>
              </tr>
            </thead>
            <tbody ref="tbody">
              {this.props.wechatUser.userlist.map((key, value) => (
                <tr style={{ height: '80px' }} className="tr_hover" key={value}>
                  {/* <td style={{ color: '#23a86c' }}><Link to={`/ma/UserDetail/${key.usrNo}`}>{key.usrNo }</Link></td>*/}
                  <td style={{ color: '#23a86c' }}>{key.usrNo }</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{key.name}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{key.storeName}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{key.addresProvince + '省 ' + key.addresCity + '市 ' + key.addresCountry + key.addresDetail}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{key.mobile}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{getStatus('rewardType', key.rewardType)}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{key.openId}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{getStatus('wechatStatus', key.status)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>) : <p>没有搜索到符合条件的数据！</p>
        }
        </div>
          <Pagination items={this.props.wechatUser.pageCount} activePage={this.props.wechatUser.pageNow} onSelect={this.select.bind(this)} style={this.props.wechatUser.userlist}/>

    </div>
    );
  }
}
export default connect(
  state => ({ wechatUser: state.wechatUser }),
  { ...actions, pushState }
)(WechatUserSearch);
