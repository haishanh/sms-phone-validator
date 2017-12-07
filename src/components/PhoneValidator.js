import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PhoneNumberInput from './PhoneNumberInput';
import SendButton from './SendButton';

function fetchMockGood() {
  const res = {
    ok: true,
    json: () => {}
  };
  return new Promise((resolve, reject) => {
    return resolve(res);
  });
}

function fetchMockBad() {
  return new Promise((resolve, reject) => {
    setTimeout(reject, 3000);
  });
}

class PhoneValidator extends Component {
  static defaultProps = {
    buttonTextDefault: '获取验证码',
    buttonTextSent: '已发送',
    placeholder: '手机号'
  };

  static propTypes = {
    buttonTextDefault: PropTypes.string,
    buttonTextSent: PropTypes.string,
    placeholder: PropTypes.string
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
    const { buttonTextDefault, buttonTextSent, placeholder } = this.props;
    const canSend = isPhoneNumberValid === true && isVerifyInProgress === false;
    const buttonText = isVerifyInProgress ? buttonTextSent : buttonTextDefault;

    return (
      <div>
        <PhoneNumberInput
          onValidationChange={this.handleOnValidationChange}
          placeholder={placeholder}
          {...this.props}
        />
        <SendButton
          text={buttonText}
          canSend={canSend}
          sendSmsBackoffTime={5}
          onCountdownStarted={this.onCountdownStarted}
          onCountdownCompleted={this.onCountdownCompleted}
          onSendFailed={this.onSendFailed}
          fetchImpl={fetchMockGood}
        />
      </div>
    );
  }
}

export default PhoneValidator;
