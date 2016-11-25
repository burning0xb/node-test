import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../../components/Pagination';
import * as actions from '../../../../redux/modules/controller/bail';
import { getStatus } from '../../../utils/status.js';
import { dateFormat } from '../../../utils/Format.js';
import formToJson from '../../../../web/utils/formToJson.js';
import { runValidations, checkSpanStatus, clearValidations, subValidations } from '../../../../web/utils/validations.js';

class searchChk extends Component {
  static propTypes = {
    bail: PropTypes.object,
    clearPage: PropTypes.func,
    findBailCount: PropTypes.func,
    searchChk: PropTypes.func,
    pagination: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      list: 1
    };
  }
  componentWillMount() {
    this.props.clearPage();
    const data = {
      curPage: 1
    };
    this.props.findBailCount(dateFormat(data));
  }

  check(en) {
    runValidations(en.target);
  }

  search() {
    const data = formToJson('.form');
    data.curPage = 1;
    clearValidations('.inout');
    subValidations('.inout');
    if (data.rewardDate === '') {
      this.refs.rewardDate.rewardDate = '';
      if (checkSpanStatus('.sjmcinput') === true) {
        this.props.searchChk(data, 1);
      }
    } else {
      if (checkSpanStatus('.sjmcinput') === true) {
        this.props.searchChk(data, 1);
      }
    }
  }

  handleActPageSelect(se) {
    this.props.pagination(se.eventKey);
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="/assets/css/bj5.css" />
        <div className="dyh">
          <form className="form">
           <div className="zuo_l"><span className="biaoti">对账单管理</span></div>
           <div className="you_r">
           	<div className="yiha">
               <div className="sjmcinput">
                 <div className="sj_top">
                 <span className="wbknr">经销商ID</span>
                   <div className="inout">
               <input type="text" data-info="nm" placeholder="请输入您的活动ID" ref="storeNo" name="storeNo"/>
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
                 <span className="wbknr">支付月份</span>
                   <div className="inout">
               <input type="text" data-info="date" placeholder="请输入您的支付月份" ref="rewardDate" name="rewardDate"/>
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
             <input type="button" onClick={this.search.bind(this)} defaultValue="搜索"/>
            </div>
            <div className="sousu">
              <input type="reset" value="重置"/>
            </div>
           </div>
                 </div>
               </form>
          </div>
          <div className="xinzeng">
            <input type="button" defaultValue="导出"/>
          </div>
        <div className="bg_ml">
          {this.props.bail && this.props.bail.list && this.props.bail.list.length > 0 ?
          (<table cellPadding= "0" cellSpacing= "0" >
            <thead id="thread">
                  <tr className="first" style={{ height: '50px' }} >
                    <td className="table_tittle" width="4%">经销商ID</td>
                    <td className="table_tittle" width="5%">经销商名称</td>
                    <td className="table_tittle" width="6%">活动ID</td>
                    <td className="table_tittle" width="7%">活动名称</td>
                    <td className="table_tittle" width="8%">商户ID</td>
                    <td className="table_tittle" width="5%">商户名称</td>
                    <td className="table_tittle" width="6%">支付金额</td>
                    <td className="table_tittle" width="6%">支付状态</td>
                    <td className="table_tittle" width="8%">支付时间</td>
                  </tr>
              </thead>
            <tbody ref="tbody">
              {this.props.bail.list.map((key, value) => (
                <tr style={{ height: '80px' }} className="tr_hover" key = {value}>
                  <td style={{ color: '#23a86c' }}>{key.storeNo}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{key.storeName}</td>
                  <td style={{ color: '#333333' }}>{key.activityNo}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{key.rewardName}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{key.usrNo}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{key.loginId}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{key.rewardPayMoney}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{getStatus('payStatus', key.payStatus)}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{dateFormat(key.rewardDate)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>) : <p>没有搜索到符合条件的数据！</p>
        }
        </div>
          <Pagination items={this.props.bail.pageCount} onSelect={this.handleActPageSelect.bind(this)} activePage={this.props.bail.pageNow} style={this.props.bail.list}/>
    </div>
    );
  }
}
export default connect(
  state => ({ bail: state.bail }),
  { ...actions }
)(searchChk);
