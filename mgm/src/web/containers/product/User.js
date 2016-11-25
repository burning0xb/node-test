import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { ButtonGroup, Button } from 'react-bootstrap';
import InputGroup from '../../components/InputGroup';
import { createValidator, required, minLength, maxLength, oneOf, integer } from '../../utils/validation';

const statusOptions = [
  { label: '活跃', value: 'A' },
  { label: '锁定', value: 'L' }
];

const validator = createValidator({
  name: [minLength(4), maxLength(10)],
  password: [required],
  status: [required, oneOf(statusOptions.map((opt) => (opt.value)))],
  role: [required],
  pwdTries: [integer]
});

class User extends Component {

  static propTypes = {
    children: PropTypes.object,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string,
    handleReset: PropTypes.func.isRequired,
    resetText: PropTypes.string,
    submitting: PropTypes.bool.isRequired,
    readonly: PropTypes.bool.isRequired,
    role: PropTypes.array.isRequired
  };

  getStyles() {
    return {
      mainDiv: {
        maxWidth: '720px',
        margin: 'auto'
      }
    };
  }

  render() {
    const styles = this.getStyles();
    const { fields: { name, password, pwdTries, status, role },
     handleReset, resetText, handleSubmit, submitText, submitting, readonly } = this.props;
    return (
      <div style={styles.mainDiv}>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <InputGroup field={name} type="text" placeholder="name" label="用户名" disabled={readonly} required/>
          <InputGroup field={password} type="password" placeholder="password" label="密码" disabled={readonly}/>
          <InputGroup field={pwdTries} type="text" placeholder="pwdTries" label="密码尝试次数" disabled={readonly}/>
          <InputGroup field={status} type="select" placeholder="status" label="状态" disabled={readonly}>
            {statusOptions.map((opt, index) => (
              <option key={index} value={opt.value}>{opt.label}</option>
            ))}
          </InputGroup>
          <InputGroup field={role} type="select" placeholder="role" label="角色">
            { this.props.role && this.props.role.length > 0 ?
              this.props.role.map((opt, index) => (
              <option key={index} value={opt.roleId}>{opt.roleName}</option>
            )) : '' }
          </InputGroup>
          <ButtonGroup>
            <Button type="submit" bsStyle="success" disabled={submitting} onClick={handleSubmit}>
              {submitting ? <i className="fa fa-cog fa-spin"/> : <i className="fa fa-paper-plane"/>}
              {submitText ? submitText : '提交'}
            </Button>
            <Button type="reset" bsStyle="primary" disabled={submitting} onClick={handleReset}>
              <i className="fa fa-undo"/>
              {resetText ? resetText : '重置'}
            </Button>
          </ButtonGroup>
          {this.props.children}
        </form>
      </div>
    );
  }
}

User = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'product',           // a unique name for this form
  fields: ['name', 'password', 'pwdTries', 'status', 'role'], // all the fields in your form
  validate: validator     // validator for your form fields
})(User);

export default User;
