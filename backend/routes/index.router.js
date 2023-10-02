import express from 'express';
const router = express.Router();

import { member_valid } from '../validations/member.valid.js';

import { meeting_controller, member_controller } from '../controllers/index.js';

import { handle_valid_err, send_message } from '../utils/index.js';

router.get('/', meeting_controller.meeting_last);
router.post('/', member_valid, handle_valid_err, send_message, member_controller.member_create);

export { router as index_router };

