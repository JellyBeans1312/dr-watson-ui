export const messages = (state = [], action) => {
  switch(action.type) {
    case 'ADD_MESSAGES' :
      return [...state, { message: action.messages, isUser: action.user}]
    case 'CLEAR_MESSAGES' :
      return []
    default : 
      return state
  }
}