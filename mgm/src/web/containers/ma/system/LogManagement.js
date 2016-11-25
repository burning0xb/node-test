import React, { Component, PropTypes } from 'react';
// import { Pagination } from 'react-bootstrap';
import * as actions from '../../../../redux/modules/system.js';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { asyncConnect } from 'redux-async-connect';
import formToJson from '../../../utils/formToJson';
import { hhMMss } from '../../../utils/Format.js';
import Pagination from '../../../components/Pagination';
import { getStatus, getFlag } from '../../../../web/utils/status.js';
import { subValidations, checkSpanStatus} from '../../../../web/utils/validations.js';
// import jquery from 'jquery';
const zzx = global.jQuery;
let flag = -1;
const json = {
  curPage: 1,
  type: ''
};
 @asyncConnect([{
   promise: ({ store: { dispatch } }) => dispatch(actions.findAll(json, 1))
 }])
class LogManagement extends Component {
  static propTypes = {
    system: PropTypes.object,
    OrderSearch: PropTypes.object,
    findAll: PropTypes.func,
    findAllInterface: PropTypes.func,
    search: PropTypes.func,
    searchInterface: PropTypes.func,
    setPageNow: PropTypes.func,
    hhMMss: PropTypes.func,
    sort: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      list: 1,
      pageNow: 1,
      openationType: '全部',
      msgType: '系统操作日志',
      liCls: {
        0: 'bg_lv',
        1: ''
      }
    };
  }
  componentDidMount() {
    zzx('#datePicker1').date_input();
    zzx('#datePicker2').date_input();
    zzx('.time').find('img').click((event) => {
      zzx(event.currentTarget).prev().toggle();
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.system.findStatus === 'findAll') {
      this.setState({ sell: false, msgType: '系统操作日志', liCls: {} });
      this.setState({ liCls: {0: 'bg_lv'} });
    }
    if (nextProps.system.findStatus === 'findAllInterface') {
      this.setState({ sell: false, msgType: '接口操作日志', liCls: {} });
      this.setState({ liCls: {1: 'bg_lv'} });
    }
  }
  search() {
    const json1 = formToJson('.form-inline');
    json1.operationUserId = this.refs.operationUserId.value;
    json1.operationTime1 = json1.operationTime ? json1.operationTime + 'T00:00:00.000+08:00' : json1.operationTime;
    json1.operationTime2 = json1.operationTime ? json1.operationTime + 'T23:59:59.999+08:00' : json1.operationTime;
    json1.curPage = 1;
    if (this.refs.openationType.innerHTML !== null) {
      json1.openationType = getFlag('openationType', this.refs.openationType.innerHTML);
    }
    subValidations('.time');
    if (checkSpanStatus('.sjmcinput') === true) {
      this.props.search(json1, 1);
    }
  }
  searchInterface() {
    const json2 = formToJson('.form-inlinet');
    json2.updateTime1 = json2.updateTime ? json2.updateTime + 'T00:00:00.000+08:00' : json2.updateTime;
    json2.updateTime2 = json2.updateTime ? json2.updateTime + 'T23:59:59.999+08:00' : json2.updateTime;
    json2.curPage = 1;
    subValidations('.time');
    if (checkSpanStatus('.sjmcinput') === true) {
      this.props.searchInterface(json2, 1);
    }
  }

  select(se) {
    const data = {
      curPage: se.eventKey,
    };
    if (this.props.system.findStatus === 'findAll') {
      if (this.props.system.findStatus2 === 'search') {
        const json1 = this.props.system.input;
        json1.operationTime1 = json1.operationTime ? json1.operationTime + 'T00:00:00.000+08:00' : json1.operationTime;
        json1.operationTime2 = json1.operationTime ? json1.operationTime + 'T23:59:59.999+08:00' : json1.operationTime;
        json1.curPage = se.eventKey;
        if (this.refs.openationType.innerHTML !== null) {
          json1.openationType = getFlag('openationType', this.refs.openationType.innerHTML);
        }
        this.props.search(json1, se.eventKey);
      } else {
        this.props.findAll(data, se.eventKey);
      }
    }
    if (this.props.system.findStatus === 'findAllInterface') {
      if (this.props.system.findStatus2 === 'searchInterface') {
        const json1 = this.props.system.input;
        json1.updateTime1 = json1.updateTime ? json1.updateTime + 'T00:00:00.000+08:00' : json1.updateTime;
        json1.updateTime2 = json1.updateTime ? json1.updateTime + 'T23:59:59.999+08:00' : json1.updateTime;
        json1.curPage = se.eventKey;
        this.props.searchInterface(json1, se.eventKey);
      } else {
        this.props.findAllInterface(data, se.eventKey);
      }
    }
  }
  sort(key) {
    flag = ~flag;
    this.props.sort(key, flag);
  }

render() {
  return (
    <div>
    <div className="dyh2">
      <div className="duwb" style={{ fontSize: '17px', float: 'left', marginLeft: '0px' }} onClick={() => { this.setState({ sell: !this.state.sell}); }}><span>{this.state.msgType}</span><img src="../../../../../assets/images/xl_wxz_hui.png"/>
        <div className={ this.state.sell === true ? 'xl_xz2 sell' : 'xl_xz2'} style={{ display: this.state.sell === true ? 'block' : 'none', height: '90px' }}>
          <ul>
            <li className={this.state.liCls[0]} onClick={(event) => {event.stopPropagation(); this.setState({ sell: false, msgType: '系统操作日志', liCls: {} }); this.setState({ liCls: {0: 'bg_lv'} }); this.props.findAll({curPage: 1}, 1);}}><span style={{ fontSize: '14px' }} >系统操作日志</span></li>
            <li className={this.state.liCls[1]} onClick={(event) => {event.stopPropagation(); this.setState({ sell: false, msgType: ' 接口数据日志', liCls: {} }); this.setState({ liCls: {1: 'bg_lv'} }); this.props.findAllInterface({curPage: 1}, 1);}}><span style={{ fontSize: '14px' }}>接口数据日志</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="dyh" style={{ display: this.state.liCls[0] ? 'block' : 'none' }}>
        <form className="form-inline">
            <div className="search">
                <div className="you_r">
                    <div className="yiha">
                        <div className="sjmcinput">
                          <div className="sj_top">
                          <span className="wbknr">操作人ID</span>
                            <div className="inout">
                              <input type="text" data-info="none" placeholder="请输入您的操作人ID" ref="operationUserId" name="operationUserId"/>
                            </div>
                      </div>
                        </div>
                        <div className="sjmcinput">
                          <span className="wbknr">操作功能</span>
                          <div className="inout" onClick={() => { this.setState({ selected: !this.state.selected }); }}>
                            <div className="select select-zhong">
                              <div className="selected-box" style={{ border: 'none' }}><span ref="openationType" className="ab">{this.state.openationType}</span></div>
                              <div className="xljt_js"><img src="../../../../../assets/images/xl_wxz_hui	.png"/></div>
                                <ul className="option-box option-box-zhong" style={{ top: '-1', width: '159px', display: this.state.selected ? 'block' : 'none' }}>
                                    <li className={ 'option' + (this.state.selectIndex === 0 ? ' selected' : '')} onClick={(event)=> { event.stopPropagation(); this.setState({ selected: !this.state.selected, openationType: '全部', selectIndex: 0 }); }}>全部</li>
                                    <li className={ 'option' + (this.state.selectIndex === 1 ? ' selected' : '')} onClick={(event)=> { event.stopPropagation(); this.setState({ selected: !this.state.selected, openationType: '登陆', selectIndex: 1 }); }}>登陆</li>
                                    <li className={ 'option' + (this.state.selectIndex === 2 ? ' selected' : '')} onClick={(event)=> { event.stopPropagation(); this.setState({ selected: !this.state.selected, openationType: '发放奖励', selectIndex: 2 }); }}>发放奖励</li>
                                </ul>
                            </div>
                            <div className="jt_top" style={{ display: this.state.selected ? 'block' : 'none' }}></div>
                          </div>
                        </div>
                         <div className="sjmcinput">
                              <span className="wbknr">操作时间</span>
                                <div className="time">
                            <input type="text" data-info="ydm" placeholder="请选择您的操作时间" name="operationTime" id="datePicker1" className="date_picker1" />
                            <img src="../../../../../assets/images/rili_tubiao.png"/>
                            </div>
                            <div className="pd">
                               <div className="pada" style={{ marginLeft: '71px'}}>
                                 <img src="../../../../../assets/images/icon.png"/>
                                 <span className="error"></span>
                                   </div>
                               </div>
                        </div>
                    </div>
                    <div className="erha">
                                        <div className="sousu">
                                			<input type="button" onClick={this.search.bind(this)} value="搜索"/>
                                		</div>
                                        <div className="sousu">
                                        	<input type="reset" onClick={(event)=> { event.stopPropagation(); this.setState({openationType: '全部'}); }} value="重置"/>
                                        </div>
                                	</div>
                </div>
            </div>
        </form>
    </div>
    <div className="bg_ml" style={{ display: this.state.liCls[0] ? 'block' : 'none' }}>
        {this.props.system && this.props.system.list && this.props.system.list.length > 0 ? (
        <table cellPadding="0" cellSpacing="0">
            <tbody>
                <tr className="first" style={{ height: '50px' }}>
                  <td className="table_tittle" width="5%" onClick={this.sort.bind(this, 'operationUserId')}>操作人</td>
                  <td className="table_tittle" width="6%" onClick={this.sort.bind(this, 'operationTime')}>操作时间</td>
                  <td className="table_tittle" width="7%" onClick={this.sort.bind(this, 'ip')}>IP</td>
                  <td className="table_tittle" width="8%" onClick={this.sort.bind(this, 'loginLocation')}>登陆地点</td>
                  <td className="table_tittle" width="8%" onClick={this.sort.bind(this, 'openationType')}>操作类型</td>
                  <td className="table_tittle" width="4%" onClick={this.sort.bind(this, 'operationDesc')}>操作详情</td>
                </tr>
                {this.props.system.list.map((key, value) => (
                <tr key={value} className="tr_hover" style={{ height: '80px' }}>
                    <td style={{ color: '#23a86c' }}>{key.operationUserId}</td>
                    <td style={{ fontFamily: 'Helvetica' }}>{hhMMss(key.operationTime)}</td>
                    <td style={{ fontFamily: 'Helvetica' }}>{key.ip}</td>
                    <td style={{ fontFamily: 'Helvetica' }}>{key.loginLocation}</td>
                    <td style={{ fontFamily: 'Helvetica' }}>{getStatus('openationType', key.openationType)}</td>
                    <td style={{ fontFamily: 'Helvetica' }}>{key.operationDesc}</td>
                </tr>
                )) }
            </tbody>
        </table>) :
        <p>没有搜索到符合条件的数据！</p> }
    </div>
    <div className="dyh" style={{ display: this.state.liCls[1] ? 'block' : 'none' }}>
        <form className="form-inlinet">
            <div className="search">
                <div className="you_r">
                    <div className="yiha">
                      <div className="sjmcinput">
                        <div className="sj_top">
                        <span className="wbknr">操作人名称</span>
                          <div className="inout">
                            <input type="text" data-info="none" placeholder="请输入您的操作人名称" ref="updateUser" name="updateUser"/>
                          </div>
                    </div>
                      </div>
                      <div className="sjmcinput">
                        <div className="sj_top">
                        <span className="wbknr">接口名称</span>
                          <div className="inout">
                            <input type="text" data-info="none" placeholder="请输入您的接口名称" ref="interfaceName" name="interfaceName"/>
                          </div>
                    </div>
                      </div>
                      <div className="sjmcinput">
                        <span className="wbknr">操作时间</span>
                          <div className="time">
                        <input type="text" data-info="ydm" placeholder="请选择您的操作时间" name="updateTime" id="datePicker2" className="date_picker1" />
                        <img src="../../../../../assets/images/rili_tubiao.png"/>
                    </div>
                    <div className="pd">
                       <div className="pada" style={{ marginLeft: '71px' }}>
                         <img src="../../../../../assets/images/icon.png"/>
                         <span className="error"></span>
                           </div>
                       </div>
                </div>
                    </div>
                    <div className="erha">
                      <div className="sousu">
                    <input type="button" onClick={this.searchInterface.bind(this)} value="搜索"/>
                  </div>
                      <div className="sousu">
                        <input type="reset" onClick={(event)=> { event.stopPropagation(); }} value="重置"/>
                      </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div className="bg_ml" style={{ display: this.state.liCls[1] ? 'block' : 'none' }}>
        {this.props.system && this.props.system.list && this.props.system.list.length > 0 ? (
        <table cellPadding="0" cellSpacing="0">
            <tbody>
                <tr className="first" style={{ height: '50px' }}>
                    <td className="table_tittle" width="5%" onClick={this.sort.bind(this, 'updateUser')}>操作人</td>
                    <td className="table_tittle" width="6%" onClick={this.sort.bind(this, 'updateTime')}>操作时间</td>
                    <td className="table_tittle" width="7%" onClick={this.sort.bind(this, 'ip')}>IP</td>
                    <td className="table_tittle" width="8%" onClick={this.sort.bind(this, 'loginLocation')}>登陆地点</td>
                    <td className="table_tittle" width="8%" onClick={this.sort.bind(this, 'interfaceName')}>接口名称</td>
                    <td className="table_tittle" width="4%" onClick={this.sort.bind(this, 'interfaceMessage')}>接口详情</td>
                </tr>
                {this.props.system.list.map((key, value) => (
                <tr key={value} className="tr_hover" style={{ height: '80px' }}>
                    <td style={{ color: '#23a86c' }}>{key.updateUser}</td>
                    <td style={{ fontFamily: 'Helvetica' }}>{hhMMss(key.updateTime)}</td>
                    <td style={{ fontFamily: 'Helvetica' }}>{key.ip}</td>
                    <td style={{ fontFamily: 'Helvetica' }}>{key.loginLocation}</td>
                    <td style={{ fontFamily: 'Helvetica' }}>{key.interfaceName}</td>
                    <td style={{ fontFamily: 'Helvetica' }}>{key.interfaceMessage}</td>
                </tr>
                )) }
            </tbody>
        </table>) :
        <p>没有搜索到符合条件的数据！</p> }
    </div>
    <Pagination items={this.props.system.pageCount} activePage={this.props.system.pageNow} onSelect={this.select.bind(this)} style={this.props.system.list}/>
</div>
  );
}
  }
export default connect(
   state => ({ system: state.system }),
   { ...actions, pushState }
)(LogManagement);
