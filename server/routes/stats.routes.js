import express from 'express';
import { statsTotPost, statsTotUser } from '../controllers/stats.controller.js';

const router = express.Router();

router.get('/tot-post', statsTotPost);
router.get('/tot-users', statsTotUser)

export default router;