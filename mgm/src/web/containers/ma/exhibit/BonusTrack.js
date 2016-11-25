import React, { Component, PropTypes } from 'react';
// import { Button } from 'antd';
import * as actions from '../../../../redux/modules/bonus.js';
// import { getStatus } from '../../../utils/status';
import { checkSpanStatus, clearValidations, subValidations } from '../../../../web/utils/validations.js';
import Pagination from '../../../components/Pagination';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { yyyyMMdd } from '../../../utils/Format.js';
import { asyncConnect } from 'redux-async-connect';
import formToJson from '../../../utils/formToJson';
// import { Link } from 'react-router';
// import { getStatus } from '../../../../web/utils/status.js';
const zzx = global.jQuery;
let flag = -1;
const json = {};
json.curPage = 1;
@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(actions.payBackfindAll(json, 1))
}])
class BonusTrack extends Component {
  static propTypes = {
    bonus: PropTypes.object,
    OrderSearch: PropTypes.object,
    payBackfindAll: PropTypes.func,
    searchBonusTrack: PropTypes.func,
    setPayBackNow: PropTypes.func,
    hhMMss: PropTypes.func,
    setPageNow: PropTypes.func,
    sort: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      list: 1,
      pageNow: 1
    };
  }
  componentDidMount() {
    zzx('#datePicker1').date_input();
    zzx('#datePicker2').date_input();
    zzx('.time').find('img').click((event) => {
      zzx(event.currentTarget).prev().toggle();
    });
  }
search() {
  const data = formToJson('.form-inline');
  data.curPage = 1;
  data.startTime1 = data.startTime ? data.startTime + 'T00:00:00.000+08:00' : data.startTime;
  data.startTime2 = data.startTime ? data.startTime + 'T23:59:59.999+08:00' : data.startTime;
  data.endTime1 = data.endTime ? data.endTime + 'T00:00:00.000+08:00' : data.endTime;
  data.endTime2 = data.endTime ? data.endTime + 'T23:59:59.999+08:00' : data.endTime;
  clearValidations('.inout');
  subValidations('.inout');
  subValidations('.time');
  if (checkSpanStatus('.sjmcinput') === true) {
    this.props.searchBonusTrack(data, 1);
  }
}
select(se) {
  const data = {
    curPage: se.eventKey,
  };
  if (this.props.bonus.findStatus === 'payBackfindAll') {
    data.curPage = se.eventKey;
    this.props.payBackfindAll(data, se.eventKey);
  }
  if (this.props.bonus.findStatus === 'searchBonusTrack') {
    const json1 = this.props.bonus.input;
    json1.startTime1 = json1.startTime ? json1.startTime + 'T00:00:00.000+08:00' : json1.startTime;
    json1.startTime2 = json1.startTime ? json1.startTime + 'T23:59:59.999+08:00' : json1.startTime;
    json1.endTime1 = json1.endTime ? json1.endTime + 'T00:00:00.000+08:00' : json1.endTime;
    json1.endTime2 = json1.endTime ? json1.endTime + 'T23:59:59.999+08:00' : json1.endTime;
    json1.curPage = se.eventKey;
    this.props.searchBonusTrack(json1, se.eventKey);
  }
}
closeList() {
  zzx('#list').fadeOut(500);
}
sort(key) {
  flag = ~flag;
  this.props.sort(key, flag);
}

render() {
  return (
    <div>
      <div className="dyh">
        <link rel="stylesheet" href="/assets/css/bj2.css" />
        <div className="zuo_l"><span className="biaoti">陈列活动</span></div>
                       <form className="form-inline" >
                           <div className="you_r">
                           	<div className="yiha">
                              <div className="sjmcinput">
                                  <div className="sj_top">
                               <span className="wbknr">活动名称</span>
                                  <div className="inout"><input id="hdmch" type="text" data-info="none" placeholder="请输入您的活动名称" name="rewardName"/>
                                   </div>
                                 </div>
                                </div>
                                  <div className="sjmcinput">
                                    <div className="sj_top">
                                  	<span className="wbknr">商户名称</span>
                                      <div className="inout">
                              		<input type="text" data-info="none" placeholder="请输入您的商户名称" name="storeName" />
                                  </div>
                                </div>
                                  </div>
                                  <div className="sousu">
                                    <input type="button" value="搜索" onClick={this.search.bind(this)}/>
                                  </div>
                                </div>
                                <div className="erha">
                                  <div className="sjmcinput">
                                    <div className="sj_top">
                                    <span className="wbknr">开始时间</span>
                                      <div className="time">
                                  <input type="text" data-info="ydm" placeholder="请选择您的开始时间" name="startTime" id="datePicker1" className="date_picker1" />
                                  <img src="../../../../../assets/images/rili_tubiao.png"/>
                                  </div>
                                  <div className="pd">
                                     <div className="pada" style={{marginLeft: '71px'}}>
                                       <img src="../../../../../assets/images/icon.png"/>
                                       <span className="error"></span>
                                         </div>
                                     </div>
                                          </div>
                                  </div>
                                  <div className="sjmcinput">
                                    <div className="sj_top">
                                    <span className="wbknr">结束时间</span>
                                      <div className="time">
                                  <input type="text" data-info="ydm" placeholder="请选择您的结束时间" name="endTime" id="datePicker2" className="date_picker1" />
                                  <img src="../../../../../assets/images/rili_tubiao.png"/>
                                  </div>
                                  <div className="pd">
                                     <div className="pada" style={{marginLeft: '71px'}}>
                                       <img src="../../../../../assets/images/icon.png"/>
                                       <span className="error"></span>
                                         </div>
                                     </div>
                                          </div>
                                  </div>
                                            <div className="sousu">
                                      <input type="reset" value="重置"/>
                                    </div>
                                  </div>
                              </div>
                      </form>
                  </div>
                  <div className="bg_ml">
                    {this.props.bonus && this.props.bonus.list && this.props.bonus.list.length > 0 ?
        (<table cellPadding="0" cellSpacing="0">
        <tbody >
         <tr className="first" style={{ height: '50px' }}>
           <td className="table_tittle" width="4%" onClick={this.sort.bind(this, 'storeNo')}>商户ID</td>
           <td className="table_tittle" width="5%" onClick={this.sort.bind(this, 'storeName')}>商户名称</td>
           <td className="table_tittle" width="6%" onClick={this.sort.bind(this, 'rewardName')}>活动名称</td>
           <td className="table_tittle" width="7%" onClick={this.sort.bind(this, 'startTime')}>活动开始时间</td>
           <td className="table_tittle" width="8%" onClick={this.sort.bind(this, 'endTime')}>活动结束时间</td>
           <td className="table_tittle" width="5%" onClick={this.sort.bind(this, 'displayStandard')}>活动陈列标准</td>
           <td className="table_tittle" width="6%" onClick={this.sort.bind(this, 'rewardAmt')}>活动协议金额</td>
           <td className="table_tittle" width="6%" onClick={this.sort.bind(this, 'rulesDetail')}>活动奖励规则</td>
         </tr>
          {this.props.bonus.list.map((key, value) => (
        <tr key={value} className="tr_hover" style={{ height: '80px' }}>
          {/* <td style={{ color: '#23a86c' }}><Link to={`/ma/ModifyBonusTrack/${key.storeNo}`}>{key.storeNo}</Link></td>*/}
          <td style={{ color: '#23a86c' }}>{key.storeNo}</td>
          <td style={{ fontFamily: 'Helvetica' }}>{key.storeName}</td>
          <td style={{ color: '#333333' }}>{key.rewardName}</td>
          <td style={{ fontFamily: 'Helvetica' }}>{yyyyMMdd(key.startTime)}</td>
          <td style={{ fontFamily: 'Helvetica' }}>{yyyyMMdd(key.endTime)}</td>
          <td style={{ fontFamily: 'Helvetica' }} title={key.displayStandard}>{key.displayStandard.length > 10 ? key.displayStandard.substring(0, 9) + '...' : key.displayStandard }</td>
          <td style={{ fontFamily: 'Helvetica' }}>{key.rewardAmt}</td>
          <td style={{ fontFamily: 'Helvetica' }} title={key.rulesDetail}>{key.rulesDetail.length > 10 ? key.rulesDetail.substring(0, 9) + '...' : key.rulesDetail }</td>
        </tr>
      ))
    }
        </tbody>
      </table>) : <p>没有搜索到符合条件的数据！</p> }
                  </div>
          <Pagination items={this.props.bonus.pageCount} activePage={this.props.bonus.pageNow} onSelect={this.select.bind(this)} style={this.props.bonus.list}/>

    </div>
  );
}
}
export default connect(
  state => ({ bonus: state.bonus }),
  { ...actions, pushState }
)(BonusTrack);
