import http from 'request';
import { Image } from 'canvas';

async function fetchImage(url) {
    const img = new Image();
    return new Promise((res, rej) => {
        img.onload = () => res(img);
        img.onerror = e => rej(e);
        img.src = url;
    });
}

export default (req, res, next) => {
    try {
        const value = req.body.title;
        const encode = encodeURIComponent(value.replaceAll(' ', '+'));
        
        http.get('https://openlibrary.org/search.json?q=' + 
        encode + 
        '&fields=*,availability&limit=1', async function (error, response, body) {  
            
            if (error) {
                console.log('error:', error); 
                console.log('statusCode:', response && response.statusCode);
                req.body.status = 'Не удалось создать список обложек / Ошибка запроса';
                next();
            }
            else {
                const result = JSON.parse(body);

                if (result.numFound === 0) {    
                    req.body.status = 'Произведение не найдено в системе openlibrary';
                } else {
                    const edition_keys = result.docs[0].edition_key;
                    
                    if (result.docs[0].edition_count === 0) {
                        req.body.status = 'В системе openlibrary обложки не найдены';
                    } else {        
                        var all_covers = [];
                        var index, img_index = 0;

                        var len = edition_keys.length;
                        if (len > 10) len = 9;
                        
                        for (index = 0; index < len; ++index) {
                            const img = await fetchImage(`https://covers.openlibrary.org/b/olid/${edition_keys[index]}-L.jpg`);
                            if (img.width > 1) {
                                all_covers[img_index] = `https://covers.openlibrary.org/b/olid/${edition_keys[index]}-L.jpg`;
                                ++img_index;
                            }
                            console.log(img.width, img.height);
                        }

                        req.body.covers = all_covers;
                        req.body.status = 'Обложка найдена в системе openlibrary';
                        
                    }
                }
                next();
            }
        });
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({
        message: 'Не удалось создать список обложек',
        });
    }
  };
  