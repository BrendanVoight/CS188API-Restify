const restify = require('restify');

const {initCustomerControllers} = require('./controllers/customer-controller');
const {initCartControllers} = require('./controllers/cart-controller');
const {initItemControllers} = require('./controllers/item-controller');
const {initCartItemControllers} = require('./controllers/cart-item-controller');
const port = 5555;

const init = async () => {
    const server = restify.createServer()

    initCustomerControllers(server);
    initCartControllers(server);
    initItemControllers(server);
    initCartItemControllers(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();