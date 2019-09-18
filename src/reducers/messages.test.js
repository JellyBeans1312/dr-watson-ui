import { messages } from './messages'

describe('messagesReducer', () => {
  it("should return state if no case is met", () => {
    let mockAction = {
      type: "",
      messages: []
    };
    expect(messages(undefined, mockAction)).toEqual([]);
  });
  it("should return state if clear messages is the case", () => {
    let mockAction = {
      type: "CLEAR_MESSAGES",
      messages: [{id: 1}],
      user: false
    };
    expect(messages([], mockAction)).toEqual([]);
  });
  it("should return an array of messages if add messages is the case", () => {
    let mockAction = {
      type: "ADD_MESSAGES",
      messages: 'hello', 
      user: false
    };
    expect(messages([], mockAction)).toEqual([{ message: 'hello', isUser: false}]);
  });
})