const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Payment endpoint
server.post('/create-payment-intent', (req, res) => {
    // In a real app, you'd calculate the order amount based on the request
    res.json({
        clientSecret: 'test_client_secret' // Mock secret
    });
});

server.use(middlewares);
server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running on port 3001');
});