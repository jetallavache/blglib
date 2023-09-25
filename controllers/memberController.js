var Member = require("../models/member");
var Meeting = require("../models/meeting");

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.member_list = asyncHandler(async (req, res, next) => {
  try {
    const list_member = await Member.find({}).populate("curr_meeting").exec();

    res.render("member_list", {
      title: "Members List",
      member_list: list_member,
    });

  } catch (err) {
    return next(err);
  }
});

exports.member_detail = asyncHandler(async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id).populate("curr_meeting").exec();

    if (member === null) {
      const err = new Error("Member not found");
      err.status = 404;
      return next(err);
    }

    res.render("member_detail", {
      title: member.name,
      member: member,
    });

  } catch (err) {
    return next(err);
  }
});

exports.member_create_get = asyncHandler(async (req, res, next) => {
  res.render("member_form", { title: "Create Member" });
});

exports.member_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
  body("phone")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Phone must be specified."),
  
  asyncHandler(async (req, res, next) => {

    const config = require('../config/config.json');
    let http = require('request')
    let reqBody = req.body

    let fields = [
      '<b>Name</b>: ' + reqBody.name,
      '<b>Phone</b>: ' + reqBody.phone,
    ]
    let msg = ''

    fields.forEach(field => {
      msg += field + '\n'
    });

    http.post(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${msg}`, function (error, response, body) {  
      console.log('error:', error); 
      console.log('statusCode:', response && response.statusCode); 
      console.log('body:', body); 
    });
    
    const errors = validationResult(req);
    const curr_meeting = await Meeting.findOne({}).sort({ _id: -1}).populate("book");
    const member = new Member({
      name: req.body.name,
      phone: req.body.phone,
      curr_meeting: curr_meeting,
    });

    if (!errors.isEmpty()) {
      res.render("member_form", {
        title: "Create Member",
        member: member,
        errors: errors.array(),
      });
      return;
    } else {
      await member.save();
      res.redirect("/");
    }
  }),
];

exports.member_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Member delete GET");
};

exports.member_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Member delete POST");
};

exports.member_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Member update GET");
};

exports.member_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Member update POST");
};
