//Setup express app

const express = require('express');
const cors = require('cors');
const apiProxyRoutes = require('./routes/apiProxyRoutes');
const app = express();

// Enable CORS for your frontend origin
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend's origin
}));

app.use(express.json());
app.use('/api', apiProxyRoutes);

module.exports = app;
