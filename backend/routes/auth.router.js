import express from 'express';
var router = express.Router();

import { register_valid, login_valid } from '../validations/index.js';

import { handle_valid_err, check_auth } from '../utils/index.js';

import { user_controller }  from '../controllers/index.js';

router.post('/register', register_valid, handle_valid_err, user_controller.user_register);
router.post('/login', login_valid, handle_valid_err, user_controller.user_login);
router.get('/general', check_auth, user_controller.user_general);

// module.exports = router;
export { router as auth_router };
