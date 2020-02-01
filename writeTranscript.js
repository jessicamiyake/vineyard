var fs = require("fs");
fs.readFile('transcribe.json', 'utf-8', (err, fileData) => {
    if (err) {
        console.log(err);
    } else {
        try {
            var data = JSON.parse(fileData);
            var dialogue = transcribe.transcript;
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    }
    console.log(jsonString);
});

fs.writeFile('vines.json',