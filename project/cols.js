
var fs = require("fs");
var d;
var inFile = "out1.json";
var res = [];
var obj = {};
var graph2 = [];
fs.readFile(inFile, function (err, data) {
    if (err) throw err;
    data = data.toString();
    d = JSON.parse(data);
    // console.log(d[0]["Table Name"]);
    //***************************data extraction for graph 1 ***********************
    for (var i = 0, len = d.length; i < len; i++) {
        var o = d[i]["Age-group"];
        var li = parseInt(d[i]["Literate - Persons"]);
        if (obj.hasOwnProperty(o)) {

            obj[o] = parseInt(obj[o]) + li;

        }
        else {
            obj[o] = li;
        }
    }

    console.log(obj);
    for (var x in obj) {
        var obj1 = {};
        var ss = x.toString().localeCompare("All ages");
        console.log(ss + x);
        if (x.toString().localeCompare("All ages") != 0 && x.toString().localeCompare("Age not stated") != 0) {
            obj1["cx"] = x;
            obj1["cy"] = obj[x];
            res.push(obj1);
        }
    }

    fs.writeFile("output2.json", JSON.stringify(res), function (err) {
        if (err) throw err;
    });
    //***************************data extraction for graph 2 ***********************
    var calSum = function (col, callback) {
        var sum = 0;
        console.log("inside  calSum");
        for (var i = 0, len = d.length; i < len; i++) {
            var val = parseInt(d[i][col]);
            // console.log(val+" "+d[i][col])
            if (!isNaN(val)) {
                sum = sum + val;
            }
        }
        //return sum;
        console.log(sum);
        callback(sum);
    }
    var cols = ["Educational level - Literate without educational level - Persons",
          "Educational level - Below Primary - Persons",
          "Educational level - Primary - Persons",
          "Educational level - Middle - Persons",
          "Educational level - Matric/Secondary - Persons",
          "Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons",
          "Educational level - Non-technical diploma or certificate not equal to degree - Persons",
          "Educational level - Technical diploma or certificate not equal to degree - Persons",
          "Educational level - Graduate & above - Persons",
          "Educational level - Unclassified - Persons"];
    var extractCols = function (cols, callback) {
        console.log("inside extractcols");
        for (var i = 0, len = cols.length; i < len; i++) {
            var col = cols[i];
            var obj1 = {};
            var in1 = col.indexOf("-");
            var in2 = col.indexOf("/");
            var in3;
            if (in2 == -1) {
                in3 = col.lastIndexOf("-");
            }
            else { in3 = in2; }
            var str = col.substring(in1 + 1, in3).trim();
            //console.log(str);
            obj1["x"] = str.substr(0, 18);
            calSum(col, function (sum) { obj1["y"] = sum; });
          //  console.log(obj1);
            graph2.push(obj1);
        }
        callback(graph2);
    };
    extractCols(cols, function (graph2) {
        //console.log("inside extractcols callback" + graph2);
        fs.writeFile("output3.json", JSON.stringify(graph2), function (err) {
            if (err) throw err;
        });
    });


});
