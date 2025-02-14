const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Product & Sellers API',
    description: 'Product & Sellers ',
  },
  host: 'localhost:10000',
  schema: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
