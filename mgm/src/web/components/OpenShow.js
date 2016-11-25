import React, { Component, PropTypes } from 'react';

export default class OpenShow extends Component {

  static propTypes = {
    alertMsg: PropTypes.object,
    closeMsg: PropTypes.func.isRequired
  }
  componentWillMount() {
    if (this.refs.ss) {
      this.refs.ss.innerHTML = this.props.alertMsg +
      '<div className="btn w88 mt20 bg-color-f60" onClick={this.props.closeMsg}>关闭协议</div>';
    }
  }
  getStyles() {
    return {
      show: { display: 'block' },
      hidden: { display: 'none' },
      over: { overflow: 'auto', height: 400, paddingTop: 10 },
      padding: { paddingTop: '0px' }
    };
  }

render() {
  const styles = this.getStyles();

  return (
  <section className="dialog-proto" ref="digbox" style={!!this.props.alertMsg || !this.props.closeMsg ? styles.show : styles.hidden}>
    <div className="drag"></div>

		<div className="dialog bg-fff-msg" style={styles.padding}>
      <div dangerouslySetInnerHTML={{ __html: (this.props.alertMsg ? this.props.alertMsg.__html : '') }} style={styles.over}/>
      <div onClick={this.props.closeMsg} className="btn w88 mt20 bg-color-f60">关闭协议</div>
    </div>
	</section>
  );
}
}
