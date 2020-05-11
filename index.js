const restify = require('restify');

const {initCustomerControllers} = require('./controllers/customer-controller');
const {initCartControllers} = require('./controllers/cart-controller');
const {initItemControllers} = require('./controllers/item-controller');
const {initCartItemControllers} = require('./controllers/cart-item-controller');

const port = 5555;
const server = restify.createServer( {
    name: "APIServer"
});

server.pre((req,res,next) => {
   return next();
});
server.use(restify.plugins.bodyParser({mapParams: true}));
initCustomerControllers(server);
initCartControllers(server);
initItemControllers(server);
initCartItemControllers(server);

console.log('Server running on %s', server.url);

server.listen(port, 'localhost',function() {
    console.log('%s listening at %s', server.name, server.url);
});