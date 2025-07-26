import express from 'express';
import { getJobs, postedJobs } from '../controllers/jobs.controller.js';
const router = express.Router();

router.post('/job', postedJobs)
router.get('/job', getJobs)

export default router;