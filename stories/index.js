import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PhoneValidator from '../src';
import './style.css';

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

// buttonTextDefault: '获取验证码',
// buttonTextSent: '已发送',
// placeholder: '手机号',
// sendSmsBackoffTime: 60,
// fetchImpl: fetch

storiesOf('PhoneValidator', module)
  .add('basic', () => <PhoneValidator className="" fetchImpl={fetchMockGood} />)
  .add('styled', () => (
    <div className="playground">
      <PhoneValidator fetchImpl={fetchMockGood} />
    </div>
  ))
  .add('可配置文本', () => (
    <div className="playground">
      <PhoneValidator
        fetchImpl={fetchMockGood}
        placeholder="📱☎️"
        buttonTextDefault="点这里发送验证码"
        buttonTextSent="请耐心等待"
      />
    </div>
  ))
  .add('可配置发送倒计时', () => (
    <div className="playground">
      <PhoneValidator fetchImpl={fetchMockGood} sendSmsBackoffTime={5} />
    </div>
  ))
  .add('发送失败重置 button 状态', () => (
    <div className="playground">
      <PhoneValidator fetchImpl={fetchMockBad} />
    </div>
  ));
