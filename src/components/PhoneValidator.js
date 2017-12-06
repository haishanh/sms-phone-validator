import React, { Component } from 'react';

import PhoneNumberInput from './PhoneNumberInput';

class PhoneValidator extends Component {
  render() {
    return (
      <div>
        <PhoneNumberInput
          onValidationChange={s => {
            console.log(s);
          }}
          {...this.props}
        />
        <button disabled>Send</button>
      </div>
    );
  }
}

// <input type="tel" maxLength="11" placeholder={placeholder} />
export default PhoneValidator;
