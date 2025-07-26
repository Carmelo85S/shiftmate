import express from 'express';
import { dashboardSearch, mainSearch } from '../controllers/search.controller.js';

const router = express.Router();

router.get('/search', mainSearch);
router.get('/search/users', dashboardSearch)

export default router;