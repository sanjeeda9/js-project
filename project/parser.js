var fs = require("fs");
var file1 = "India2011.csv";
var file2 = "IndiaSC2011.csv";
var file3 = "IndiaST2011.csv";
var outFile = "out1.json";
var numberOfFiles=3;
var count = 0;
var result = [];
var parse = function (inFile, callback) {
    fs.readFile(inFile, function (err, data) {
        if (err) {
            throw err;
        }
        var d = data.toString();
        var line = d.split('\n');

        //heading 
        var key = line[0].split(",");
        count = count + 1;
        for (var i = 1, len = line.length; i < len - 1; i = i + 1) {
            var value = line[i].split(",");

            var obj = {};
            for (var j = 0, len1 = value.length; j < len1; j = j + 1) {
                //console.log(key[j] + " : " + value[j]+"\n");
                if (value[j] != undefined || value[j].trim() != "") {
                    obj[key[j]] = value[j];
                }
            }
            result.push(obj);

        }
        console.log("-----Parsed " + inFile + " --------");
        callback(result);
    });
};
var converter = function () {
    parse(file1, function (result) {
        parse(file2, function (result) {
            parse(file3, function (result) {
                fs.writeFile(outFile,JSON.stringify(result), function (err) {
                    if (err) throw err;
                    console.log("----sucessfully converted----\n output filename : "+outFile);
                })
            })
        })
    })
};
converter();
