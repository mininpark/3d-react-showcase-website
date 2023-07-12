import express from 'express'; // a framework for building web app in node js
import * as dotenv from 'dotenv'; // to allow loading environment variables from a env file
import cors from 'cors'; // a middleware for enabling cross-origin resource sharing

import dalleRoutes from './routes/dalle.routes.js';

dotenv.config();

const app = express();
// middleware setup by adding cors and pasing incoming requestsjson data and sets a limig of 50 mb of the payload size
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// dallie routes
app.use('/api/v1/dalle', dalleRoutes);

// default routes, when a client sends a GET request to the root path, it responds with a JSON object containing a message
app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello from server' });
});

// starting a server at port 8080
app.listen(8080, () => console.log('server has stated on port 8080'));
