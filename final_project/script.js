// var matrix = [];

var rowCount = 50;
var columnCount = 50;
// var matrix = [
//    [0, 0, 1, 0, 0],
//    [1, 0, 2, 0, 0],
//    [3, 1, 0, 2, 0],
//    [0, 0, 1, 3, 0],
//    [1, 1, 0, 0, 0],
//    [1, 1, 2, 3, 2],//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    // var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let gishatichCountElement = document.getElementById('gishatichCount');
    let bombCountElement = document.getElementById('bombCount');
    //let kerparCountElement = document.getElementById('kerparCount');
    //let kerparCountElement = document.getElementById('kerparCount');


    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement = data.grassEaterCounter;
        gishatichCountElement = data.gishatichCounter;
        bombCountElement = data.bombCounter;
        // kerparCountElement = data.kerparCounter;
        // kerparCountElement = data.kerparCounter;




        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 1) {
                    fill("green");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);

                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                }
                // else if (matrix[i][j] == 5) {
                //     fill('purple');
                //     rect(j * side, i * side, side, side);
                // }
                // else if (matrix[i][j] == 6) {
                //     fill('black');
                //     rect(j * side, i * side, side, side);
                // }

            }
        }
    }
    //    [1, 1, 0, 0, 0]
    // ];

    var side = 15;

    // var grassArr = [];
    // var grassEaterArr = [];
    // var gishatichArr = [];
    // var bombArr = [];
    //var kerparArr = [];
    // var kerparArr = [];


    function setup() {
        for (var y = 0; y < rowCount; ++y) {
            matrix[y] = [];

            for (var x = 0; x < columnCount; ++x) {
                matrix[y][x] = Math.round(random(0, 4));
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
                    var bombb = new Bomb(x, y, 4)
                    bombArr.push(bombb);
                }
                // else if (matrix[y][x] == 5) {
                //     var kerparr = new Kerpar(x, y, 5)
                //     kerparArr.push(kerparr);
                // }
                // else if (matrix[y][x] == 6) {
                //     var kerparr = new Kerpar(x, y, 6)
                //     kerparArr.push(kerparr);
                // }
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

        // for (var i in kerparArr) {
        //     kerparArr[i].eat();
        // }
        // for (var i in kerparArr) {
        //     kerparArr[i].eat();
        // }


    }
    function drawMatrix() {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {

                if (matrix[y][x] == 0) {
                    fill("#acacac");
                    rect(x * side, y * side, side, side);
                } else if (matrix[y][x] == 1) {
                    fill("green");
                    rect(x * side, y * side, side, side);
                } else if (matrix[y][x] == 2) {
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
                // else if (matrix[y][x] == 5) {
                //     fill("purple");
                //     rect(x * side, y * side, side, side);
                // }
                // else if (matrix[y][x] == 6) {
                //     fill("black");
                //     rect(x * side, y * side, side, side);
                // }
            }
        }
    }



}
