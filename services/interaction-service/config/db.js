require('dotenv').config();
const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        const state = mongoose.connection.readyState;
        const dbState = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
        console.log(`${dbState[state]} to db`);
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

module.exports = connection;
