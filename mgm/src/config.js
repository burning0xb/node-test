require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || '172.40.0.102',
  port: process.env.PORT,
  contextRoot: '',
  serviceHost: process.env.RPC_HOST || 'localhost',
  servicePort: process.env.RPC_PORT || '8080',
  servicePath: '/crmmobilepay-mgm'
}, environment);
