var Meeting = require("../models/meeting");
var Book = require("../models/book");
var Member = require("../models/member");

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  try {
    const curr_meeting = await Meeting.findOne({}).sort({ _id: -1}).populate("book");
    const book = await Book.findById(curr_meeting.book).populate("author").exec();

    res.render("index", {
      curr_meeting: curr_meeting,
      book: book,
    });

  } catch (err) {
    return next(err);
  }
});

exports.meeting_list = asyncHandler(async (req, res, next) => {
  try {
    const list_meetings = await Meeting.find({}).populate("book").exec();

    res.render("meeting_list", {
      title: "Meeting List",
      meeting_list: list_meetings,
    });

  } catch (err) {
    return next(err);
  }
});

exports.meeting_detail = asyncHandler(async (req, res, next) => {
  try {
    const [meeting, member] = await Promise.all([
      Meeting.findById(req.params.id).populate("book").exec(),
      Member.find({ curr_meeting: req.params.id }).exec(),
    ]);

    if (meeting === null) {
      const err = new Error("Meeting not found");
      err.status = 404;
      return next(err);
    }

    res.render("meeting_detail", {
      title: meeting.title,
      meeting: meeting,
      member: member,
    });

  } catch (err) {
    return next(err);
  }
});

exports.meeting_create_get = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title").exec();

  res.render("meeting_form", {
    title: "Create meeting",
    book_list: allBooks,
  });
});

exports.meeting_create_post  = [
  body("book", "Book must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("place", "Place must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),  
  body("date", "Invalid date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("time", "Time must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);

      const meeting = new Meeting({
        book: req.body.book,
        place: req.body.place,
        date: req.body.date,
        time: req.body.time,
    });

    if (!errors.isEmpty()) {
      const allBooks = await Book.find({}, "title").exec();

      res.render("meeting_form", {
        title: "Create Meeting",
        book_list: allBooks,
        selected_book: meeting.book._id,
        errors: errors.array(),
        meeting: meeting,
      });
      return;
    } else {
      await meeting.save();
      res.redirect("/");
    }
  }),
];

exports.meeting_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Meeting delete GET");
};

exports.meeting_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Meeting delete POST");
};

exports.meeting_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Meeting update GET");
};

exports.meeting_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Meeting update POST");
};
