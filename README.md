## `<PhoneValidator />` [![Build Status](https://travis-ci.org/haishanh/sms-phone-validator.svg?branch=master)](https://travis-ci.org/haishanh/sms-phone-validator)

## Usage

```jsx
<PhoneValidator
  placeholder="Phone Number"
  buttonTextDefault="Send"
  buttonTextSent="Wait"
/>
```

## Props

name | type | optional | description
---- | --- | --- | ---
buttonTextDefault | `string` | Yes, default to `获取验证码` | 按钮处于不可点击时显示的文本
buttonTextSent | `string` | Yes, default to `已发送` | 按钮点击后显示的文本
placeholder | `string` | Yes, default to `手机号` | 手机号输入框 palceholder 文本
sendSmsBackoffTime | `number` | Yes, default to `60` | 允许再次发送验证码的时间间隔
className | `string` | Yes, default to `phone-validator` | 应用于该 component 顶层 div 的 class 名字
inputName | `string` | Yes, default to `phoneNumber` | 手机号输入框上的`name`属性
fetchImpl | `func` | Yes, default to `window.fetch` | 用于调用发送短信验证码 API 的 request lib, 暴露出来方便测试

## Development

First:

```bash
# clone the repo
git clone git@github.com:haishanh/sms-phone-validator.git
cd sms-phone-validator

# install depencies
yarn
```

[Storybook] is used in this project to demo the usage of this component. But it helps the development.

Simple run:

```bash
yarn run storybook
```

Then open `http://localhost:9001` you see the Storybook page. This page has the Webpack HMR magic builtin in, so you can just update the code in `src/` and see the impact of changes imediately.

Checkout `stories/index.js` to see how different stories was composed.

To generate the static build of the Storybook, run:

```bash
yarn run storybook:build
```

The generated assets will be in `.out`. And this diectory is ready to be deployed GitHub gh-pages, netlify, etc.

[Storybook]: https://storybook.js.org/

## Test

```bash
# clone the repo
git clone git@github.com:haishanh/sms-phone-validator.git
cd sms-phone-validator

# install depencies
yarn

# run test
yarn run jest
```
