const fastify = require('fastify')
const app = fastify({ logger: true })

// Routes
app.post('/login', require('./routes/login.js'));
app.post('/logout', require('./routes/logout.js'));
app.post('/users', require('./routes/create-user.js'));
app.get('/users/:userId', require('./routes/get-user.js'));
app.delete('/users/:userId', require('./routes/delete-user.js'));

// Hooks
app.addHook('onRequest', async (request, reply) => {

    // If the route is not private we ignore this hook
    if (!reply.context.config.isPrivate) return;

    const faunaSecret = request.headers['fauna-secret'];

    // If there is no header
    if (!faunaSecret) {
        reply.status(401).send();
        return;
    }

    // Add the secret to the request object
    request.faunaSecret = faunaSecret;
});

// Decorators
app.decorateRequest('faunaSecret', '');

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