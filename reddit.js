let path = require('path');
let fs = require('fs');
let rp = require('request-promise');

let articleArray = [];


//USE request-promise to get data from the URL
rp('https://reddit.com/r/popular.json')
    .then((datainjson) => {
        //Takes the JSON we got from the URL and turns it into a javascript array
        let datainjavascript = JSON.parse(datainjson);
        datainjavascript.data.children.forEach(article => {
            let art = {
                title: article.data.title,
                url: article.data.url,
                auth: article.data.author
            }
            articleArray.push(art);

            //check if the URL of the article is a .jpg, .png, or .gif and then download that stream of data and save it with createWriteStream()
            if (path.extname(article.data.url) === ".jpg" || path.extname(article.data.url) === ".png" || path.extname(article.data.url) === ".gif") {
                rp(article.data.url)
                    .pipe(fs.createWriteStream((`${article.data.id}.jpg`)))
                    .on('close', () => console.log(`downloaded: ${article.data.id}.jpg and saved to ${__dirname}`));
            }
        });

        //TAKE THE NEW ARRAY WE PUSHED EVERY OBJECT IN AND TURN IT INTO JSON
        turnnewdatatojson = JSON.stringify(articleArray);

        //TAKE JSON DATA FROM ABOVE AND WRITE TO FILE
        fs.writeFile(path.join(__dirname, "/popular-articles.json"), turnnewdatatojson, (err) => {
            if (err) return console.log(err);
        });
    })
    .catch(e => console.log(e));
