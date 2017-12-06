import React, { Component } from 'react';

class PhoneValidator extends Component {
  render() {
    return (
      <div>
        <input type="tel" maxLength="11" placeholder="Phone Number" />
        <button disabled>Send</button>
      </div>
    );
  }
}

export default PhoneValidator;
