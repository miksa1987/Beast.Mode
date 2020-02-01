import axios from 'axios'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const get = async (uri) => {
  const config = { headers: { Authorization: token }}
  const result = await axios.get(uri, config)
  return result.data
}

const post = async (uri, data, headers) => {
  const config = { headers: { ...headers, Authorization: token }}
  const result = await axios.post(uri, data, config)
  return result.data
}

const postImage = async (imageFile) => {
  const data = new FormData()
  data.append('image', imageFile)

  const config = { headers: {
    Authorization: token,
    'content-type': 'multipart/form-data'
  }}

  const response = await axios.post('/image/new', data, config)
  return response.data.imageuri
}

const update = async (uri, data) => {
  const config = { headers: { Authorization: token }}
  const result = await axios.put(uri, data, config)
  return result.data
}

const destroy = async (uri) => {
  const config = { headers: { Authorization: token }}
  const result = await axios.delete(uri, config)
  return result.data
}

export default { setToken, get, post, postImage, update, destroy }