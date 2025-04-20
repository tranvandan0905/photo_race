require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./config/db');
const routeAPI = require('./routes/submission.routes');
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/submission', routeAPI);
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
