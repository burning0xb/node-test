import React, { Component, PropTypes } from 'react';
import jsonData from './auths.json';
import { Button } from 'antd';
import { Row, Col, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actions from 'redux/modules/role';

const setting = {
  check: {
    enable: true,
    chkStyle: 'checkbox',
    chkboxType: { 'Y': 'ps', 'N': 'ps' }
  },
  data: {
    simpleData: {
      enable: true
    }
  }
};

class Ztree extends Component {

  static propTypes = {
    editRoleId: PropTypes.number.isRequired,
    editRoleName: PropTypes.string.isRequired,
    editAuthority: PropTypes.array.isRequired,
    updateRole: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  // 依赖jquery组件的初始化都放在componentDidMount里，
  // 保证后端不会去执行jquery
  componentDidMount() {
    this.initTree(this.props.editAuthority);
  }

  componentWillUpdate(nextProps) {
    // ID相同，表示只修改了姓名，不用重新加载该角色的权限
    if (this.props.editRoleId !== nextProps.editRoleId) {
      this.initTree(nextProps.editAuthority);
    }
  }

  onSubmit() {
    const zTree = global.jQuery.fn.zTree.getZTreeObj('treeDemo');
    const checkedNodes = zTree.getCheckedNodes(true);
    const auths = [];
    for (const zNode of checkedNodes) {
      auths.push(zNode.id);
    }

    event.preventDefault();
    const filter = {
      'roleId': this.props.editRoleId,
      'roleName': this.props.editRoleName,
      'authority': auths
    };

    this.props.updateRole(filter, () => {
      this.props.pushState('/ma');
    });
  }

  initTree(auths) {
    const zNodes = JSON.parse(JSON.stringify(jsonData.auths)); // deep copy
    if (auths) {
      for (const auth of auths) {
        for (const checkBox of zNodes) {
          if (checkBox.id === auth) {
            checkBox.checked = true;
          }
        }
      }
    }
    global.jQuery.fn.zTree.init(global.jQuery('#treeDemo'), setting, zNodes);
  }

  render() {
    return (
      <div>
        <div className="zTreeDemoBackground left">
          <ul id="treeDemo" className="ztree"></ul>
        </div>

        <div className="search">
          <Row>
            <Col lg={12}>
              <ButtonGroup className="pull-right">
                <Button type="primary" onClick={this.onSubmit.bind(this)}>
                  <i className="fa fa-search"/>提交
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ role }) => ({ ...role }),
  { ...actions, pushState: push }
)(Ztree);
