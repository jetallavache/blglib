import book_model from '../models/book.model.js';

export const book_list = async (req, res) => {
  try {
    const list_books = await book_model.find({}).populate("author").populate("user").exec();

    res.json(list_books);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить список книг',
    })
  }
};

export const book_detail = async (req, res) => {
  try {
    const book = await book_model.findById(req.params.id).populate("author").populate("user").exec();

    res.json(book);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить книгу',
    })
  }
};

export const book_create = async (req, res) => {
  try {
    const book = new book_model({
      title: req.body.title,
      author: req.body.author,
      covers:  req.body.covers,
      status: req.body.status,
      user: req.body.user,
    });
    
    const post = await book.save();
    res.json(post);

  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать книгу',
    });
  }
};


export const book_remove = async (req, res) => {
  try {
    await book_model.findOneAndDelete({
      _id: req.params.id,
    });

    res.json({
      success: true,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить книгу',
    });
  }
};

export const book_update = async (req, res) => {
  try {
    await book_model.updateOne(
      {
        _id: req.params.id,
      },
      {
        title: req.body.title,
        author: req.body.author,
        covers: req.body.covers,
        status: req.body.status,
        user: req.body.user,
      }
    );

    res.json({
      success: true,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить книгу',
    });
  }
};
