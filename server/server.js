let path = require('path');
let fs = require('fs');

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
        name: 'Fehzan',
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
    console.log(turndataintoobject);
})


