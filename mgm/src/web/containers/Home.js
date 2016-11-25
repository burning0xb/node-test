import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

  render() {
    return (
      <div className="pic"><img src="../../../assets/images/index.png"/></div>
    );
  }
}

export default connect(
)(Home);
