const express = require('express');
const cors = require('cors'); 
const routeAPI = require('./routes/gateway.route');
const app = express();
const port = 3001;
app.use(cors()); 

app.use(express.json());

app.use('/api', routeAPI);

app.listen(port, () => {
  console.log(`API Gateway is listening on port ${port}`);
});
