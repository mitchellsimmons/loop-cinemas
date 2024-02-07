import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import credentials from './src/middleware/credentials.js';
import db from './src/database/index.js';
import addRoutes from './src/routes/index.js';
import corsOptions from './src/config/cors.js';

// Sync database in background
db.sync();

// Create express app
const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Allow origin to receive cookies sent from server.
app.use(credentials);

// Support Cross-Origin Resource Sharing
app.use(cors(corsOptions));

// Parse Cookie header and store on req.cookies
app.use(cookieParser());

// Setup routes
addRoutes(express, app);

// Set port, listen for requests.
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}.`);
});
