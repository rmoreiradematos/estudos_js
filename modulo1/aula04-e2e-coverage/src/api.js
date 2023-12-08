const http = require('http')
const DEFAULT_USER = { username: 'RodrigoMatos', password: '123' }
const { once } = require('events')
const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page')
    return response.end()
  },
  '/login:post': async (request, response) => {
    const data = JSON.parse(await once(request, 'data'))
    const toLower = (text) => text.toLowerCase()
    if (
      toLower(data.username) !== toLower(DEFAULT_USER.username) ||
      data.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401)
      response.end('Login failed!')
      return
    }
    return response.end('Logged in successfully')
  },
  default(request, response) {
    response.writeHead(404)
    return response.end('Not Found')
  }
}
function handler(request, response) {
  const { url, method } = request
  const routKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  const choosen = routes[routKey] || routes.default
  return choosen(request, response)
}
const app = http.createServer(handler)
  .listen(3000, () => console.log('app running at', 3000))

module.exports = app