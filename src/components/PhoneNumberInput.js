import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import isPhoneNumberValid from '../helpers/validatePhoneNumber';

class PhoneNumberInput extends Component {
  state = {
    value: '',
    isInputValid: false
  };

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    onValidationChange: PropTypes.func
  };

  static defaultProps = {
    onValidationChange: () => {}
  };

  handleOnChange = ev => {
    ev.preventDefault();
    const { value } = ev.target;
    const { isInputValid } = this.state;
    const isInputValidNext = isPhoneNumberValid(value);
    this.setState({ value, isInputValid: isInputValidNext });
    if (isInputValid !== isInputValidNext) {
      this.props.onValidationChange(isInputValidNext);
    }
  };

  render() {
    const { placeholder } = this.props;
    const { value } = this.state;
    return (
      <Fragment>
        <input
          type="tel"
          maxLength="11"
          placeholder={placeholder}
          value={value}
          onChange={this.handleOnChange}
        />
      </Fragment>
    );
  }
}

export default PhoneNumberInput;
