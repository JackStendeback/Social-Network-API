// * Importing express for use in my project.
const express = require('express');
// * importing db connection from my config folder.
const db = require('./config/connection');
// * importing routes from my routes folder.
const routes = require('./routes');
// * creating a port on localhost 3001
const port = process.env.PORT || 3002;
// * using express
const app = express();
// * Utilizing the routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


// * Connecting to the database and the server.
db.once('open', () => {
    app.listen(port, () => {
        console.log(`API server running on port ${port}!`);
    });g
});