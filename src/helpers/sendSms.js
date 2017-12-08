'use strict';

// assuming the api baseURL is under same domain as the frontend hosting
// normally this should be put into a separate file, e.g. constants.js
const API_ENDPOINT = '/api/sms/code';

export default function sendSms(whichFetch) {
  const fetchImpl = whichFetch ? whichFetch : window.fetch;
  return fetchImpl(API_ENDPOINT, { method: 'POST' }).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('faild to send sms verification code');
  });
}
