require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./config/db');
const routeAPI = require('./routes/submission.routes');
const errorMiddleware = require('./middlewares/error.middleware');
const port = process.env.PORT;
app.use(express.json());
app.use('/api/submission', routeAPI);
app.use(errorMiddleware);
(async () => {
    try {
        await connection();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(">> Database connection error:", error);
    }
})();
