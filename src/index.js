const fastify = require('fastify')
const app = fastify({ logger: true })

app.get('/', async (req, res) => {
    return { works: true }
})

app.get('/hi', async (req, res) => {
    return "Hello Class!"
})

exports.app = async (req, res) => {
    await app.ready()
    app.server.emit('request', req, res)
}