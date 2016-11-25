import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {push} from 'react-router-redux';
import Pagination from '../../components/Pagination';
import * as actions from '../../../redux/modules/users';
import {getStatus, getFlag} from '../../utils/status';
import {dateFormat} from '../../utils/Format';
import { Modal } from 'antd';
const confirm = Modal.confirm;
class ProductList extends Component {

  static propTypes = {
    filter: React.PropTypes.object,
    actPage: React.PropTypes.number.isRequired,
    pageCount: React.PropTypes.number,
    users: React.PropTypes.array,
    setFilter: React.PropTypes.func.isRequired,
    setActPage: React.PropTypes.func.isRequired,
    getUsers: React.PropTypes.func.isRequired,
    pushState: React.PropTypes.func.isRequired,
    removeUser: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectUsers: [],
      _status: '全部'
    };
  }

  componentWillMount() {
    this.loadUsers();
  }

  /* 自定义函数 */
  loadUsers() {
    this.props.getUsers(this.props.filter, this.props.actPage);
  }

  closeModal() {
    this.setState({showModal: false});
  }

  handleFilterSubmit = (data) => {
    this.props.setFilter(data);
  };
  search() {
    const data = {};
    if (this.refs.username.value !== '') {
      data.username = this.refs.username.value;
    }
    if (this.refs.status.innerHTML !== '') {
      data.status = getFlag('userStatus', this.refs.status.innerHTML);
    }
    this.props.setFilter(data);
  }

  handleActPageSelect(se) {
    this.props.setActPage(se.eventKey, this.props.filter);
  }

  handleRemoveUserConfirm(userId) {
    this.setState({userId: userId});
  }

  handleRemoveUser() {
    this.props.removeUser(this.state.userId, () => {
      this.closeModal();
      this.props.pushState('/ma/product');
    });
  }

  showConfirm(func) {
    confirm({
      title: '确认删除该用户吗?',
      onOk() {
        if (func) func();
      },
      onCancel() {},
    });
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="/assets/css/bj7.css" />
        <div>
          <form>
          <div>
            <div className="dyh">
              <div className="zuo_l"><span className="biaoti">用户查询</span></div>
              <div className="you_r">
                <div className="yiha">
                  <div className="sjmcinput">
                    <div className="sj_top">
                    <span className="wbknr">用户名</span>
                      <div className="inout">
                  <input type="text" data-info="none" placeholder="请输入您的交易号" ref="username" />
                  </div>
                </div>
                  </div>
                  <div className="sjmcinput">
                    <span className="wbknr">活动名称</span>
                    <div className="inout" onClick={() => { this.setState({ selected: !this.state.selected }); }}>
                      <div className="select select-zhong">
                        <div className="selected-box" style={{ border: 'none' }}><span ref="status" className="ab">{this.state._status}</span></div>
                        <div className="xljt_js"><img src="../../../../../assets/images/xl_wxz_hui	.png"/></div>
                          <ul className="option-box option-box-zhong" style={{ width: '159px', top: '-1', display: this.state.selected ? 'block' : 'none' }}>
                            <li className={'option' + (this.state.selectIndex === 0 ? ' selected' : '')} onClick={(event) => { event.stopPropagation(); this.setState({ selected: !this.state.selected, _status: '全部', selectIndex: 0 }); }}>全部</li>
                            <li className={'option' + (this.state.selectIndex === 1 ? ' selected' : '')} onClick={(event) => { event.stopPropagation(); this.setState({ selected: !this.state.selected, _status: '活跃', selectIndex: 1 }); }}>活跃</li>
                            <li className={'option' + (this.state.selectIndex === 2 ? ' selected' : '')} onClick={(event) => { event.stopPropagation(); this.setState({ selected: !this.state.selected, _status: '锁定', selectIndex: 2 }); }}>锁定</li>
                          </ul>
                      </div>
                      <div className="jt_top" style={{ display: this.state.selected ? 'block' : 'none' }}></div>
                    </div>
                  </div>
                </div>
                <div className="erha">
                     <div className="sousu">
                       <input type="Botton" readOnly onClick={this.search.bind(this)} defaultValue="搜索"/>
                     </div>
                     <div className="sousu">
                       <input type="reset" onClick={(event)=> { event.stopPropagation(); this.setState({_status: '请选择'}); }} defaultValue="重置"/>
                     </div>
                 </div>
              </div>
            </div>
          </div>
        </form>
          <Link to={ `/ma/product/productAdd` }>
            <div className="xinzeng">
              <input type="submit" defaultValue="新增" />
            </div>
          </Link>
          <div className="bg_ml">
            {this.props.users && this.props.users.length > 0 ? (
            <table cellPadding="0" cellSpacing="0">
              <thead id="thread">
                <tr className="first" style={{ height: '50px' }}>
                  <td className="table_tittle" width="4%">用户ID</td>
                  <td className="table_tittle" width="5%">用户名</td>
                  <td className="table_tittle" width="6%">用户新建时间</td>
                  <td className="table_tittle" width="7%">用户最后修改时间</td>
                  <td className="table_tittle" width="8%">状态</td>
                  <td className="table_tittle" width="8%">角色</td>
                  <td className="table_tittle" width="8%">操作</td>
                </tr>
              </thead>
              <tbody ref="tbody">
                {this.props.users.map((user, index) => (
                <tr style={{ height: '80px' }} className="tr_hover" key={index} onClick={null}>
                  <td style={{ color: '#23a86c' }}>
                    <Link to={`/ma/product/productView/${user.userId}`}>{user.userId}</Link>
                  </td>
                  <td style={{ fontFamily: 'Helvetica' }}>{user.username}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{dateFormat(user.createTime)}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{dateFormat(user.regDate)}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>{getStatus('userStatus', user.status)}</td>
                  <td style={{ fontFamily: 'Helvetica' }}>
                    <Link to={`/ma/product/roleedit/${user.userId}`}><i className="fa fa-paint-brush" /> 编辑
                    </Link>
                  </td>
                  <td style={{ fontFamily: 'Helvetica' }}>
                    <i className="fa fa-trash" onClick={() => { this.handleRemoveUserConfirm(user.userId); this.showConfirm(() => { this.handleRemoveUser(); }); }}>
                            删除</i>
                    <Link to={`/ma/product/productEdit/${user.userId}`}><i className="fa fa-paint-brush" /> 修改
                    </Link>
                  </td>
                </tr>
                )) }
              </tbody>
            </table>
            ) : (
            <p>没有搜索到符合条件的数据！</p>
            ) }
          </div>
          {/* 3.pagination here*/}
          <Pagination items={this.props.pageCount} activePage={this.props.actPage} onSelect={this.handleActPageSelect.bind(this)} style={this.props.users}/>
        </div>
      </div>
    );
  }
}

export default connect(({users}) => ({
  ...users
}), {
  ...actions,
  pushState: push
})(ProductList);
