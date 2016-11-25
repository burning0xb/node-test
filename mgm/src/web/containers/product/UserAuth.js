import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { goBack, push } from 'react-router-redux';
// import formToJson from '../../utils/formToJson';
import * as actions from '../../../redux/modules/role';
class UserAuth extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    getRole: PropTypes.func.isRequired,
    roleInfo: PropTypes.object.isRequired,
    getUserRole: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    userrole: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectUsers: [],
      _status: undefined,
      select: {
        0: 'option selected',
        1: 'option'
      },
    };
  }
  componentWillMount() {
    this.props.getRole();
    this.props.getUser(this.props.params.userid);
    this.props.getUserRole(this.props.params.userid);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ userId: nextProps.userInfo.userId});
    this.setState({ msg: nextProps.userrole.roleName});
    this.setState({ _roleId: nextProps.userrole.roleId});
  }
  handleSubmit(event) {
    const data = {};
    data.userId = this.refs.Uid.value;
    data.name = this.refs.name.value;
    data.roleId = this.state._roleId;
    event.preventDefault();
    this.props.update(data, () => {
      this.props.pushState('/ma/product');
    });
  }
  render() {
    return (
        <div>
          <form className="form-inline">
              <link rel="stylesheet" href="/assets/css/xgyhjs.css" />
            <div className="dyh4">
              <span className="biaoti">修改用户角色</span>
                <div className="sousu4">
                  <input type="submit" defaultValue="提交" onClick={this.handleSubmit.bind(this)}/>
                </div>
              </div>
              <div className="yhoxx">
                    <div className="yh_jiben">
                        <div className="yh_jb_top">
                            <div className="yh_jb_top_l"><img src="../../../../assets/images/jbxx_ml.png"/><span>基本信息</span></div>
                        </div>
                        <div className="yh_jb_dw">
                            <div className="gg_xx">
                                <div className="gg_xx_l"><span className="txx">用户ID：</span><span className="zjbjj" style={{fontFamily: 'Helvetica'}} ref="Uid" value={this.state.userId ? this.state.userId : '空'} >{this.props.userInfo.userId}</span></div>
                            </div>
                            <div className="gg_xx">
                                <div className="gg_xx_l"><span className="txx">用户名：</span><span className="zjbjj" style={{fontFamily: 'Helvetica'}} ref="name" value={this.props.userInfo ? this.props.userInfo.name : '空'} >{this.props.userInfo.name}</span></div>
                            </div>
                            <div className="gg_xx">
                                <div className="gg_xx_l"><span className="txx">已有角色：</span><span className="zjbjj" ref="roleName" value={this.props.userrole ? this.props.userrole.roleName : '空'}>{this.props.userrole ? this.props.userrole.roleName : '空'}</span></div>
                            </div>
                            <div className="gg_xx" style={{borderBottom: 'none'}}>
                              <div className="gg_xx_l">
                                <span className="txx">修改角色：</span>
                                <span className="zjbjj">
                                  <div className="inout" onClick={() => { this.setState({ selected: !this.state.selected }); }}>
                                    <div className="select select-zhong">
                                    <div className="selected-box" style={{ border: 'none' }}>
                                      <span ref="se" name="roleId" className="ab">{this.state.msg}</span></div>
                                    <div className="xljt_js"><img src="../../../../../assets/images/xl_wxz_hui	.png"/></div>
                                      <ul className="option-box option-box-zhong" style={{ width: '159px', top: '-1', display: this.state.selected ? 'block' : 'none' }}>
                                        <div className="gdt_ml">
                                          {this.props.roleInfo && this.props.roleInfo.role && this.props.roleInfo.role.length > 0 ?
                                             this.props.roleInfo.role.map((key, value) => (
                                              <li className={this.state.select[1]} key={value} onClick={() => {this.setState({ _roleId: key.roleId, msg: key.roleName });}}><span>{ key.roleName }</span></li>
                                            ))
                                            : ''}
                                        </div>
                                      </ul>
                                  </div>
                                  <div className="jt_top" style={{ display: this.state.selected ? 'block' : 'none' }}></div>
                                </div>
                             </span>
                             </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
        </div>
  );
  }
}
export default connect(
  ({ role }) => ({ ...role }),
   { ...actions, goBack: goBack, pushState: push }
)(UserAuth);
