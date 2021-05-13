import axios from 'axios'
import apiUrl from '../apiConfig'

export const pictureCreate = (user, data) => {
  return axios({
    url: apiUrl + '/pictures',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data
  })
}

export const pictureIndex = user => {
  return axios({
    url: apiUrl + '/pictures',
    method: 'GET',
    // include an authorization header, that includes our user's token
    // so the API knows who to sign out
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const galleryNoUser = () => {
  return axios({
    url: apiUrl + '/gallery',
    method: 'GET'
    // include an authorization header, that includes our user's token
    // so the API knows who to sign out
  })
}

export const pictureShow = (id) => {
  return axios({
    url: apiUrl + '/pictures/' + id,
    method: 'Get'
    // headers: {
    //   'Authorization': `Bearer ${user.token}`
    // }
  })
}

export const pictureDelete = (user, id) => {
  return axios({
    url: apiUrl + '/pictures/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
export const pictureUpdate = (id, picture, user) => {
  return axios({
    url: apiUrl + '/pictures/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { picture }
  })
}

export const userPictureShow = (user) => {
  return axios({
    url: apiUrl + '/home',
    method: 'Get',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
