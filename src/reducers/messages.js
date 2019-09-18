export const messages = (state = [], action) => {
  switch(action.type) {
    case 'ADD_MESSAGES' :
      return action.messages
    default : 
      return state
  }
}