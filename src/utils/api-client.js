import {auth} from '../firebase'

const apiURL = process.env.REACT_APP_API_URL
const apiKEY = process.env.REACT_APP_API_KEY
function client(
  endpoint,
  {data, token, headers: customHeaders, ...customConfig} = {},
) {
  const config = token
    ? {
        method: data ? 'POST' : 'GET',
        body: data ? JSON.stringify(data) : undefined,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': data ? 'application/json' : undefined,
          ...customHeaders,
        },

        ...customConfig,
      }
    : {
        method: 'GET',
        headers: {
          ...customHeaders,
        },

        ...customConfig,
      }
  console.log(token)
  return window
    .fetch(`${apiURL}/${endpoint}apikey=${apiKEY}`, config)
    .then(async response => {
      if (response.status === 401) {
        await auth.signOut()
        window.location.assign(window.location)
        return Promise.reject({message: 'Please re-authenticate'})
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}
export {client}
