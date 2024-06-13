import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';

const app = express();


app.use(cors({ origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173'] }));
app.use(express.json());

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})