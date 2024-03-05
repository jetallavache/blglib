import http from 'request';
import 'dotenv/config.js';

export default (req, res) => {
  try {
    let date = Date.now();
    let curr_date = new Date(date);
    let day = curr_date.getDate();
    let month = curr_date.getMonth() + 1;
    let year = curr_date.getFullYear();

    let _status = 'Участвует (+)';

    switch (req.body.status) {
      case 'Participates':
        break;

      case 'Await':
        _status = 'В списке ожидания'
        break;
      
      case 'Refused':
        _status = 'Отказался от участия'
        break;

      case 'Already_exists':
        _status = 'Участник с данным номером уже существует'
        break;
      
      default:
        _status = 'Неопределен'
    }

    let fields = [
      '<b>Имя</b>: ' + req.body.name,
      '<b>Телефон</b>: ' + req.body.phone,
      '<b>Сообщение</b>: ' + req.body.message,
      '<b>Дата регистрации</b>: ' + day + '/' + month + '/' + year,
      '<b>Статус</b>: ' + _status
    ]
    let msg = ''

    fields.forEach(field => {
      msg += field + '\n'
    });

    http.post('https://api.telegram.org/bot' + process.env.TG_TOKEN + 
              '/sendMessage?chat_id=' + process.env.TG_CHAT + 
              '&parse_mode=html&text=' + encodeURIComponent(msg), 
              function (error, response, body) {
      if (error) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        return res.status(500).json({
          message: "Не удалось отправить сообщение",
        })
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Не удалось отправить сообщение',
    });
  }
};
