import React, { Component, PropTypes } from 'react';
import jquery from 'jquery';
let array = [];
export default class Pagination extends Component {
  static propTypes = {
    items: PropTypes.number,
    activePage: PropTypes.number,
    onSelect: PropTypes.func,
    style: PropTypes.array
  };

  componentWillMount() {
    array = [];
    for (let ii = 1; ii <= this.props.items; ii++) {
      array.push(ii);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activePage === 1) {
      array = [];
      for (let ii = 1; ii <= nextProps.items; ii++) {
        array.push(ii);
      }
    }
  }

  checkFirst(key, target) {
    if (target.next().hasClass('slh')) {
      if (key !== 1) {
        array.splice(0, 1);
        array.push(key + 1);
      } else {
        jquery('.yema').find('span').remove();
        jquery('.ymsuzi:last').before('<span class="slh">...</span>');
        array = [1, 2, 3, 4];
      }
    }
    if (target.prev().hasClass('yema_l') && key > 1) {
      array.splice(array.length - 1, 1);
      array.unshift(key - 1);
    }
    if (target.prev().hasClass('slh') && (key - 2) > 1 && key !== this.props.items) {
      jquery('.ymsuzi:last').before('<span class="slh">...</span>');
      array.splice(array.length - 1, 1);
      array.splice(1, 0, key - 1);
    }
    if (target.prev().hasClass('slh') && key === 3) {
      jquery('.yema').find('span').remove();
      jquery('.ymsuzi:last').before('<span class="slh">...</span>');
      array = [1, 2, 3, 4];
    }
  }

  checkLast(key) {
    if ((key + 2) === this.props.items && this.props.items > 5) {
      jquery('.yema').find('span').remove();
      jquery('.ymsuzi:first').after('<span class="slh">...</span>');
      array.splice(0, 1);
      array.unshift(1);
    }
  }

  click(key, el) {
    const se = {};
    se.eventKey = key;
    this.props.onSelect(se);
    this.checkFirst(key, jquery(el.target));
    this.checkLast(key);
  }

  prev() {
    const key = parseInt(jquery('.yema').find('.active').text(), 10);
    if (key > 1) {
      const se = {};
      se.eventKey = key - 1;
      this.props.onSelect(se);
      this.checkFirst(key - 1, jquery('.yema').find('.active').prev());
      this.checkLast(key - 1);
    }
  }

  next() {
    const key = parseInt(jquery('.yema').find('.active').text(), 10);
    if (key < this.props.items) {
      const se = {};
      se.eventKey = key + 1;
      this.props.onSelect(se);
      this.checkFirst(key + 1, jquery('.yema').find('.active').next());
      this.checkLast(key + 1);
    }
  }

  render() {
    array = array.length <= 5 ? array : array.slice(0, 4);
    return (
      <div className="yema" style={{ display: this.props.style && this.props.style.length > 0 ? 'block' : 'none' }}>
        <div className="yema_l" onClick={this.prev.bind(this)}><img src="../../../assets/images/syy_l.png"/><a>上一页</a></div>
        {
          array.map((key, value) => (
              <div className={parseInt(key, 10) === this.props.activePage ? 'ymsuzi active' : 'ymsuzi'} key={value} onClick={this.click.bind(this, key)}>{key}</div>
          ))
        }
        {this.props.items > 5 ? <span className="slh">...</span> : ''}
        {this.props.items > 5 ? <div className={this.props.items === this.props.activePage ? 'ymsuzi active' : 'ymsuzi'} onClick={this.click.bind(this, this.props.items)}>{this.props.items}</div> : ''}
        <div className="yema_r" onClick={this.next.bind(this)}><a>下一页</a><img src="../../../assets/images/xyy_r.png"/></div>
      </div>
    );
  }
}
