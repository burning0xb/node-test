import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Modal } from 'antd';
// import { Pagination } from 'react-bootstrap';
import * as actions from '../../../../redux/modules/material';
import formToJson from '../../../../web/utils/formToJson.js';
import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router';
import dataFormat from '../../../utils/DataFormat';
import { dateFormat } from '../../../utils/Format';
import { getStatus } from '../../../utils/status';
import Pagination from '../../../components/Pagination';

const confirm = Modal.confirm;
@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(actions.findAll('curPage=' + 1))
}])
class MaterialManage extends Component {
  static propTypes = {
    material: PropTypes.object,
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
      list: 1
    };
  }
  componentWillMount() {
    this.props.clearPage();
    const data = {
      curPage: 1,
      type: 'S'
    };
    this.props.findAll(dataFormat(data));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.material.material === true) {
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
    if (this.props.material.findStatus === 'findAll') {
      this.props.setPageNow(se.eventKey, dataFormat(data), 1);
    }
    if (this.props.material.findStatus === 'search') {
      const json = this.props.material.input;
      json.curPage = se.eventKey;
      this.props.setPageNow(se.eventKey, json, 0);
    }
  }

  render() {
    return (
      <div>
        <div className="dyh">
          <div className="zuo_l"><span className="biaoti">图文管理</span></div>
            <div className="sousu" style={{ float: 'right' }}>
            	<input type="submit" value="上传素材" onClick={() => { this.props.pushState('/ma/addMaterial'); }}/>
            </div>
        </div>
        <div className="bg_ml">
          {this.props.material && this.props.material.list && this.props.material.list.length > 0 ?
          (<table cellPadding="0" cellSpacing="0">
            <thead id="thread">
              <tr className="first" style={{ height: '50px' }}>
                <td className="table_tittle" width="4%">素材编号</td>
                <td className="table_tittle" width="5%">创建人</td>
                <td className="table_tittle" width="6%">创建时间</td>
                <td className="table_tittle" width="7%">素材类型</td>
                <td className="table_tittle" width="8%">操作</td>
              </tr>
            </thead>
            <tbody ref="tbody">
              {this.props.material.list.map((key, value) => (
                <tr style={{ height: '80px' }} className="tr_hover" key={value}>
                  <td style={{ color: '#23a86c' }}>{key.materialNo}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{key.updateUser}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{dateFormat(key.updateTime)}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{getStatus('relationType', key.relationType)}</td>
                  <td style={{ fontFamily: 'Helvetica' }}><span onClick={this.showConfirm.bind(this, key.materialNo)} style={{ display: key.isSend === 'N' ? 'inline' : 'none' }}><i className="fa fa-trash"/> 删除 </span><Link to={`/ma/materialDetail/${key.materialNo}`}><i className="fa fa-navicon"/> 详情</Link></td>
                </tr>
              ))
            }
          </tbody>
        </table>) : <p>没有搜索到符合条件的数据！</p>
        }
        </div>
        <Pagination items={this.props.material.pageCount} activePage={this.props.material.pageNow} onSelect={this.select.bind(this)} style={this.props.material.list}/>
    </div>
    );
  }
}
export default connect(
  state => ({ material: state.material }),
  { ...actions, pushState: push }
)(MaterialManage);
