injectionHttpInterceptor()
import http from 'http'
import { injectionHttpInterceptor } from './../index.js'
function handleRequest(request, response) {
  // response.setHeader('X-Instrumented-By', 'RodrigoMatos')
  response.end('Hello World!')
}

const server = http.createServer(handleRequest)
const port = 3000
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})