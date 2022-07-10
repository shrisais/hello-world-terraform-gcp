const fastify = require('fastify')
const app = fastify({ logger: true })
const FastifySecrets = require('fastify-secrets-gcp')

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

app.addHook('preHandler', async (request, reply) => {
    await app.ready()
    request.dbAccess = app.secrets.dbKey
});

// Decorators
app.decorateRequest('faunaSecret', '');
app.decorateRequest('dbAccess', '');

app.get('/', async (req, res) => {
    return { works: true }
})

app.get('/hi', async (req, res) => {
    return "Hello Class!"
})

app.register(FastifySecrets, {
    secrets: {
        dbKey: 'projects/311333457219/secrets/FAUNA_SERVER_SECRET/versions/latest'
    }
})

app.addContentTypeParser('application/json', {}, (req, body, done) => {
    done(null, body.body);
});


exports.app = async (req, res) => {
    await app.ready()
    app.server.emit('request', req, res)
}