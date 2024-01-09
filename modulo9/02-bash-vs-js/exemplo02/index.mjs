$.verbose = false
import isSafe from 'safe-regex'
import { setTimeout } from 'timers/promises'
await $`docker run -p "8080:80" -d nginx`
await setTimeout(500)
const req = await $`curl localhost:8080`
console.log('req', req.stdout)
const containers = await $`docker ps`
// const exp = /(?<containerId>\w+)\W+(?=nginx)(x+x+)+y/ UNSAFE
const exp = /(?<containerId>\w+)\W+(?=nginx)/
if (!isSafe(exp)) throw new Error('Regex is not safe')

const { groups: { containerId } } = containers.toString().match(exp)
const logs = await $`docker logs ${containerId}`
console.log('logs\n', logs.stdout)
const rm = await $`docker rm -f ${containerId}`
console.log('rm', rm.stdout)