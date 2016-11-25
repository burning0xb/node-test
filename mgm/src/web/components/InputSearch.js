import React, { Component, PropTypes } from 'react';
let lastObj = null;
export default class Search extends Component {
  static propTypes = {
    data: PropTypes.array,
    label: PropTypes.string
  };
  webChange(e) {
    const array = this.props.data;
    e.preventDefault();
    const tab = document.all('dl1');
    if (tab.rows && tab.rows.length) {
      for (let i = tab.rows.length - 1; i >= 0; i--) {
        tab.deleteRow(i);
      }
    }
    const element = this.refs.commerce;
    if (element.value) {
      const content = this.refs.commerce.value;
      if (tab.rows && tab.rows.length !== 0) {
        for (let i = tab.rows.length - 1; i >= 0; i--) {
          tab.deleteRow(i);
        }
      }
      for (let j = 0; j < array.length; j++) {
        tab.insertRow(j).insertCell().innerHTML = array[j];
      }
      for (let k = array.length - 1; k >= 0; k--) {
        if (tab.rows[k].cells[0].innerText.indexOf(content) === -1) {
          tab.deleteRow(k);
        }
      }
    }
  }
  forceBackC6() {
    if (lastObj !== null) {
      lastObj.style.background = '#CCC';
    }
  }
  fillData(Obj) {
    if (Obj.innerText !== null) {
      document.all('i1').value = Obj.innerText;
    }
  }
  init() {
    const Layer1 = this.refs.Layer1;
    const tab = document.all('dl1');
    const data = this.props.data;
    const i1 = this.refs.commerce;
    let i = 0;
    if (tab.rows.length === 0) {
      for (i = 0; i < data.length; i++) {
        tab.insertRow(i).style.width = '110px';
        tab.insertRow(i).insertCell().innerHTML = data[i];
      }
    }
    Layer1.style.top = i1.offsetTop + 40;
    Layer1.style.left = i1.offsetLeft;
    Layer1.style.display = 'block';
  }
  hideBelow() {
    const Layer1 = this.refs.Layer1;
    Layer1.style.display = 'none';
  }
  // backC6() {
  //   event.srcElement.style.background = '#eeeeee';
  // }
  backBlack(e) {
    // event.srcElement.style.background = 'gray';
    this.forceBackC6();
    if (event.srcElement.tagName === 'REACT') {
      lastObj = e.target;
    }
    this.fillData(lastObj);
  }
  render() {
    const { label } = this.props;
    return (
        <div>
          <label>{label}</label>
            <input style={{ height: '30xp' }} placeholder="请输入所属电商" ref="commerce" onChange={this.webChange.bind(this)} type="text" id="i1" onFocus={this.init.bind(this)} onBlur={this.hideBelow.bind(this)} />
              <div ref="Layer1" style={{ background: '#fff', position: 'absolute', height: '180px', overflow: 'auto', display: 'none', zIndex: '9999', width: 'auto' }}>
              <table id="dl1" style={{ cellspacing: '1px', display: 'hidden', width: '170px' }} onMouseOver={this.backBlack.bind(this)} border="0" >
              </table>
            </div>
        </div>
  );
  }
}
