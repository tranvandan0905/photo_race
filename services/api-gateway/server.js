const express = require('express');
const cors = require('cors'); 
const routeAPI = require('./routes/gateway.route');
const errorMiddleware = require('./middlewares/error.middleware');
const app = express();
const port = 3001;
app.use(cors()); 
app.use(express.json());
app.use('/api', routeAPI);
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`API Gateway is listening on port ${port}`);
});
