import member_model from '../models/member.model.js';

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

export const member_create = async (req, res) => {
  try {
    const member = new member_model({
      name: req.body.name,
      phone: req.body.phone,
      message: req.body.message,
    });

    const post = await member.save();
    res.json(post);

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
        currMeeting: req.body.currMeeting,
        status: req.body.status,
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
