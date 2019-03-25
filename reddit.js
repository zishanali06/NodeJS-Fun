let path = require('path');
let fs = require('fs');
let rp = require('request-promise');

let articleArray = [];


//USE request-promise to get data from the URL
rp('https://reddit.com/r/popular.json')
    .then((datainjson) => {
        
        //Takes the JSON we got from the URL and turns it into a javascript array
        let datainjavascript = JSON.parse(datainjson);

        //had to look thru data that was coming in to figure out where the right data was
        datainjavascript.data.children.forEach(article => {
            let art = {
                title: article.data.title,
                url: article.data.url,
                auth: article.data.author
            }
            articleArray.push(art);
        });

        //TAKE THE NEW ARRAY WE PUSHED EVERY OBJECT IN AND TURNS IT INTO JSON
        turnnewdatatojson = JSON.stringify(articleArray);

        //TAKE JSON DATA FROM ABOVE AND WRITE TO FILE
        fs.writeFile(path.join(__dirname, "/popular-articles.json"), turnnewdatatojson, (err) => {
            if (err) return console.log(err);
        });
    })
    .catch(e => console.log(e));
