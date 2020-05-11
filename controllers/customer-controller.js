const {
    getAllCustomers,
    getCustomerByCustomerId,
    addCustomer,
    modifyCustomer,
    removeCustomerByCustomerId
} = require('../services/customer-service');
const {getCartsByCustomerId} = require('../services/cart-service');

const getCustomersCartsRoute = (server) => {
    server.get('/customers/:customerId/carts', (req, res, next) => {
        const customerId = req.params.customerId;
        const customer = getCustomerByCustomerId(customerId);

        if (!customer) {
            res.send(404);
        } else {
            res.send(200, getCartsByCustomerId(customerId));
        }
        return next();
    })
};

const getCustomersRoute = (server) => {
    server.get('/customers', (req, res, next) => {
        const customers = getAllCustomers();
        res.send(200, customers);
        return next();
    })
};

const addCustomersRoute = (server) => {
    server.post('/customers', (req, res, next) => {
        const customer = req.params;
        addCustomer(customer);
        res.send(201);
        return next();
    })

};

const modifyCustomerRoute = (server) => {
    server.put('/customers/:customerId', (req, res, next) => {
        modifyCustomer(req.params);
        res.send(200);
        return next;
    })
};

const deleteCustomerRoute = (server) => {
    server.del('/customers/:customerId', (res, req, next) =>{
        removeCustomerByCustomerId(req.params.customerId);
        res.send(204);
        return next();
    })
};

const getCustomerByCustomerIdRoute = (server) => {
    server.get('/customers/:customerId', (req, res, next) =>{
        const customer = getCustomerByCustomerId(req.params.customerId);
        if (!customer) {
            res.send(404);
        } else {
            res.send(200, customer)
        }
        return next();
    })
};

const initCustomerControllers = (server) => {
    getCustomersRoute(server);
    getCustomerByCustomerIdRoute(server);
    addCustomersRoute(server);
    modifyCustomerRoute(server);
    deleteCustomerRoute(server);
    getCustomersCartsRoute(server);
};

module.exports = {
    initCustomerControllers
};
