import express from 'express';
import { updateProfile, getProfile, getUserInfo } from '../controllers/profile.controller.js';

const router = express.Router();

router.post('/profile', updateProfile);
router.get('/profile/:id', getProfile);
router.get('/user/:id', getUserInfo)

export default router;