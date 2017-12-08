import React from 'react';
import SendButton from '../SendButton';
import { shallow } from 'enzyme';

import sleep from '../../helpers/sleep';

const noop = () => {};

const setTimeoutOrig = setTimeout;

const requiredProps = {
  text: 'send',
  canSend: false,
  onCountdownStarted: noop,
  onCountdownCompleted: noop,
  onSendFailed: noop
};

function fetchMockGood() {
  const res = {
    ok: true,
    json: () => {}
  };
  return new Promise(resolve => {
    return resolve(res);
  });
}

describe('<SendButton />', () => {
  it('should render into a button', () => {
    const wrapper = shallow(<SendButton {...requiredProps} />);
    expect(wrapper.html()).toEqual('<button disabled="">send</button>');
  });

  it('should render disabled property correctly', () => {
    const wrapper = shallow(<SendButton {...requiredProps} canSend={true} />);
    // console.log(wrapper.find('button').props());
    expect(wrapper.html()).toEqual('<button>send</button>');
  });

  it('should render button text correctly', () => {
    const wrapper = shallow(<SendButton {...requiredProps} text="lorem" />);
    expect(wrapper.html()).toEqual('<button disabled="">lorem</button>');
  });

  it('should invoke onCountdownStarted', () => {
    const onCountdownStarted = jest.fn();
    global.setTimeout = cb => cb();
    const wrapper = shallow(
      <SendButton
        {...requiredProps}
        canSend={true}
        fetchImpl={fetchMockGood}
        onCountdownStarted={onCountdownStarted}
      />
    );
    const btn = wrapper.find('button');
    btn.simulate('click');
    expect(onCountdownStarted.mock.calls.length).toBe(1);
  });

  it('should render remaining correctly', () => {
    const onCountdownStarted = jest.fn();
    let counter = 0;
    global.setTimeout = cb => {
      if (counter++ < 3) {
        cb();
        return true;
      }
    };
    const wrapper = shallow(
      <SendButton
        {...requiredProps}
        text="send"
        sendSmsBackoffTime={10}
        canSend={true}
        fetchImpl={fetchMockGood}
        onCountdownStarted={onCountdownStarted}
      />
    );
    wrapper.find('button').simulate('click');
    expect(onCountdownStarted.mock.calls.length).toBe(1);
    expect(wrapper.html()).toEqual('<button>(7)send</button>');
    global.setTimeout = setTimeoutOrig;
  });

  it('should invoke onCountdownCompleted', () => {
    const onCountdownCompleted = jest.fn();
    global.setTimeout = cb => {
      cb();
      return true;
    };
    const wrapper = shallow(
      <SendButton
        {...requiredProps}
        text="send"
        sendSmsBackoffTime={10}
        canSend={true}
        fetchImpl={fetchMockGood}
        onCountdownCompleted={onCountdownCompleted}
      />
    );
    wrapper.find('button').simulate('click');
    expect(onCountdownCompleted.mock.calls.length).toBe(1);
    global.setTimeout = setTimeoutOrig;
  });

  it('should invoke onSendFailed', async () => {
    const onSendFailed = jest.fn();
    const onCountdownStarted = jest.fn();
    const onCountdownCompleted = jest.fn();
    function fetchMockBad() {
      return Promise.reject();
    }
    const wrapper = shallow(
      <SendButton
        {...requiredProps}
        text="send"
        sendSmsBackoffTime={10}
        canSend={true}
        fetchImpl={fetchMockBad}
        onSendFailed={onSendFailed}
        onCountdownStarted={onCountdownStarted}
        onCountdownCompleted={onCountdownCompleted}
      />
    );
    wrapper.find('button').simulate('click');
    expect(onCountdownStarted.mock.calls.length).toBe(1);
    // ensure it throw before asserting
    await sleep(10);
    expect(onSendFailed.mock.calls.length).toBe(1);
    expect(onCountdownCompleted.mock.calls.length).toBe(0);
  });
});
