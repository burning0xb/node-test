import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../../components/Pagination';
import * as actions from '../../../../redux/modules/controller/bail';
import { getStatus, getFlag } from '../../../utils/status.js';
import { dateFormat } from '../../../utils/Format.js';
import { clearValidations, subValidations, checkSpanStatus, runValidations } from '../../../../web/utils/validations.js';
import config from './../config';
import jquery from 'jquery';
import formToJson from '../../../utils/formToJson';

class SearchTrade extends Component {
  static propTypes = {
    bail: PropTypes.object,
    sort: PropTypes.func,
    clearPage: PropTypes.func,
    findAll: PropTypes.func,
    search: PropTypes.func,
    setPageNow: PropTypes.func,
    fetchPage: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectUsers: [],
      tradeType: '请选择'
    };
  }

  componentWillMount() {
    this.props.clearPage();
    const data = {
      curPage: 1
    };
    this.props.findAll(data);
  }

  componentDidMount() {
    jquery('#datePicker1').date_input();
    jquery('.time').find('img').click((event) => {
      jquery(event.currentTarget).prev().toggle();
    });
  }

  downloadExc(ev) {
    ev.preventDefault();
    const path = '..' + config.servicePath + '/export/statistics';
    this.refs.myImg.href = path;
    this.refs.myImg.click();
  }

  check(en) {
    runValidations(en.target);
  }
  search() {
    const data = formToJson('.form');
    data.curPage = 1;
    if (this.refs.tradeType.innerHTML !== null) {
      data.tradeType = getFlag('tradeType', this.refs.tradeType.innerHTML);
    }
    clearValidations('.inout');
    subValidations('.inout');
    subValidations('.time');
    if (checkSpanStatus('.sjmcinput') === true) {
      this.props.search(data, 1);
    }
  }

  handleActPageSelect(se) {
    this.props.fetchPage(se.eventKey);
  }

  render() {
    return (
      <div>
          <link rel="stylesheet" href="/assets/css/bj3.css" />
       <div className="dyh">
         <form className="form">
          <div className="zuo_l"><span className="biaoti">账单详情</span></div>
          <div className="you_r">
          	<div className="yiha">
              <div className="sjmcinput">
                <div className="sj_top">
                <span className="wbknr">交易编号</span>
                  <div className="inout">
              <input type="text" data-info="nm" placeholder="请输入您的交易号" ref="tradeNo" name="tradeNo"/>
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
                <span className="wbknr">交易金额</span>
                  <div className="inout">
              <input type="text" data-info="nm" placeholder="请输入您的交易金额" ref="tradeAmt" name="tradeAmt"/>
              </div>
              <div className="pd">
                 <div className="pada">
                   <img src="../../../../../assets/images/icon.png"/>
                   <span className="error"></span>
                     </div>
                 </div>
            </div>
              </div>
            <div className="sousu">
              <input type="button" onClick={this.search.bind(this)} value="搜索"/>
            </div>
          </div>
        	<div className="erha">
            <div className="sjmcinput">
              <div className="sj_top">
              <span className="wbknr">交易时间</span>
                <div className="time">
            <input type="text" data-info="ydm" placeholder="请选择您的交易时间" name="tradeTime" id="datePicker1" className="date_picker1" />
            <img src="../../../../../assets/images/rili_tubiao.png"/>
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
                <span className="wbknr">交易类型</span>
                <div className="inout" onClick={() => { this.setState({ selected: !this.state.selected }); }}>
                  <div className="select select-zhong">
                    <div className="selected-box" style={{ border: 'none' }}><span ref="tradeType" className="ab">{this.state.tradeType}</span></div>
                    <div className="xljt_js"><img src="../../../../../assets/images/xl_wxz_hui	.png"/></div>
                  <ul className="option-box option-box-zhong" style={{ width: '159px', top: '-1', display: this.state.selected ? 'block' : 'none' }}>
                    <li className={'option' + (this.state.selectIndex === 0 ? ' selected' : '')} onClick={(event) => { event.stopPropagation(); this.setState({ selected: !this.state.selected, tradeType: '请选择', selectIndex: 0 }); }}>请选择</li>
                    <li className={'option' + (this.state.selectIndex === 1 ? ' selected' : '')} onClick={(event) => { event.stopPropagation(); this.setState({ selected: !this.state.selected, tradeType: '出账', selectIndex: 1 }); }}>出账</li>
                    <li className={'option' + (this.state.selectIndex === 2 ? ' selected' : '')} onClick={(event) => { event.stopPropagation(); this.setState({ selected: !this.state.selected, tradeType: '入账', selectIndex: 2 }); }}>入账</li>
                    </ul>
                  </div>
                  <div className="jt_top" style={{ display: this.state.selected ? 'block' : 'none' }}></div>
                </div>
              </div>
              <div className="sousu">
                <input type="reset" onClick={(event)=> { event.stopPropagation(); this.setState({tradeType: '请选择'}); }} value="重置"/>
              </div>
          </div>
                </div>
                </form>
            </div>
             <div className="xinzeng">
              <input type="submit" onClick={this.downloadExc.bind(this)} value="导出"/>
              <a href="" ref="myImg" target="_self" className="hidden" style={{display: 'none'}}>文档</a>
            </div>
            <div className="bg_ml">
              {this.props.bail && this.props.bail.list && this.props.bail.list.length > 0 ?
              (<table cellPadding= "0" cellSpacing= "0" >
                <thead id="thread">
                  <tr className="first" style={{ height: '50px' }} >
                    <td className="table_tittle" width="4%">交易编号</td>
                    <td className="table_tittle" width="5%">交易类型</td>
                    <td className="table_tittle" width="6%">交易金额</td>
                    <td className="table_tittle" width="7%">交易详情</td>
                    <td className="table_tittle" width="8%">交易时间</td>
                  </tr>
                </thead>
                <tbody ref="tbody">
                  {this.props.bail.list.map((key, value) => (
                    <tr style={{ height: '80px' }} className="tr_hover" key = {value}>
                      <td style={{ color: '#23a86c' }}>{key.tradeNo}</td>
                      <td style={{ fontFamily: 'Helvetica' }}>{getStatus('tradeType', key.tradeType)}</td>
                      <td style={{ color: '#333333' }}>{key.tradeAmt}</td>
                      <td style={{ fontFamily: 'Helvetica' }}>{key.tradeDetail}</td>
                      <td style={{ fontFamily: 'Helvetica' }}>{dateFormat(key.tradeTime)}</td>
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
)(SearchTrade);
