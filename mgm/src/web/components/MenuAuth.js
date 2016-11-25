/*import React, { Component, PropTypes } from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import ServiceAuth from './ServiceAuth';
import Update from 'react-addons-update';

export default class MenuAuth extends Component {

  constructor(props) {
    super(props);
    console.log("con");
    this.state = {
      isChecked: {}
    };
  }

  componentWillMount(){
    console.log("mount");
    this.setState(
      {
        isChecked: this.props.isChecked
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        isChecked: nextProps.isChecked
      }
    )
  }

  changeChildChecked() {
    const newState = Update(this.state, {
        isChecked : {
          parent: {
              children: {
                product: { $set: !this.state.isChecked.parent.children.product }
              }
          }
        }
    });
    this.setState(newState);
  }

  render() {
    return (
      <Col lg={4}>
        <ul className="nav nav-list sidenav" id="root">
          <li>
            <a><span className="glyphicon glyphicon-minus" ></span>
            <input type="checkbox" name={this.props.name}
              checked = {this.state.isChecked.parent.isChecked}
              onClick = {this.props.change}
              className="treecheckbox"/> {this.props.desc}</a>

            <ul style={{ paddingLeft: '20px' }} className="nav collapse in" ref="id" id="role">
              <ServiceAuth key='product' name='product' desc='角色管理'
                isChecked={this.state.isChecked.parent.children['product']}
                changeChecked={this.changeChildChecked.bind(this)}/>

            </ul>
        </li>
      </ul>
    </Col>
  );
}
}*/
