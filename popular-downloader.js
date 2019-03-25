let path = require('path');
let fs = require('fs');
let rp = require('request-promise');

rp('https://reddit.com/r/popular.json')
.then((data) => {
    let datatojs = JSON.parse(data);

    datatojs.data.children.forEach(singlearticle => {
        //check if the URL of the article is a .jpg, .png, or .gif and then download that stream of data and save it with createWriteStream()
        if (path.extname(singlearticle.data.url) === ".jpg" || path.extname(singlearticle.data.url) === ".png" || path.extname(singlearticle.data.url) === ".gif") {
            rp(singlearticle.data.url)
                .pipe(fs.createWriteStream((`${__dirname}/downloads/${singlearticle.data.id}.jpg`)))
                .on('close', () => console.log(`downloaded: ${singlearticle.data.id}.jpg and saved to ${__dirname}\\downloads\\`));
        }
    });
});