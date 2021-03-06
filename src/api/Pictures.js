import axios from 'axios'
import apiUrl from '../apiConfig'

export const pictureCreate = (user, data) => {
  return axios({
    url: apiUrl + '/posts-pictures',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data
  })
}

export const pictureCreateNy = (user, data) => {
  return axios({
    url: apiUrl + '/ny-posts-pictures',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data
  })
}

export const pictureCreateDc = (user, data) => {
  return axios({
    url: apiUrl + '/dc-posts-pictures',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data
  })
}

export const pictureCreateLa = (user, data) => {
  return axios({
    url: apiUrl + '/la-posts-pictures',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data
  })
}

export const pictureCreateSe = (user, data) => {
  return axios({
    url: apiUrl + '/se-posts-pictures',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data
  })
}

export const pictureCreateParis = (user, data) => {
  return axios({
    url: apiUrl + '/paris-posts-pictures',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data
  })
}

export const pictureCreateTokyo = (user, data) => {
  return axios({
    url: apiUrl + '/tokyo-posts-pictures',
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

export const pictureShowNy = (id) => {
  return axios({
    url: apiUrl + '/ny-posts/' + id,
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
