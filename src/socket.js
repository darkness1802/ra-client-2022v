import io from 'socket.io-client'
const DEVELOPMENT = 'https://ra-core-2022v-production.up.railway.app'

let SERVER

SERVER = DEVELOPMENT

const sockets = io(SERVER, { autoConnect: true, forceNew: true })
export default sockets