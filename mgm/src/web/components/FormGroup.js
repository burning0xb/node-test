import React, { Children, Component, PropTypes } from 'react';
import {
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap';
import * as validators from '../../redux/utils/validators';
export default class FormGroup extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    xs: PropTypes.array,
    sm: PropTypes.array,
    md: PropTypes.array,
    lg: PropTypes.array,
    label: PropTypes.string,
    bsSize: PropTypes.string,
    onError: PropTypes.func,
    onValid: PropTypes.func,
    required: PropTypes.bool,
    lengthRange: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.validators = validators.buildValidators(this.props);
    this.validate.bind(this);
    this.getError.bind(this);
  }

  getError() {
    return this.state.error;
  }

  validate() {
    const input = this.refs.input;
    return validators.validate(
      this.validators,
      this.props.label,
      input.value,
      msg => {
        this.setState({ error: msg });
        if (this.props.onError) {this.props.onError({ [input.name]: msg });}
      },
      () => {
        if (this.state.error) {
          this.setState({ error: undefined });
          if (this.props.onValid) {this.props.onValid(input.name);}
        }
      }
    );
  }

  render() {
    const requiredStyle = { color: 'red' };
    const labelClass = `${this.props.xs ? ` col-xs-${this.props.xs[0]}` : ''}${this.props.sm ? ` col-sm-${this.props.sm[0]}` : ''}${this.props.md ? ` col-md-${this.props.md[0]}` : ''}${this.props.lg ? ` col-lg-${this.props.lg[1]}` : ''}`;
    const inputClass = `${this.props.xs ? ` col-xs-${this.props.xs[1]}` : ''}${this.props.sm ? ` col-sm-${this.props.sm[1]}` : ''}${this.props.md ? ` col-md-${this.props.md[1]}` : ''}${this.props.lg ? ` col-lg-${this.props.lg[1]}` : ''}`;
    const error = <Tooltip id={this.props.label}>{this.state.error}</Tooltip>;
    let input = Children.only(this.props.children);
    input = React.cloneElement(input, { ref: 'input' });
    return (
      <div className={`form-group ${this.props.bsSize ? `form-group-${this.props.bsSize}` : ''} ${this.state.error ? 'has-error' : ''}`} onBlur={this.validate.bind(this)}>
        {this.props.label ? <label className={`control-label${labelClass}`}>{this.props.label}{this.props.required ? <span style={requiredStyle}>*</span> : ''}</label> : ''}
        <div className={inputClass}>
          {
            this.state.error ?
            <OverlayTrigger placement="top" overlay={error}>
              {input}
            </OverlayTrigger>
            :
            input
          }
        </div>
      </div>
    );
  }
}
