import express from 'express';
import { getAllMessages, markReadMessage, postMessage, deleteMessage, getUnreadMessage } from '../controllers/messages.controller.js';
const router = express.Router();

router.post('/messages', postMessage);
router.patch('/messages/mark-read', markReadMessage);
router.get('/messages/:userId/all', getAllMessages);
router.patch('/messages/delete', deleteMessage);
router.get('/messages/unread-count/:userId', getUnreadMessage);
export default router;