export const messages = (state = [], action) => {
  switch(action.type) {
    case 'ADD_MESSAGES' :
      return [{ message: action.messages, isUser: action.user}]
    case 'CLEAR_MESSAGES' :
      return state
    default : 
      return state
  }
}