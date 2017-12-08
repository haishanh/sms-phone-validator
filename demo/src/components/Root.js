import React, { Component } from 'react';

import PhoneValidator from 'sms-phone-validator';

function fetchMockGood() {
  const res = {
    ok: true,
    json: () => {}
  };
  return new Promise((resolve, reject) => {
    return resolve(res);
  });
}

class WhateverForm extends Component {
  render() {
    return <PhoneValidator fetchImpl={fetchMockGood} />;
  }
}

export default WhateverForm;
