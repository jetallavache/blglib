#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, meetings and members to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Book = require('./models/book');
const Author = require('./models/author');
const Meeting = require('./models/meeting');
const Member = require('./models/member');

const authors = [];
const books = [];
const meetings = [];
const members = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createAuthors();
  await createBooks();
  // await createInstances();
  await createMeetings();
  await createMembers();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function authorCreate(index, first_name, family_name) {
  const authordetail = {first_name: first_name, family_name: family_name};

  const author = new Author(authordetail);

  await author.save();
  authors[index] = author;
  console.log(`Added author: ${first_name} ${family_name}`);
}

async function bookCreate(index, title, author, isbn) {
  const bookdetail = {
    title: title,
    author: author,
    isbn: isbn,
  };

  const book = new Book(bookdetail);

  await book.save();
  books[index] = book;
  console.log(`Added book: ${title}`);
}

async function meetingCreate(index, book, place, date, time) {
  const meetingdetail = {
    book: book,
    place: place,
    time: time,
  };
  if (date != false) meetingdetail.date = date;

  const meeting = new Meeting(meetingdetail);

  await meeting.save();
  meetings[index] = meeting;
  console.log(`Added meeting: ${place}`);
}

async function memberCreate(
    index, name, phone, curr_meeting, date_reg, status) {
  const memberdetail = {
    name: name,
    phone: phone,
    curr_meeting: curr_meeting,
  };
  if (date_reg != false) memberdetail.date_reg = date_reg;
  if (status != false) memberdetail.status = status;

  const member = new Member(memberdetail);

  await member.save();
  members[index] = member;
  console.log(`Added member: ${name}`);
}

async function createAuthors() {
  console.log('Adding authors');
  await Promise.all([
    authorCreate(0, 'Patrick', 'Rothfuss'),
    authorCreate(1, 'Ben', 'Bova'),
    authorCreate(2, 'Isaac', 'Asimov'),
    authorCreate(3, 'Bob', 'Billings'),
    authorCreate(4, 'Jim', 'Jones'),
  ]);
}

async function createBooks() {
  console.log('Adding Books');
  await Promise.all([
    bookCreate(0,'The Name of the Wind (The Kingkiller Chronicle, #1)',authors[0],'9781473211896'),
    bookCreate(1,'The Wise Man\'s Fear (The Kingkiller Chronicle, #2)',authors[0],'9788401352836'),
    bookCreate(2,'The Slow Regard of Silent Things (Kingkiller Chronicle)',authors[0],'9780756411336'),
    bookCreate(3,'Apes and Angels',authors[1],'9780765379528'),
    bookCreate(4,'Death Wave',authors[1],'9780765379504'),
    bookCreate(5,'Test Book 1',authors[4],'ISBN111111'),
    bookCreate(6,'Test Book 2',authors[4],'ISBN222222'),
  ]);
}

async function createMeetings() {
  console.log('Adding meetings');
  await Promise.all([
    meetingCreate(0, books[0], 'Sosedi', false, '20:00'),
    meetingCreate(1, books[1], 'Sosedi', false, '10:00'),
    meetingCreate(2, books[2], 'Shemrock', false, '13:00'),
    meetingCreate(3, books[3], 'Kino, vino i domino', false, '20:30'),
    meetingCreate(4, books[4], 'Sosedi', false, '20:00'),
    meetingCreate(5, books[5], 'Perchini', false, '20:00'),
    meetingCreate(6, books[6], 'Scver Narimskiy', false, '20:00'),
  ]);
}

async function createMembers() {
  console.log('Adding members');
  await Promise.all([
    memberCreate(0, 'Eva Morozova', '9998887766', meetings[0], false, 'true'),
    memberCreate(1, 'Nikolay', '9998887766', meetings[0], false, 'true'),
    memberCreate(2, 'Evgeniya', '9998887766', meetings[1], false, 'true'),
    memberCreate(3, 'Dmitriy', '9998887766', meetings[1], false, 'true'),
    memberCreate(4, 'Alexandra', '9998887766', meetings[2], false, 'false'),
    memberCreate(5, 'Mihail', '9998887766', meetings[3], false, 'false'),
    memberCreate(6, 'Ivan', '9998887766', meetings[6], false, 'false'),
  ]);
}