import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Modal } from 'antd';
import { ButtonGroup, Row, Col } from 'react-bootstrap';
import formToJson from '../../utils/formToJson';
import * as actions from '../../../redux/modules/role';
import jquery from 'jquery';
class RoleAdd extends Component {
  static propTypes = {
    addRole: PropTypes.func.isRequired,
    pushState: PropTypes.func
  };

  success(pushState) {
    Modal.success({
      title: 'This is a success message',
      content: '添加成功',
      onOk() {
        if (pushState) pushState();
      }
    });
  }

  addRole() {
    if (jquery('#roleName').val() === '') {
      jquery('#roleName').next('i').html('不能为空');
      return;
    }
    jquery('#roleName').next('i').html('');
    this.props.addRole(formToJson('.form-inline'), () => {
      this.success(() => {this.props.pushState('/ma/roleEdit');});
    });
  }
  render() {
    return (
        <div>
          <div className="header">
            <h1 className="page-title">新增角色</h1>
          </div>
          <form className="form-inline">
            <div className="search">
              <div className="form-group search-text">
                <label>角色名<i className="fa fa-asterisk required"></i></label>
                <input type="text" required name="roleName" placeholder="请输入角色名称" id="roleName"/>
                <i className="error"/>
              </div>
            </div>
            <div className="search">
              <Row>
                <Col lg={6}>
                  <ButtonGroup className="pull-right">
                    <Button type="primary" onClick={this.addRole.bind(this)}>
                       <i className="fa fa-search"/>提交
                    </Button>
                    <Button type="primary" onClick={ () => { window.history.go(-1); } }>
                      <i className="fa fa-undo"/> 返回
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </div>
          </form>
        </div>
  );
  }
}
export default connect(
  ({ role }) => ({ ...role }),
  { ...actions, pushState: push }
)(RoleAdd);
