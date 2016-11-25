import React, { Component, PropTypes } from 'react';

export default class InputGroup extends Component {

  static propTypes = {
    msg: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="sjmcinput">
        <span>{this.props.msg}</span>
          <div className="inout"><img src="../../../../assets/images/sjmc_input.png"/><input type="text"/></div>
      </div>
    );
  }
}
