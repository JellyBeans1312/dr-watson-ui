export const messages = (state = [], action) => {
  switch(action.type) {
    case 'ADD_MESSAGES' :
      return action.messages
    case 'CLEAR_MESSAGES' :
      return state
    default : 
      return state
  }
}