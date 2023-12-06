import member_model from '../models/member.model.js';
import meeting_model from '../models/meeting.model.js';

export const member_list = async (req, res) => {
  try {
    const list_members = await member_model.find({}).populate("curr_meeting").exec();

    res.json(list_members);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить список участников',
    })
  }
};

export const member_detail = async (req, res) => {
  try {
    const member = await member_model.findById(req.params.id).populate("curr_meeting").exec();

    res.json(member);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить участника',
    })
  }
};

export const member_create = async (req, res, next) => {
  try {

    const check_phone = await member_model.find({phone: req.body.phone}).count();

    if (check_phone == 0) {

      let curr_month = new Date().getMonth() + 1;
      
      req.body.status = 'Participates';
      
      const count_participant = await member_model.aggregate([
        {
          $match: {
            status: "Participates",
            $expr: {
              $eq: [{ $month: "$updatedAt"}, curr_month]
            }
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$updatedAt"},
              month: { $month: "$updatedAt" },
            },
            total: { $sum: 1 }
          }
        }
      ]);

      if (count_participant[0]) {
        const _status = count_participant[0].total < 10 ? 'Participates' : 'Await';
        req.body.status = _status;
      }

      const meeting = await meeting_model
        .findOne({})
        .sort({ _id: -1 })
        .exec();

      const { _id } = meeting._doc;

      const member = new member_model({
        name: req.body.name,
        phone: req.body.phone,
        message: req.body.message,
        status: req.body.status,
        currMeeting: _id,
      });

      const post = await member.save();
      res.json(post);
      next();

    } else {
      req.body.status = 'Already_exists';

      await member_model.updateOne(
        {
          phone: req.body.phone,
        },
        {
          $push:
            {
              message: req.body.message,
            },
        }
      );

      res.json({
        message: 'Участник с данным номером телефона уже существует',
      });
      next();
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать участника',
    });
  }
};


export const member_remove = async (req, res) => {
  try {
    await member_model.findOneAndDelete({
      _id: req.params.id,
    });

    res.json({
      success: true,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить участника',
    });
  }
};

export const member_update = async (req, res) => {
  try {
    await member_model.updateOne(
      {
        _id: req.params.id,
      },
      {
        name: req.body.name,
        phone: req.body.phone,
        message: req.body.message,
        status: req.body.status,
        currMeeting: req.body.currMeeting,
      }
    );

    res.json({
      success: true,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить участника',
    });
  }
};
