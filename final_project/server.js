
//! Requiring modules  --  START
var Grass = require("./characters/grass");
var GrassEater = require("./characters/grasseater");
let random = require('./characters/random');
var Gishatich = require("./characters/gishatich");
var Bomb = require("./characters/bomb");
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
gishatichArr = [];
bombArr = [];
//kerparArr = [];
//kerparArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
gishatichHashiv = 0;
bombHashiv = 0;
weather = "";
// kerparHashiv = 0;
// kerparHashiv = 0;

//! Setting global arrays  -- END




//! Creating MATRIX -- START   piti lini evs 2 element
function matrixGenerator(matrixSize, grass, grassEater, gishatich, bomb ) {   
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < gishatich; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < bomb; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }

    // for (let i = 0; i < kerpar; i++) {
    //     let customX = Math.floor(random(matrixSize));
    //     let customY = Math.floor(random(matrixSize));
    //     matrix[customY][customX] = 4;
    // }
    // for (let i = 0; i < kerpar; i++) {
    //     let customX = Math.floor(random(matrixSize));
    //     let customY = Math.floor(random(matrixSize));
    //     matrix[customY][customX] = 4;
    // }

}
matrixGenerator(20, 15, 7, 15, 4);
//! Creating MATRIX -- END // avelacnel evs 2 kerpari hamar



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass_ = new Grass(x, y);
                grassArr.push(grass_);
                grassHashiv++;
            } else if (matrix[y][x] == 2) {
                var grassEater_ = new GrassEater(x, y);
                grassEaterArr.push(grassEater_);
                grassEaterHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var gishatich_ = new Gishatich(x, y);
                gishatichArr.push(gishatich_);
                gishatichHashiv++
            }
            else if (matrix[y][x] == 4) {
                var bomb_ = new Bomb(x,y);
                bombArr.push(bomb_);
                bombHashiv++;
            }
            // else if (matrix[y][x] == 5) {
            //     var kerpar_ = new Kerpar(x,y);
            //     bombArr.push(kerpar_);
            //     bombHashiv++;
            // }
            // else if (matrix[y][x] == 6) {
            //     var kerpar_ = new Kerpar(x,y);
            //     bombArr.push(kerpar_);
            //     bombHashiv++;
            // }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (gishatichArr[0] !== undefined) {
        for (var i in gishatichArr) {
            gishatichArr[i].eat();
        }
    }
    if (bombArr[0] !== undefined) {
        for (var i in bombArr) {
            bombArr[i].eat();
            bombArr[i].move();
        }

    // if (kerparArr[0] !== undefined) {
    //     for (var i in bombArr) {   
    //         kerparArr[i].eat();
    //     }
    // if (kerparArr[0] !== undefined) {
    //     for (var i in kerparArr) {
    //         kerparArr[i].eat();
    //     }       
    }


    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        gishatichCounter: gishatichHashiv,
        bombCounter: bombHashiv
        //kerparCounter: kerparHashiv
        //kerparCounter: kerparHashiv  

    }
    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)