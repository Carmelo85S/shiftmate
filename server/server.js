import express from 'express';
import { supabase } from './supabaseClient.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import applicationRoutes from './routes/application.routes.js';
import statsRoute from './routes/stats.routes.js';
import jobRoutes from './routes/jobs.routes.js';
import searchRoute from './routes/search.routes.js';
import messageRoute from './routes/messages.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', authRoutes); // Auth routes for user registration and login
app.use('/api', profileRoutes); // Profile routes for user profile management (update and get) and info
app.use('/api', applicationRoutes); // Application routes for job applications
app.use('/api', jobRoutes) //Jobs router
app.use('/api', statsRoute) // stats tot user and tot post
app.use('/api', searchRoute) //search routes for search bar in main and search in business dashboard
app.use('/api', messageRoute) //router for messages



app.listen(3000, () => console.log('Server running on port 3000'));
