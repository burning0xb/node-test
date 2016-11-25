import React, { Component, PropTypes } from 'react';

export default class SuccessModal extends Component {

  static propTypes = {
    success: PropTypes.string,
    closeSuccess: PropTypes.func.isRequired
  }

  getStyles() {
    return {
      show: { display: 'block' },
      hidden: { display: 'none' }
    };
  }

render() {
  const styles = this.getStyles();

  return (
  <section onClick={this.props.closeSuccess} className="dialog-box" ref="digbox" style={this.props.success || !this.props.closeSuccess ? styles.show : styles.hidden}>
		<div className="drag"></div>
		<div className="dialog bg-fff-opacity">
			{this.props.success}
		</div>
	</section>
  );
}
}
