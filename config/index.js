import get from 'lodash/get';
import assign from 'lodash/assign';

const environment = process.env.NODE_ENV || 'development';
const envSpecificConfig = require(`./environments/${ environment }.json`);

const config = assign({
  application: {
    name: 'ecom-web'
  },
  server: {
    port: 3000,
    environment,
    hostname: 'localhost'
  },
  caching: {
    edge: {
      enabled: true,
      duration: 120
    },
    static: {
      enabled: true,
      duration: 30 * 24 * 60 * 60 * 1000
    }
  }
}, envSpecificConfig);

export default {
  get: attr => get(config, attr)
};