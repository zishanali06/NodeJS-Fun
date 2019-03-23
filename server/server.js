let path = require('path');
let fs = require('fs');
let rp = require('request-promise');

let chirpArray = [{
        name: 'Zishan',
        age: 29,
        location: "Dallas"
    },
    {
        name: 'Ashley',
        age: 28,
        location: "Dallas"
    },
    {
        name: 'BOOM BOOM',
        age: 29,
        location: "Dallas"
    },
    {
        name: 'Starla',
        age: 2,
        location: "Dallas"
    },
    {
        name: 'James',
        age: 13,
        location: "Dallas"
    }];

let newdata = JSON.stringify(chirpArray);

let chirppath = path.join(__dirname, "../chirps.json");

fs.writeFile(chirppath, newdata, (err, data) => {
    if(err) return console.log(err);

    console.log("Wrote chirps.json file");
});

fs.readFile(chirppath, (err, data) => {
    if(err) console.log(err);
    
    let turndataintoobject = JSON.parse(data);
    console.log(JSON.parse(data));
    turndataintoobject.forEach(singleobject => {
        console.log(`${singleobject.name} is ${singleobject.age} and lives in ${singleobject.location}`);
    });
})

rp('https://reddit.com/r/popular.json')
    .then((data) => {
        let redditdata = JSON.parse(data);
        fs.writeFile(path.join(__dirname, "../reddit.js"), redditdata, (err, data) => {
            if(err) return console.log(err);
        
            console.log("Wrote chirps.json file");
        });
    })
    .catch(e => console.log(e));


