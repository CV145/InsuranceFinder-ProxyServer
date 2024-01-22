//Setup express app

const express = require('express');
const cors = require('cors');
const apiProxyRoutes = require('./routes/apiProxyRoutes');
const app = express();

// Enable CORS for your frontend origin
/*app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend's origin
}));*/

app.use(cors());


app.use(express.json());
app.use('/api', apiProxyRoutes);

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Hello World</title>
            </head>
            <body>
                <h1>Hello World!</h1>
                <p>This is a simple HTML response from the server.</p>
            </body>
        </html>
    `);
});


module.exports = app;
