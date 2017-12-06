import React, { Component } from 'react';

import PhoneNumberInput from './PhoneNumberInput';

class PhoneValidator extends Component {
  state = {
    isPhoneNumberValid: false,
    isVerifyInProgress: false
  };

  handleOnValidationChange = isPhoneNumberValid => {
    this.setState({ isPhoneNumberValid });
  };

  render() {
    const { isPhoneNumberValid, isVerifyInProgress } = this.state;
    const canSend = isPhoneNumberValid === true && isVerifyInProgress === false;

    return (
      <div>
        <PhoneNumberInput
          onValidationChange={this.handleOnValidationChange}
          {...this.props}
        />
        <button disabled={!canSend}>Send</button>
      </div>
    );
  }
}

export default PhoneValidator;
