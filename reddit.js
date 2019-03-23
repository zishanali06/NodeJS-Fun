let path = require('path');
let fs = require('fs');
let rp = require('request-promise');

let articleArray = [];

rp('https://reddit.com/r/popular.json')
.then((datainjson) => {
    let datainjavascript = JSON.parse(datainjson);
    datainjavascript.data.children.forEach(article => {
        let art = {
            title: article.data.title,
            url: article.data.url,
            auth: article.data.author
        }
        articleArray.push(art);
        if(path.extname(article.data.url) === ".jpg"){
            console.log('TEST111');
            rp(article.data.url).pipe(fs.createWriteStream((`${article.data.id}.jpg`))).on('close', () => console.log("downloaded"));
        }
    });
    turnnewdatatojson = JSON.stringify(articleArray);
    fs.writeFile(path.join(__dirname, "/popular-articles.json"), turnnewdatatojson, (err) => {
        if(err) return console.log(err);
    });
})
.catch(e => console.log(e));
