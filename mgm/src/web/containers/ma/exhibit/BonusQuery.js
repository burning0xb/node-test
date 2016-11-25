import React, { Component, PropTypes } from 'react';
// import { Button } from 'antd';
import Pagination from '../../../components/Pagination';
import * as actions from '../../../../redux/modules/bonus.js';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { asyncConnect } from 'redux-async-connect';
import formToJson from '../../../utils/formToJson';
import { yyyyMMdd } from '../../../utils/Format.js';
// import { Link } from 'react-router';
import { getStatus, getFlag } from '../../../../web/utils/status.js';
const zzx = global.jQuery;
import { checkSpanStatus, runValidations, clearValidations, subValidations } from '../../../../web/utils/validations.js';
let flag = -1;
const json = {
  curPage: 1,
  type: ''
};
 @asyncConnect([{
   promise: ({ store: { dispatch } }) => dispatch(actions.findAll(json, 1))
 }])
class BonusQuery extends Component {
  static propTypes = {
    bonus: PropTypes.object,
    OrderSearch: PropTypes.object,
    findAll: PropTypes.func,
    search: PropTypes.func,
    setPageNow: PropTypes.func,
    hhMMss: PropTypes.func,
    sort: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectUsers: [],
      rewardStatus: '请选择'
    };
  }
  componentDidMount() {
    zzx('#datePicker1').date_input();
    zzx('.time').find('img').click((event) => {
      zzx(event.currentTarget).prev().toggle();
    });
  }
  check(en) {
    runValidations(en.target);
  }
  search() {
    const data = formToJson('.form');
    data.curPage = 1;
    if (this.refs.rewardStatus.innerHTML !== null) {
      data.rewardStatus = getFlag('rewardStatus', this.refs.rewardStatus.innerHTML);
    }
    clearValidations('.inout');
    subValidations('.inout');
    subValidations('.time');
    if (data.rewardTime === '') {
      this.refs.rewardTime.innerHTML = ' ';
      if (checkSpanStatus('.sjmcinput') === true) {
        this.props.search(data, 1);
      }
    } else {
      if (checkSpanStatus('.sjmcinput') === true) {
        this.props.search(data, 1);
      }
    }
  }
  select(se) {
    const data = {
      curPage: se.eventKey,
    };
    if (this.props.bonus.findStatus === 'findAll') {
      data.curPage = se.eventKey;
      this.props.findAll(data, se.eventKey);
    }
    if (this.props.bonus.findStatus2 === 'search') {
      const json1 = this.props.bonus.input;
      json1.rewardDate = json1.rewardDate;
      json1.curPage = se.eventKey;
      if (this.refs.rewardStatus.innerHTML !== null) {
        json1.rewardStatus = getFlag('rewardStatus', this.refs.rewardStatus.innerHTML);
      }
      this.props.search(json1, se.eventKey);
    }
  }
  sort(key) {
    flag = ~flag;
    this.props.sort(key, flag);
  }

render() {
  return (
    <div>
      <link rel="stylesheet" href="/assets/css/bj2.css" />
      <link rel="stylesheet" href="/assets/css/datePickerr.css" />
      <div className="dyh">
        <div className="zuo_l"><span className="biaoti">奖励查询</span></div>
                       <form className="form">
                           <div className="you_r">
                           	<div className="yiha">
                              <div className="sjmcinput">
                                <div className="sj_top">
                                <span className="wbknr">商户名称</span>
                                  <div className="inout">
                                    <input type="text" data-info="no" id="hdmch" placeholder="请输入您的商户名称" ref="storeName" name="storeName"/>
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
                                 <span className="wbknr">活动名称</span>
                                   <div className="inout">
                                     <input type="text" data-info="no" id="hdmch" placeholder="请输入您的活动名称" ref="rewardName" name="rewardName"/>
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
                                   <span className="wbknr">月份</span>
                                     <div className="inout">
                                       <input type="text" data-info="date" placeholder="请输入您的月份" ref="rewardTime" name="rewardTime"/>
                                     </div>
                                     <div className="pd">
                              					<div className="pada" style={{ marginLeft: '17%'}}>
                                  				<img src="../../../../../assets/images/icon.png"/>
                                          <span className="error"></span>
                                  					</div>
                              					</div>
                               </div>
                                 </div>
                             </div>
                             <div className="erha">
                                 <div className="sjmcinput">
                                   <span className="wbknr">奖品发放时间</span>
                                     <div className="time">
                                   <input type="text" data-info="ydm" placeholder="请选择您的奖品发放时间" name="rewardDate" id="datePicker1" className="date_picker1" />
                                   <img src="../../../../../assets/images/rili_tubiao.png"/>
                               </div>
                               <div className="pd">
                                  <div className="pada">
                                    <img src="../../../../../assets/images/icon.png"/>
                                    <span className="error"></span>
                                      </div>
                                  </div>
                           </div>
                                   <div className="sjmcinput">
                                     <span className="wbknr">奖励状态</span>
                                     <div className="inout" onClick={() => { this.setState({ selected: !this.state.selected }); }}>
                                       <div className="select select-zhong">
                                         <div className="selected-box" style={{ border: 'none' }}><span ref="rewardStatus" className="ab">{this.state.rewardStatus}</span></div>
                                         <div className="xljt_js"><img src="../../../../../assets/images/xl_wxz_hui	.png"/></div>
                                       <ul className="option-box option-box-zhong" style={{ width: '159px', top: '-1', display: this.state.selected ? 'block' : 'none' }}>
                                           <li className={'option' + (this.state.selectIndex === 0 ? ' selected' : '')} onClick={(event) => { event.stopPropagation(); this.setState({ selected: !this.state.selected, rewardStatus: '请选择', selectIndex: 0 }); }}>请选择</li>
                                           <li className={'option' + (this.state.selectIndex === 1 ? ' selected' : '')} onClick={(event) => { event.stopPropagation(); this.setState({ selected: !this.state.selected, rewardStatus: '活动执行中', selectIndex: 1 }); }}>活动执行中</li>
                                           <li className={'option' + (this.state.selectIndex === 2 ? ' selected' : '')} onClick={(event) => { event.stopPropagation(); this.setState({ selected: !this.state.selected, rewardStatus: '照片不合格', selectIndex: 2 }); }}>照片不合格</li>
                                           <li className={'option' + (this.state.selectIndex === 2 ? ' selected' : '')} onClick={(event) => { event.stopPropagation(); this.setState({ selected: !this.state.selected, rewardStatus: '奖励发放中', selectIndex: 3 }); }}>奖励发放中</li>
                                           <li className={'option' + (this.state.selectIndex === 2 ? ' selected' : '')} onClick={(event) => { event.stopPropagation(); this.setState({ selected: !this.state.selected, rewardStatus: '已完成', selectIndex: 4 }); }}>已完成</li>
                                         </ul>
                                       </div>
                                       <div className="jt_top" style={{ display: this.state.selected ? 'block' : 'none' }}></div>
                                     </div>
                                     <div className="pd">
                              					<div className="pada" style={{ marginLeft: '17%'}}>
                                          <span className="error"></span>
                                  					</div>
                              					</div>
                                   </div>
                                   <div className="sousu">
                                   	<input type="button" value="搜索" onClick={this.search.bind(this)}/>
                                   </div>
                                   <div className="sousu">
                                     <input type="reset" onClick={(event)=> { event.stopPropagation(); this.setState({rewardStatus: '请选择'}); }} value="重置"/>
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
            <td className="table_tittle" width="7%" onClick={this.sort.bind(this, 'rewardTime')}>奖励月份</td>
            <td className="table_tittle" width="8%" onClick={this.sort.bind(this, 'rewardStatus')}>奖励当前状态</td>
            <td className="table_tittle" width="5%" onClick={this.sort.bind(this, 'rewardAmt')}>奖励金额</td>
            <td className="table_tittle" width="6%" onClick={this.sort.bind(this, 'rewardDate')}>奖励发放时间</td>
         </tr>
          {this.props.bonus.list.map((key, value) => (
        <tr key={value} className="tr_hover" style={{ height: '80px' }}>
          {/* <td style={{ color: '#23a86c' }}><Link to={`/ma/ModifyBonusQuery/${key.storeNo}`}>{key.storeNo}</Link></td>*/}
          <td style={{ color: '#23a86c' }}>{key.storeNo}</td>
            <td style={{ fontFamily: 'Helvetica' }}>{key.storeName}</td>
            <td style={{ color: '#333333' }}>{key.rewardName}</td>
            <td style={{ fontFamily: 'Helvetica' }}>{(new Date(key.rewardTime)).getMonth() + 1 + '月'}</td>
            <td style={{ fontFamily: 'Helvetica' }}>{getStatus('rewardStatus', key.rewardStatus)}</td>
              <td style={{ fontFamily: 'Helvetica' }}>{key.rewardAmt}</td>
            <td style={{ fontFamily: 'Helvetica' }}>{yyyyMMdd(key.rewardDate)}</td>
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
)(BonusQuery);
