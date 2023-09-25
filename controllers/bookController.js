var Book = require("../models/book");
var Meeting = require("../models/meeting");
var Author = require("../models/author");

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.book_list = asyncHandler(async (req, res, next) => {
  try {
    const list_books = await Book.find({}).populate("author").exec();

    res.render("book_list", {
      title: "Bools List",
      book_list: list_books,
    });

  } catch (err) {
    return next(err);
  }
});

exports.book_detail = asyncHandler(async (req, res, next) => {
  try {
    const [book, meeting] = await Promise.all([
      Book.findById(req.params.id).populate("author").exec(),
      Meeting.find({ book: req.params.id }).exec(),
    ]);

    if (book === null) {
      const err = new Error("Book not found");
      err.status = 404;
      return next(err);
    }

    res.render("book_detail", {
      title: book.title,
      book: book,
      meeting: meeting,
    });

  } catch (err) {
    return next(err);
  }
});

exports.book_create_get = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find().exec();

  res.render("book_form", {
    title: "Create Book",
    authors: allAuthors,
  });
});

exports.book_create_post = [
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
    });

    if (!errors.isEmpty()) {
      
      const allAuthors = await Author.find().exec();

      res.render("book_form", {
        title: "Create Book",
        authors: allAuthors,
        book: book,
        errors: errors.array(),
      });

    } else {
      await book.save();
      res.redirect("/info/meeting/create");
    }
  }),
];


exports.book_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

exports.book_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

exports.book_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update GET");
};

exports.book_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update POST");
};
