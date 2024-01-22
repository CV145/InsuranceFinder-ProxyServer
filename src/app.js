//Setup express app

const express = require('express');
const cors = require('cors');
const apiProxyRoutes = require('./routes/apiProxyRoutes');
const app = express();

// Enable CORS for your frontend origin
app.use(cors({
    origin: ['https://cv145.github.io', 'http://localhost:5173']
}));


app.use(express.json());
app.use('/api', apiProxyRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});


module.exports = app;
