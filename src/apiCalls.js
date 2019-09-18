export const startConversation = async feeling => {
  const url = 'https://drwatson-api.herokuapp.com/api/v1/start_session'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ feeling })
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw Error('Dr Watson is currently down.  Please try again later.')
  }

  const data = await response.json();
  console.log(data)
  return data;
}

export const postMessage = async newMessage => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({newMessage})
  }
  try {
    const response = await fetch('https://drwatson-api.herokuapp.com/api/message', options)
    const result = await response.json()
    return result
  } catch(error) {
    throw new Error('I did not want answer that question. Please try a different one')
  }
}

export const endConversation = async () => {
  const url = 'https://drwatson-api.herokuapp.com/api/v1/end_session';

  const response = await fetch(url);
  if (!response.ok) {
    throw Error('There was a problem ending the session.  Please close the application.')
  }
}