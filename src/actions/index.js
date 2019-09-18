export const createUser = user => ({
  type: 'CREATE_USER',
  user
});

export const removeUser = () => ({
  type: 'REMOVE_USER'
});

export const hasErrored = errorMsg => ({
  type: 'HAS_ERRORED',
  errorMsg
});

export const addMessage = (messages, user) => ({
  type: 'ADD_MESSAGES',
  messages,
  user
});

export const clearMessage = () => ({
  type: 'CLEAR_MESSAGES'
})