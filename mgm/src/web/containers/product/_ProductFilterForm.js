import React, { Component, PropTypes } from 'react';

// const statusOptions = [
//   { label: '活跃', value: 'A' },
//   { label: '锁定', value: 'L' }
// ];

class ProductFilterForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  getStyles() {
    return {
      center: {
        textAlign: 'right'
      }
    };
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="dyh">
          	<span>用户查询</span>
              <div className="sousu">
              	<input type="submit" value="搜索" onClick={handleSubmit}/>
              </div>
              <div className="sjmcinput">
                <span>用户名:</span>
                  <div className="inout"><img src="../../../../assets/images/sjmc_input.png"/><input type="text" placeholder="请输入用户名"/></div>
              </div>
              <div className="sjmcinput">
                <span>状态:</span>
                  <div className="inout"><img src="../../../../assets/images/sjmc_input.png"/><input type="text" placeholder="请输入用户名"/></div>
              </div>
              {/* <InputGroup field={status} type="select" msg="状态:" placeholder="status">
                {statusOptions.map((opt, index) => (
                  <option key={index} value={opt.value}>{opt.label}</option>
                ))}
              </InputGroup> */}
          </div>
        </form>
      </div>
    );
  }
}

export default ProductFilterForm;
