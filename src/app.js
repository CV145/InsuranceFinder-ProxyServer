// Setup express app
import express from 'express';
import cors from 'cors';
import apiProxyRoutes from './routes/apiProxyRoutes.js';

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

export default app;
