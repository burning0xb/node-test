import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import config from 'config';
import * as storage from '../utils/browserStorage';

export default class NavbarY extends Component {

  static propTypes = {
    logout: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    user: PropTypes.object
  };

  handleClick(e) {
    e.preventDefault();
    this.props.logout(storage);
  }

  render() {
    const navItems = this.props.data.map((itemP) => {
      if (itemP.children) {
        const subNavItems = itemP.children.map((item) => {
          return (
            <LinkContainer key={item.id} to={item.href}>
              <NavItem>{item.name}</NavItem>
            </LinkContainer>
          );
        });
        return (
          <NavDropdown key={itemP.id} title={itemP.name} id={itemP.id}>
            {subNavItems}
          </NavDropdown>
        );
      }

      return (
        <LinkContainer key={itemP.id} to={itemP.href}>
          <NavItem>{itemP.name}</NavItem>
        </LinkContainer>
      );
    });

    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Camel跨境物流</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {navItems}
          </Nav>
          <Nav pullRight>
            {
              this.props.user ? ([
                <NavItem key="welcome" href="#">{this.props.user.username}</NavItem>,
                <NavItem key="logout" onClick={this.handleClick.bind(this)}>注销</NavItem>
              ]) : (
                <LinkContainer to={config.contextRoot + '/login'}>
                  <NavItem>登录</NavItem>
                </LinkContainer>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}
