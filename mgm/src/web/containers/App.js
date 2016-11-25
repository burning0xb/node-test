import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../redux/modules/application';
import ErrorModal from '../components/ErrorModal';
import { asyncConnect } from 'redux-connect';
@asyncConnect([{
  promise: () => {
    return Promise.all([]);
  }
}])
class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    error: PropTypes.string,
    closeError: PropTypes.func.isRequired,
    currentIndex: PropTypes.number
  };

  static childContextTypes = {
    user: PropTypes.object
  };

  getChildContext() {
    return {
      user: this.props.user
    };
  }

  render() {
    const { error, closeError } = this.props;

    return (
      <div >
        <ErrorModal error={error} close={closeError} />
        { this.props.children }
      </div>
    );
  }
}

export default connect(
  ({ application, menu }) => ({ ...application, ...menu }),
  dispatch => ({ ...bindActionCreators(actions, dispatch) })
)(App);
