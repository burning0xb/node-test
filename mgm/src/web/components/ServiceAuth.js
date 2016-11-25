import React, { Component, PropTypes } from 'react';


export default class ServiceAuth extends Component {

  static propTypes = {
    name: PropTypes.func.string,
    desc: PropTypes.func.string,
    isChecked: PropTypes.func.bool,
    changeChecked: PropTypes.func.func
  };

  render() {
    return (
      <li>
        <a><input type="checkbox" name={this.props.name}
          className="treecheckbox"
          checked={ this.props.isChecked }
          onClick={ this.props.changeChecked }/>{this.props.desc}</a>
      </li>
    );
  }
}
