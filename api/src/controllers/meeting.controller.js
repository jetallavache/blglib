import meeting_model from '../models/meeting.model.js';
import book_model from '../models/book.model.js';
import author_model from '../models/author.model.js';
import member_model from '../models/member.model.js';

export const meeting_list = async (req, res) => {
  try {
    const list_meeting = await meeting_model.find({}).populate("book").exec();

    res.json(list_meeting);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить список мероприятий',
    })
  }
};

export const meeting_detail = async (req, res) => {
  try {
    const meeting = await meeting_model.findById(req.params.id).populate("book").exec();

    res.json(meeting);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить данное мероприятие',
    })
  }
};

export const meeting_create = async (req, res, next) => {
  try {
    const meeting = new meeting_model({
      book: req.body.book,
      place: req.body.place,
      date: req.body.date,
      user: req.body.user,
    });

    const post = await meeting.save();
    res.json(post);

    next();

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать мероприятие',
    });
  }
};

export const meeting_remove = async (req, res) => {
  try {
    await meeting_model.findOneAndDelete({
      _id: req.params.id,
    });

    res.json({
      success: true,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить мероприятие',
    });
  }
};

export const meeting_update = async (req, res) => {
  try {
    await meeting_model.updateOne(
      {
        _id: req.params.id,
      },
      {
        book: req.body.book,
        place: req.body.place,
        date: req.body.date,
        user: req.body.user,
      }
    );

    res.json({
      success: true,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить мероприятие',
    });
  }
};

export const meeting_last = async (req, res) => {
  try {
    const meeting = await meeting_model
      .findOne({})
      .sort({ date: -1 })
      .exec();

    const date = meeting.date_formatted;

    const { place } = meeting._doc;

    const book_child = await book_model
      .findById(meeting.book)
      .exec();

    const { title, covers } = book_child._doc;

    const autor_child = await author_model
      .findById(book_child.author)
      .exec();

    const { firstName, familyName } = autor_child._doc;

    const meetings_five = await meeting_model
      .find({})
      .sort({ date: -1 })
      .limit(6)
      .populate("book")
      .exec();

    let listMeetings = [];
    for (let i = 1; i < meetings_five.length; ++i) {
      const author_obj = await author_model.findById(meetings_five[i].book.author);
      listMeetings.push({
        place: meetings_five[i].place,
        title: meetings_five[i].book.title,
        firstName: author_obj.firstName,
        familyName: author_obj.familyName,
        date: meetings_five[i].date_with_year
      });
    }

    let curr_month = new Date().getMonth();

    const countParticipant = await member_model.aggregate([
      {
        $match: {
          status: "Participates",
          $expr: {
            $eq: [{ $month: "$updatedAt"}, curr_month + 1]
          }
        },
      },
      {
        $group: {
          _id: {
            curr_year: { $year: "$updatedAt"},
            curr_month: { $month: "$updatedAt" },
          },
          total: { $sum: 1 }
        }
      }
    ]);

    res.json({
      title,
      firstName,
      familyName,
      covers,
      place,
      date,
      listMeetings,
      countParticipant
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить данное мероприятие',
    })
  }
};
