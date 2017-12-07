import React from 'react';
import PhoneValidator from '../PhoneValidator';
import PhoneNumberInput from '../PhoneNumberInput';
import SendButton from '../SendButton';
import { shallow, mount } from 'enzyme';

function sleep(t) {
  return new Promise(r => setTimeout(r, t));
}
const noop = () => {};
// const node = document.createElement('div')
function fetchMockGood() {
  const res = {
    ok: true,
    json: () => {}
  };
  return new Promise((resolve, reject) => {
    return resolve(res);
  });
}

// local helper
function getButtonText(wrapper) {
  return (
    wrapper
      .find('button')
      .text()
      // to remove "(12)" in text like "(12)sending"
      .replace(/\([\d]+?\)/, '')
  );
}

describe('<PhoneValidator />', () => {
  it('should render', () => {
    const wrapper = shallow(<PhoneValidator />);
    expect(wrapper.find(PhoneNumberInput).length).toBe(1);
    expect(wrapper.find(SendButton).length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state correctly', () => {
    // full mount
    const wrapper = mount(<PhoneValidator fetchImpl={fetchMockGood} />);
    const fakeClickEvent = {
      preventDefault: noop,
      target: {
        value: '188'
      }
    };
    wrapper.find('input').simulate('change', fakeClickEvent);
    expect(wrapper.state()).toEqual({
      isPhoneNumberValid: false,
      isVerifyInProgress: false
    });

    fakeClickEvent.target.value = '18812341234';
    wrapper.find('input').simulate('change', fakeClickEvent);
    expect(wrapper.state()).toEqual({
      isPhoneNumberValid: true,
      isVerifyInProgress: false
    });
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toEqual({
      isPhoneNumberValid: true,
      isVerifyInProgress: true
    });
  });

  it('should work as full flow', async () => {
    // full mount
    const buttonTextDefault = 'lorem-buttonTextDefault';
    const buttonTextSent = 'lorem-buttonTextSent';
    const fetchImpl = async () => {
      await sleep(10);
      throw Error('lorem');
    };
    const wrapper = mount(
      <PhoneValidator
        fetchImpl={fetchImpl}
        buttonTextDefault={buttonTextDefault}
        buttonTextSent={buttonTextSent}
      />
    );
    const fakeClickEvent = {
      preventDefault: noop,
      target: {
        value: '18812345678'
      }
    };
    expect(wrapper.find('button').props().disabled).toBe(true);
    expect(getButtonText(wrapper)).toBe(buttonTextDefault);
    expect(wrapper.state()).toEqual({
      isPhoneNumberValid: false,
      isVerifyInProgress: false
    });

    wrapper.find('input').simulate('change', fakeClickEvent);
    expect(wrapper.find('button').props().disabled).toBe(false);

    wrapper.find('button').simulate('click');
    expect(getButtonText(wrapper)).toBe(buttonTextSent);
    expect(wrapper.state()).toEqual({
      isPhoneNumberValid: true,
      isVerifyInProgress: true
    });
    await sleep(30);
    expect(wrapper.state()).toEqual({
      isPhoneNumberValid: true,
      isVerifyInProgress: false
    });
    expect(wrapper.find('button').props().disabled).toBe(true);
    expect(getButtonText(wrapper)).toBe(buttonTextDefault);
  });
});
