import http from 'request';
import config from '../config/config.json' assert { type: "json" };

export default (req, res, next) => {
  try {
    let date = Date.now();
    let curr_date = new Date(date);
    let day = curr_date.getDate();
    let month = curr_date.getMonth() + 1;
    let year = curr_date.getFullYear();

    let fields = [
      '<b>Имя</b>: ' + req.body.name,
      '<b>Телефон</b>: ' + req.body.phone,
      '<b>Дата регистрации</b>: ' + day + '/' + month + '/' + year
    ]
    let msg = ''

    fields.forEach(field => {
      msg += field + '\n'
    });
  
    http.post('https://api.telegram.org/bot' + config.telegram.token + '/sendMessage?chat_id=' + config.telegram.chat + '&parse_mode=html&text=' + encodeURIComponent(msg), function (error, response, body) {  
      if (error) {
        console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        return res.status(500).json({
          message: "Не удалось отправить сообщение",
        })
      }
      else {
        next();
      }
    }); 
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Не удалось отправить сообщение',
    });
  }
};
