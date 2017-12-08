import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import sendSms from '../helpers/sendSms';

class SendButton extends Component {
  initialState = {
    remaining: -1,
    tickingTimeoutId: null
  };

  state = this.initialState;

  static defaultProps = {
    sendSmsBackoffTime: 60,
    fetchImpl: window.fetch
  };

  static propTypes = {
    sendSmsBackoffTime: PropTypes.number,
    fetchImpl: PropTypes.func,
    text: PropTypes.string.isRequired,
    canSend: PropTypes.bool.isRequired,
    onCountdownStarted: PropTypes.func.isRequired,
    onCountdownCompleted: PropTypes.func.isRequired,
    onSendFailed: PropTypes.func.isRequired
  };

  ticking(remaining, callback) {
    this.setState({ remaining });
    if (remaining >= 1) {
      const tickingTimeoutId = setTimeout(() => {
        this.ticking(remaining - 1, callback);
        // zhi yao jiu jiu ba
      }, 998);
      this.setState({ tickingTimeoutId });
    } else {
      this.setState({ tickingTimeoutId: null });
      callback();
    }
  }

  stopCountdown = () => {
    clearTimeout(this.state.tickingTimeoutId);
    this.setState(this.initialState);
  };

  handleButtonOnClick = () => {
    const { fetchImpl } = this.props;
    sendSms(fetchImpl).catch(() => {
      this.stopCountdown();
      this.props.onSendFailed();
    });
    const { sendSmsBackoffTime } = this.props;
    this.props.onCountdownStarted();
    this.ticking(sendSmsBackoffTime, this.props.onCountdownCompleted);
  };

  componentWillUnmount() {
    const { tickingTimeoutId } = this.state;
    if (tickingTimeoutId) clearTimeout(tickingTimeoutId);
    this.setState(this.initialState);
  }

  render() {
    const { canSend, text } = this.props;
    const { remaining, tickingTimeoutId } = this.state;
    let buttonText = text;
    if (tickingTimeoutId) {
      // tick in progress
      buttonText = `(${remaining})${text}`;
    }
    return (
      <Fragment>
        <button disabled={!canSend} onClick={this.handleButtonOnClick}>
          {buttonText}
        </button>
      </Fragment>
    );
  }
}

export default SendButton;
