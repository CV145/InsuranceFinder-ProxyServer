// Setup express app
import express from 'express';
import cors from 'cors';
import apiProxyRoutes from './routes/apiProxyRoutes.js';

const app = express();

// Enable CORS for multiple origins
const allowedOrigins = ['https://cv145.github.io', 'http://localhost:5173'];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());
app.use('/api', apiProxyRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

export default app;
