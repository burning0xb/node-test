import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../../components/Pagination';
import * as actions from '../../../../redux/modules/controller/bail';
import { getStatus } from '../../../utils/status.js';
import { dateFormat } from '../../../utils/Format.js';
import formToJson from '../../../../web/utils/formToJson.js';
import { checkSpanStatus, runValidations, subValidations, clearValidations } from '../../../../web/utils/validations.js';
import config from './../config';
class SearchBaill extends Component {
  static propTypes = {
    bail: PropTypes.object,
    clearPage: PropTypes.func,
    findBailCount: PropTypes.func,
    searchBaill: PropTypes.func,
    setPageNow: PropTypes.func,
    pagination: PropTypes.func.isRequired,
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

  downloadExc(ev) {
    ev.preventDefault();
    const path = '..' + config.servicePath + '/bail/statistics';
    this.refs.myImg.href = path;
    this.refs.myImg.click();
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
        this.props.searchBaill(data, 1);
      }
    } else {
      if (checkSpanStatus('.sjmcinput') === true) {
        this.props.searchBaill(data, 1);
      }
    }
  }
  handleActPageSelect(se) {
    this.props.pagination(se.eventKey);
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="/assets/css/bj4.css" />
        <form className="form">
        <div className="dyh">
           <div className="zuo_l"><span className="biaoti">账单统计</span></div>
           <div className="you_r">
           	<div className="yiha">
               <div className="sjmcinput">
                 <div className="sj_top">
                 <span className="wbknr">经销商ID</span>
                   <div className="inout">
               <input type="text" data-info="nm" placeholder="请输入您的经销商ID" ref="storeNo" name="storeNo"/>
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
              <span className="wbknr">活动ID</span>
                <div className="inout">
            <input type="text" data-info="nm" placeholder="请输入您的活动ID" ref="activityNo" name="activityNo"/>
            </div>
            <div className="pd">
               <div className="pada" style={{marginLeft: '54px'}}>
                 <img src="../../../../../assets/images/icon.png"/>
                 <span className="error"></span>
                   </div>
               </div>
          </div>
            </div>
               <div className="sjmcinput">
                 <div className="sj_top">
                 <span className="wbknr">奖励月份</span>
                   <div className="inout">
               <input type="text" data-info="date" placeholder="请输入您的月份" ref="rewardDate" name="rewardDate"/>
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
                  <td className="table_tittle" width="8%">奖励</td>
                </tr>
            </thead>
            <tbody>
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
              <Pagination items={this.props.bail.pageCount} activePage={this.props.bail.pageNow} onSelect={this.handleActPageSelect.bind(this)} style={this.props.bail.list}/>
    </div>
    );
  }
}
export default connect(
  state => ({ bail: state.bail }),
  { ...actions }
)(SearchBaill);
