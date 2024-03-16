import express from 'express';
var router = express.Router();

import { author_valid, book_valid, meeting_valid, member_valid } from '../validations/index.js';

import { handle_valid_err, check_auth} from '../utils/index.js'; // set_covers

import { author_controller, book_controller, meeting_controller, member_controller } from '../controllers/index.js';

router.get('/authors', check_auth, author_controller.author_list);
router.get('/author/:id', check_auth, author_controller.author_detail);
router.post('/author/create', author_valid, check_auth, handle_valid_err, author_controller.author_create);
router.delete('/author/:id', check_auth, author_controller.author_remove);
router.patch('/author/:id', author_valid, check_auth, handle_valid_err, author_controller.author_update);

// router.get('/books', check_auth, book_controller.book_list);
router.get('/books', book_controller.book_list);
router.get('/book/:id', check_auth, book_controller.book_detail);
router.post('/book/create', book_valid, check_auth, handle_valid_err, /*set_covers,*/ book_controller.book_create);
router.delete('/book/:id', check_auth, book_controller.book_remove);
router.patch('/book/:id', book_valid, check_auth, handle_valid_err, book_controller.book_update);

router.get('/meetings', check_auth, meeting_controller.meeting_list);
router.get('/meeting/:id', check_auth, meeting_controller.meeting_detail);
router.post('/meeting/create', meeting_valid, check_auth, handle_valid_err, meeting_controller.meeting_create);
router.delete('/meeting/:id', check_auth, meeting_controller.meeting_remove);
router.patch('/meeting/:id', meeting_valid, check_auth, handle_valid_err, meeting_controller.meeting_update);

router.get('/members', check_auth, member_controller.member_list);
router.get('/member/:id', check_auth, member_controller.member_detail);
router.post('/member/create', member_valid, check_auth, handle_valid_err, member_controller.member_create);
router.delete('/member/:id', check_auth, member_controller.member_remove);
router.patch('/member/:id', member_valid, check_auth, handle_valid_err, member_controller.member_update);

export { router as control_router };
