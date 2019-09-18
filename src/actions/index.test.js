import * as actions from "../actions";

describe("actions", () => {
  it("should have a type of ADD_MESSAGES", () => {
    const mockMessages = [
      {
        message: 'hello',
        user: false
      },
      {
        message: 'something',
        user: true
      }
    ];
    const expectedAction = {
      type: "ADD_MESSAGES",
      messages: [
        {
          message: 'hello',
          user: false
        },
        {
          message: 'something',
          user: true
        }
      ]
    };
    const result = actions.addMessage(mockMessages);
    expect(result).toEqual(expectedAction);
  });

  it("should have a type of CLEAR_MESSAGES", () => {
    const mockMessages = [
      {
        message: 'hello',
        user: false
      },
      {
        message: 'something',
        user: true
      }
    ];
    const expectedAction = {
      type: "CLEAR_MESSAGES",
    };
    const result = actions.clearMessage(mockMessages);
    expect(result).toEqual(expectedAction);
  });
});