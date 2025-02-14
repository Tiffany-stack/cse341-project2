const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Product & Sellers API',
    description: 'Product & Sellers ',
  },
  host: 'https://cse341-project2-tiqd.onrender.com',
  schema: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
