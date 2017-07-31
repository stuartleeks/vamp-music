export const ID_TOKEN_KEY = 'id_token'
export const ACCESS_TOKEN_KEY = 'access_token'

const CLIENT_ID = '3IZ48UMvhtQqoahvrXYrpCqcuphUDWfH'
const CLIENT_DOMAIN = 'checkly.eu.auth0.com'
const REDIRECT_URL = 'http://localhost:8081/callback'
const SCOPE = 'openid profile email user_metadata picture'

const webAuth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
})

export function login (provider, options) {
  if (provider === 'Username-Password-Authentication' && options) {
    return usernamePwdLogin(options.username, options.password)
  } else {
    socialLogin(provider)
  }
}

function socialLogin (provider) {
  webAuth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT_URL,
    audience: 'api-dev.checkly.run',
    scope: SCOPE,
    connection: provider
  })
}

function usernamePwdLogin (username, password) {
  return new Promise((resolve, reject) => {
    webAuth.client.login({
      scope: SCOPE,
      realm: 'Username-Password-Authentication',
      username,
      password
    }, (err, res) => {
      if (err) return reject(err)
      localStorage.setItem(ID_TOKEN_KEY, res.idToken)
      return resolve()
    })
  })
}

export function setTokens () {
  return new Promise((resolve, reject) => {
    webAuth.parseHash((err, res) => {
      if (err) return reject(err)
      localStorage.setItem(ID_TOKEN_KEY, res.idToken)
      localStorage.setItem(ACCESS_TOKEN_KEY, res.accessToken)
      return resolve()
    })
  })
}

export function logout () {
  clearTokens()
}

function clearTokens () {
  localStorage.removeItem(ID_TOKEN_KEY)
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export function isLoggedIn () {
  const token = getAccessToken()
  return !!token
}

export function getAccessToken () {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getIdToken () {
  return localStorage.getItem(ID_TOKEN_KEY)
}
