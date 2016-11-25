import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Modal } from 'antd';
import * as actions from '../../../../redux/modules/msg';
import formToJson from '../../../../web/utils/formToJson.js';
import { asyncConnect } from 'redux-connect';
// import { Link } from 'react-router';
import dataFormat from '../../../utils/DataFormat';
import { dateFormat } from '../../../utils/Format';
import { getStatus } from '../../../utils/status';
import Pagination from '../../../components/Pagination';

const confirm = Modal.confirm;
@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(actions.findAll('curPage=' + 1))
}])
class MsgManage extends Component {
  static propTypes = {
    msg: PropTypes.object,
    clearPage: PropTypes.func,
    clear: PropTypes.func,
    pushState: PropTypes.func,
    findAll: PropTypes.func,
    setPageNow: PropTypes.func,
    search: PropTypes.func,
    deleteMaterial: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      list: 1,
      msgType: '消息发布',
      liCls: {
        0: 'bg_lv',
        1: '',
        2: ''
      }
    };
  }
  componentWillMount() {
    this.props.clearPage();
    const data = {
      curPage: 1
    };
    this.props.findAll(dataFormat(data));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.msg.material === true) {
      this.props.clear();
      this.success(() => { this.props.pushState('/ma/MaterialManage'); });
    }
  }

  success(pushState) {
    Modal.success({
      title: 'This is a success message',
      content: '删除成功',
      onOk() {
        if (pushState) pushState();
      }
    });
  }

  showConfirm(materialNo) {
    const func = () => { this.props.deleteMaterial('materialNo=' + materialNo); };
    confirm({
      title: 'Are you sure you want to delete these items ?',
      onOk() {
        func();
      },
      onCancel() {},
    });
  }

  search() {
    const json = formToJson('.form-inline');
    console.log(json);
    json.curPage = 1;
    this.props.search(json, 1);
  }

  select(se) {
    const data = {
      curPage: se.eventKey,
      type: ''
    };
    if (this.props.msg.findStatus === 'findAll') {
      this.props.setPageNow(se.eventKey, dataFormat(data), 1);
    }
    if (this.props.msg.findStatus === 'search') {
      const json = this.props.msg.input;
      json.curPage = se.eventKey;
      this.props.setPageNow(se.eventKey, json, 0);
    }
  }

  render() {
    return (
      <div>
        <div className="dyh2">
          <div className="duwb" style={{ fontSize: '17px', float: 'left', marginLeft: '0px' }} onClick={() => { this.setState({ sell: !this.state.sell}); }}><span>{this.state.msgType}</span><img src="../../../../../assets/images/xl_wxz_hui.png"/>
            <div className={ this.state.sell === true ? 'xl_xz2 sell' : 'xl_xz2'} style={{ display: this.state.sell === true ? 'block' : 'none', height: '92px'}}>
              <ul>
                <li className={this.state.liCls[0]} onClick={(event) => {event.stopPropagation(); this.setState({ sell: false, msgType: '消息发布', liCls: {} }); this.setState({ liCls: {0: 'bg_lv'} });}}><span style={{ fontSize: '13px' }}>消息发布</span></li>
                <li className={this.state.liCls[1]} onClick={(event) => {event.stopPropagation(); this.setState({ sell: false, msgType: '自动回复信息', liCls: {} }); this.setState({ liCls: {1: 'bg_lv'} });}}><span style={{ fontSize: '13px' }}>自动回复信息</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg_ml">
          {this.props.msg && this.props.msg.list && this.props.msg.list.length > 0 ?
          (<table cellPadding="0" cellSpacing="0">
            <thead id="thread">
              <tr className="first" style={{ height: '50px' }}>
                <td className="table_tittle" width="4%">消息编号</td>
                <td className="table_tittle" width="5%">创建人</td>
                <td className="table_tittle" width="6%">创建时间</td>
                <td className="table_tittle" width="7%">素材类型</td>
                <td className="table_tittle" width="8%">发送区域</td>
                <td className="table_tittle" width="8%">是否发送</td>
              </tr>
            </thead>
            <tbody ref="tbody">
              {this.props.msg.list.map((key, value) => (
                <tr style={{ height: '80px' }} className="tr_hover" key={value}>
                  <td style={{ color: '#23a86c' }}>{key.manageNo}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{key.updateUser}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{dateFormat(key.updateTime)}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{getStatus('messageType', key.messageType)}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{getStatus('sendScope', key.sendScope)}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{getStatus('isSend', key.isSend)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>) : ''
        }
        </div>
        <Pagination items={this.props.msg.pageCount} activePage={this.props.msg.pageNow} onSelect={this.select.bind(this)} style={this.props.msg.list}/>
          </div>
    );
  }
}
export default connect(
  state => ({ msg: state.msg }),
  { ...actions, pushState: push }
)(MsgManage);
