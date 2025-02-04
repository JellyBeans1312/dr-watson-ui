import React from 'react';
import { shallow } from 'enzyme';
import { WelcomeModal, mapDispatchToProps } from './WelcomeModal';
import { createUser, hasErrored, addMessage } from '../../actions';
import { startConversation } from '../../apiCalls';

jest.mock('../../apiCalls');

describe('WelcomeModal component', () => {
  let wrapper
  const mockCreateUser = jest.fn();
  const mockAddMessage = jest.fn();
  const mockHasErrored = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<WelcomeModal
      createUser={mockCreateUser}
      addMessage={mockAddMessage}
      hasErrored={mockHasErrored}
    />);
  });

  it('should match the snapshot if there are no errors', () => {
    wrapper.instance().setState({
      firstName: 'Travis',
      lastName: 'Rollins',
      feeling: 'Happy',
      error: ''
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should display an error message if not all of the inputs have been filled', () => {
    wrapper.instance().setState({
      firstName: 'Travis',
      lastName: '',
      feeling: 'Happy',
      error: 'Please make sure you have filled everything out.'
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should update state when calling handleChange', () => {
    const mockEvent = {
      target: {
        name: 'firstName',
        value: 'Travis'
      }
    }
    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('firstName')).toEqual('Travis');
  });

  it('should call createUser with correct arguments and connectToChatBot', () => {
    global.Date.now = jest.fn().mockImplementation(() => 12345);
    wrapper.instance().connectToChatBot = jest.fn();
    const mockEvent = {
      preventDefault: jest.fn()
    };

    const mockUser = {
      firstName: 'Travis',
      lastName: 'Rollins',
      feeling: 'Happy',
    };

    wrapper.instance().setState(mockUser);
    wrapper.instance().handleSubmit(mockEvent);

    expect(mockCreateUser).toHaveBeenCalledWith({ ...mockUser, id: 12345 });
    expect(wrapper.instance().connectToChatBot).toHaveBeenCalled();
  });

  it('should call startConversation and addMessage with correct arguments when connectToChatBot is called', async () => {
    const mockMessage = { 
      message: 'Hi there, my name is Dr. Watson. I understand that you have been feeling happy. That is super exciting to hear!'
    };
    startConversation.mockImplementation(() => {
      return Promise.resolve(mockMessage);
    });

    wrapper.instance().setState({ feeling: 'happy' });
    await wrapper.instance().connectToChatBot();

    expect(startConversation).toHaveBeenCalledWith('happy');
    expect(mockAddMessage).toHaveBeenCalledWith(mockMessage.message, false);
  });

  it('should call hasErrored with correct arguments if connectToChatBot rejects', async () => {
    startConversation.mockImplementation(() => {
      return Promise.reject(Error('fetch failed.'));
    });

    await wrapper.instance().connectToChatBot();

    expect(mockHasErrored).toHaveBeenCalledWith('fetch failed.');
  });

  it('should run handleChange when the inputs or select detect a change', () => {
    const mockFirstNameEvent = {
      target: {
        name: 'firstName',
        value: 'Travis'
      }
    }
    const mockLastNameEvent = {
      target: {
        name: 'lastName',
        value: 'Rollins'
      }
    }
    const mockFeelingEvent = {
      target: {
        name: 'feeling',
        value: 'happy'
      }
    }
    wrapper.instance().handleChange = jest.fn();
    wrapper.instance().forceUpdate();

    wrapper.find('input').at(0).simulate('change', mockFirstNameEvent);
    wrapper.find('input').at(1).simulate('change', mockLastNameEvent);
    wrapper.find('select').simulate('change', mockFeelingEvent);
    
    expect(wrapper.instance().handleChange).toHaveBeenCalledWith(mockFirstNameEvent);
    expect(wrapper.instance().handleChange).toHaveBeenCalledWith(mockLastNameEvent);
    expect(wrapper.instance().handleChange).toHaveBeenCalledWith(mockFeelingEvent);
  });

  it('should run formValidation on click of button', () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.instance().formValidation = jest.fn();
    wrapper.instance().forceUpdate();

    wrapper.find('button').simulate('click', mockEvent);

    expect(wrapper.instance().formValidation).toHaveBeenCalled();
  });
});

describe('mapDispatchToProps', () => {
  it('calls dispatch with a createUser action when createUser is called', () => {
    const mockUser = {
      id: 1568665187737,
      firstName: "Travis",
      lastName: "Rollins",
      feeling: "tired"
    };
    const mockDispatch = jest.fn();
    const actionToDispatch = createUser(mockUser);

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.createUser(mockUser);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('calls dispatch with a hasErrored action when hasErrored is called', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = hasErrored('fetch failed');

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.hasErrored('fetch failed');

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
  it('calls dispatch with a addMessage action when addMessage is called', () => {
    const mockMessages = [
      {messages: 'hello', isUser: false}
    ]
    
    const mockDispatch = jest.fn();
    const actionToDispatch = addMessage(mockMessages);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.addMessage(mockMessages);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
})