import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import * as actions from 'redux/modules/menu';
import * as actionsu from '../../../redux/modules/users';
import { connect } from 'react-redux';

@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    const promises = [];
    promises.push(dispatch(actions.flushState(4)));
    promises.push(dispatch(actionsu.getUsers({}, 1)));
    return Promise.all(promises);
  }
}])
class Product extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired
  };

  getStyles() {
    return {
      children: {
        margin: 'auto'
      }
    };
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.children}>
        { this.props.children }
      </div>
    );
  }
}
export default connect(
  ({ menu }) => ({ ...menu })
)(Product);
