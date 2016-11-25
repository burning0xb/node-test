import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ErrorModal extends Component {

  static propTypes = {
    error: PropTypes.string,
    close: PropTypes.func.isRequired
  };

  getStyles() {
    return {
      error: { maxWidth: '720px', margin: 'auto', color: 'red' }
    };
  }

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.error}>
        <Modal show={!!this.props.error} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>系统错误</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.props.error}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
