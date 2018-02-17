import get from 'lodash/get';
import assign from 'lodash/assign';

const env = process.env.NODE_ENV || 'development';
const envSpecificConfig = require(`./environments/${ env }.json`);

const config = assign({
  application: {
    name: 'ecom-web'
  },
  server: {
    port: 3000,
    environment: env,
    hostname: 'localhost'
  }
}, envSpecificConfig);

export default {
  get: attr => get(config, attr)
};