var fs = require("fs");
var str = "[\n";
var file1 = "India2011.csv";
var file2 = "IndiaSC2011.csv";
var file3 = "IndiaST2011.csv";
var outFile = "out.json";
var numberOfFiles=3;
var count = 0;
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

            str = str + "{";
            for (var j = 0, len1 = value.length; j < len1; j = j + 1) {
                //console.log(key[j] + " : " + value[j]+"\n");
                if (value[j] != undefined || value[j].trim() != "") {
                    if (j == len1 - 1) {
                        var name = key[j].substr(0, key[j].length - 2);
                        var val1 = parseFloat(value[j]);
                        str = str + "\"" + name + "\"" + ":" + "\"" + val1 + "\"";
                        //str = str +key[j]+ ":" + value[j];

                    }
                    else {
                        str = str + "\"" + key[j] + "\"" + ":" + "\"" + value[j] + "\"" + ",";
                        // str = str +key[j]+ ":" + value[j]+",";
                    }
                }
            }
            if (count == numberOfFiles) {
                str = str + "}\n";
            }
            else {
                str = str + "},\n";
            }

        }
        console.log("-----Parsed " + inFile + " --------");
        callback(str);
    });
};
var converter = function () {
    parse(file1, function (str) {
        parse(file2, function (str) {
            parse(file3, function (str) {
                str = str + "]";
                fs.writeFile(outFile,str, function (err) {
                    if (err) throw err;
                    console.log("----sucessfully converted----\n output filename : "+outFile);
                })
            })
        })
    })
};
converter();
