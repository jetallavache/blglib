var express = require("express");
var router = express.Router();

var author_controller = require("../controllers/authorController");
var book_controller = require("../controllers/bookController");
var meeting_controller = require("../controllers/meetingController");
var member_controller = require("../controllers/memberController");
// var telegram_controller = require("../controllers/telegramControllers");

router.get("/", meeting_controller.index);
router.post("/", member_controller.member_create_post);
// router.post("/telegram", telegram_controller.member_create_post);

router.get("/author/create", author_controller.author_create_get);
router.post("/author/create", author_controller.author_create_post);
router.get("/author/:id/delete", author_controller.author_delete_get);
router.post("/author/:id/delete", author_controller.author_delete_post);
router.get("/author/:id/update", author_controller.author_update_get);
router.post("/author/:id/update", author_controller.author_update_post);
router.get("/author/:id", author_controller.author_detail);
router.get("/authors", author_controller.author_list);

router.get("/book/create", book_controller.book_create_get);
router.post("/book/create", book_controller.book_create_post);
router.get("/book/:id/delete", book_controller.book_delete_get);
router.post("/book/:id/delete", book_controller.book_delete_post);
router.get("/book/:id/update", book_controller.book_update_get);
router.post("/book/:id/update", book_controller.book_update_post);
router.get("/book/:id", book_controller.book_detail);
router.get("/books", book_controller.book_list);

router.get("/meeting/create", meeting_controller.meeting_create_get);
router.post("/meeting/create", meeting_controller.meeting_create_post);
router.get("/meeting/:id/delete", meeting_controller.meeting_delete_get);
router.post("/meeting/:id/delete", meeting_controller.meeting_delete_post);
router.get("/meeting/:id/update", meeting_controller.meeting_update_get);
router.post("/meeting/:id/update", meeting_controller.meeting_update_post);
router.get("/meeting/:id", meeting_controller.meeting_detail);
router.get("/meetings", meeting_controller.meeting_list);

router.get("/member/create", member_controller.member_create_get,);
router.post("/member/create", member_controller.member_create_post);
router.get("/member/:id/delete", member_controller.member_delete_get);
router.post("/member/:id/delete", member_controller.member_delete_post);
router.get("/member/:id/update", member_controller.member_update_get);
router.post("/member/:id/update", member_controller.member_update_post);
router.get("/member/:id", member_controller.member_detail);
router.get("/members", member_controller.member_list);

module.exports = router;
