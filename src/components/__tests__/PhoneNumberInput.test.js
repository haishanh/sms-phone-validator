import React from 'react';
import PhoneNumberInput from '../PhoneNumberInput';
import { shallow } from 'enzyme';

const noop = () => {};

describe('<PhoneNumberInput />', () => {
  it('should render', () => {
    const wrapper = shallow(<PhoneNumberInput placeholder="mobile" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke onValidationChange correctly', () => {
    const onValidationChange = jest.fn();
    const fakeClickEvent = {
      preventDefault: noop,
      target: {
        value: '188'
      }
    };
    const wrapper = shallow(
      <PhoneNumberInput
        placeholder="mobile"
        onValidationChange={onValidationChange}
      />
    );
    wrapper.find('input').simulate('change', fakeClickEvent);
    expect(onValidationChange.mock.calls.length).toBe(0);
    fakeClickEvent.target.value = '18817597436';
    wrapper.find('input').simulate('change', fakeClickEvent);
    expect(onValidationChange.mock.calls.length).toBe(1);
    expect(onValidationChange.mock.calls[0][0]).toBe(true);
  });
});
