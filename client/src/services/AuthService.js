import Router from 'next/router'
import cookie from 'react-cookie'
import persist from 'libraries/persist'

export const authenticate = async (req, res) => {
  const user = req ? req.user : getAuthUser()

  if (user) {
    return user
  }
  // req ? res.redirect('/login') : Router.push('/login');
  if (req) {
    res.redirect('/login')
  } else {
    Router.push('/login')
  }
}

export const login = (token, user) => {
  cookie.save('token', token, { path: '/', maxAge: 24 * 60 * 60 })
  try {
    window.localStorage.setItem('user', JSON.stringify(user))
    persist.willSetSessionToken(token)
  } catch (err) {
    throw err
  }
  Router.push('/workspace')
}

export const logout = () => {
  window.localStorage.removeItem('user')
  cookie.remove('token', { path: '/' })
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  window.localStorage.setItem('logout', Date.now())
  persist.willRemoveSessionToken()
  Router.push('/')
}

export const getToken = () => cookie.load('token')

const getAuthUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem('user'))
  } catch (err) {
    return null
  }
}
