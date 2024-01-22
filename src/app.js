// Setup express app
import express from 'express';
import cors from 'cors';
import apiProxyRoutes from './routes/apiProxyRoutes.js';

const app = express();

// Custom CORS middleware
const customCors = (req, res, next) => {
    const allowedOrigins = ['https://cv145.github.io', 'http://localhost:5173'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
};

app.use(customCors);

app.use(express.json());
app.use('/api', apiProxyRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

export default app;
