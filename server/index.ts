// server/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { specs } from './swagger';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = ['http://localhost:8080', 'https://healthinfosystem-beta.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

export default app;