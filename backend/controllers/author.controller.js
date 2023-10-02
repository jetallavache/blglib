import author_model from '../models/author.model.js';

export const author_list = async (req, res) => {
  try {
    const list_author = await author_model.find({}).exec();

    res.json(list_author);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить список авторов',
    })
  }
};

export const author_detail = async (req, res) => {
  try {
    const author = await author_model.findById(req.params.id).exec();

    res.json(author);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить автора',
    })
  }
};

export const author_create = async (req, res) => {
    try {
      const author = new author_model({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
      });
      
      const post = await author.save();
      res.json(post);

    } catch(err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось создать автора',
      });
    }
};

export const author_remove = async (req, res) => {
  try {
    await author_model.findOneAndDelete({
      _id: req.params.id,
    });

    res.json({
      success: true,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить автора',
    });
  }
};

export const author_update = async (req, res) => {
  try {
    await author_model.updateOne(
      {
        _id: req.params.id,
      },
      {
        family_name: req.body.family_name,
        first_name: req.body.first_name,
      }
    );

    res.json({
      success: true,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить автора',
    });
  }
};