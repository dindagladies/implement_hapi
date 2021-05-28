const Hapi = require('@hapi/hapi');
const routes = require('./routes');

/* eslint-disable */
const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });

    server.route(routes);

    await server.start();
};

init();
