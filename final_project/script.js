var matrix = [];

var rowCount = 50;
var columnCount = 50;
// var matrix = [
//    [0, 0, 1, 0, 0],
//    [1, 0, 2, 0, 0],
//    [3, 1, 0, 2, 0],
//    [0, 0, 1, 3, 0],
//    [1, 1, 0, 0, 0],
//    [1, 1, 2, 3, 2],
//    [1, 1, 0, 0, 0]
// ];

var side = 15;

var grassArr = [];
var grassEaterArr = [];
var gishatichArr = [];
var bombArr = [];


function setup() {
    for (var y = 0; y < rowCount; ++y) {
        matrix[y] = [];

        for (var x = 0; x < columnCount; ++x) {
            matrix[y][x] = Math.round(random(0,3));
        }
    }

    var randomRow = Math.floor(random(rowCount));
    var randomColumn = Math.floor(random(columnCount));

    matrix[randomRow][randomColumn] = 4;

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gret = new GrassEater(x, y, 2)
                grassEaterArr.push(gret);
            }
            else if (matrix[y][x] == 3) {
                var gish = new Gishatich(x, y, 3)
                gishatichArr.push(gish);
            }
            else if (matrix[y][x] == 4) {
                var bombb = new bomb(x, y, 4)
                bombArr.push(bombb);
            }
        }
    }
}

function draw() {
    drawMatrix();
    for (var i in grassArr) {
        grassArr[i].mult();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }

    for (var i in gishatichArr) {
        gishatichArr[i].eat();
    }
    for (var i in bombArr) {
        bombArr[i].eat();
        bombArr[i].move();
    }


}
function drawMatrix() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
        }
    }
}




