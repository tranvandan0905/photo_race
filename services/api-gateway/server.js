const express = require('express');
const routeAPI = require('./routes/gateway.route');
const app = express();
app.use(express.json());
const port = 3001;
app.use('/api', routeAPI); 
app.listen(port, () => {
  console.log(`API Gateway is listening on port ${port}`);
});
