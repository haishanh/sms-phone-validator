import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PhoneNumberInput from './PhoneNumberInput';
import SendButton from './SendButton';

// function fetchMockGood() {
//   const res = {
//     ok: true,
//     json: () => {}
//   };
//   return new Promise((resolve, reject) => {
//     return resolve(res);
//   });
// }

// function fetchMockBad() {
//   return new Promise((resolve, reject) => {
//     setTimeout(reject, 3000);
//   });
// }

class PhoneValidator extends Component {
  static defaultProps = {
    buttonTextDefault: '获取验证码',
    buttonTextSent: '已发送',
    placeholder: '手机号',
    sendSmsBackoffTime: 60,
    className: 'phone-validator',
    inputName: 'phoneNumber',
    fetchImpl: fetch
  };

  static propTypes = {
    buttonTextDefault: PropTypes.string,
    buttonTextSent: PropTypes.string,
    placeholder: PropTypes.string,
    sendSmsBackoffTime: PropTypes.number,
    fetchImpl: PropTypes.func
  };

  state = {
    isPhoneNumberValid: false,
    isVerifyInProgress: false
  };

  handleOnValidationChange = isPhoneNumberValid => {
    this.setState({ isPhoneNumberValid });
  };

  onCountdownStarted = () => {
    this.setState({
      isVerifyInProgress: true
    });
  };

  onCountdownCompleted = () => {
    this.setState({
      isVerifyInProgress: false
    });
  };

  onSendFailed = () => {
    this.setState({
      isVerifyInProgress: false
    });
  };

  render() {
    const { isPhoneNumberValid, isVerifyInProgress } = this.state;
    const { buttonTextDefault, buttonTextSent, className, inputName } = this.props;
    const canSend = isPhoneNumberValid === true && isVerifyInProgress === false;
    const buttonText = isVerifyInProgress ? buttonTextSent : buttonTextDefault;

    return (
      <div className={className}>
        <PhoneNumberInput
          onValidationChange={this.handleOnValidationChange}
          name={inputName}
          {...this.props}
        />
        <SendButton
          text={buttonText}
          canSend={canSend}
          onCountdownStarted={this.onCountdownStarted}
          onCountdownCompleted={this.onCountdownCompleted}
          onSendFailed={this.onSendFailed}
          {...this.props}
        />
      </div>
    );
  }
}

export default PhoneValidator;
