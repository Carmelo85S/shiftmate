import express from 'express';
import { getAppliedJobs, getUserJobs, deleteAppliedJobs, applyToJob, getUserApplications ,cancelUserApplications, changeStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.get('/user/:id/applied-jobs', getAppliedJobs);
router.get('/user/:id/jobs', getUserJobs)
router.delete('/jobs/:id', deleteAppliedJobs);
router.post('/apply', applyToJob);
router.get('/user/:id/applications', getUserApplications);
router.post('/applications/cancel', cancelUserApplications);
router.post('/applications/change-status', changeStatus);

export default router;
