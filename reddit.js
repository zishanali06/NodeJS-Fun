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
    });
    turnnewdatatojson = JSON.stringify(articleArray);
    fs.writeFile(path.join(__dirname, "/popular-articles.json"), turnnewdatatojson, (err) => {
        if(err) return console.log(err);
    });
})
.catch(e => console.log(e));


fs.writeFile(path.join(__dirname, "../reddit.js"), datainjson, (err, data) => {
    if(err) return console.log(err);
});