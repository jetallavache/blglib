var Author = require("../models/author");

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.author_list = asyncHandler(async (req, res, next) => {
  try {
    const list_author = await Author.find({}).exec();

    res.render("author_list", {
      title: "Authors List",
      author_list: list_author,
    });

  } catch (err) {
    return next(err);
  }
});

exports.author_detail = asyncHandler(async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id).exec();

    res.render("author_detail", {
      title: "Author",
      author: author,
    });

  } catch (err) {
    return next(err);
  }
});

exports.author_create_get = (req, res, next) => {
  res.render("author_form", { title: "Create Author" });
};

exports.author_create_post = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  
  asyncHandler(async (req, res, next) => {
    
    const errors = validationResult(req);
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
    });

    if (!errors.isEmpty()) {
      res.render("author_form", {
        title: "Create Author",
        author: author,
        errors: errors.array(),
      });
      return;
    } else {
      await author.save();
      res.redirect("/info/book/create");
    }
  }),
];

exports.author_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

exports.author_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

exports.author_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update GET");
};

exports.author_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update POST");
};
