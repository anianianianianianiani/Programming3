var random = require("./random.js");

module.exports = class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];

    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    eat() {
        this.getNewCoordinates();
        var cel1 = this.chooseCell(1);
        var cel2 = this.chooseCell(2);
        var cel3 = this.chooseCell(3);
        //-----------------cell1------------
        for (var i in cel1) {
            var x = cel1[i][0];
            var y = cel1[i][1];

            matrix[y][x] = 0;

            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        //-----------------cell2---------------
        for (var i in cel2) {
            var x = cel2[i][0];
            var y = cel2[i][1];

            matrix[y][x] = 0;

            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
        //------------------cell3----------------------
        for (var i in cel3) {
            var x = cel3[i][0];
            var y = cel3[i][1];

            matrix[y][x] = 0;

            for (var i in gishatichArr) {
                if (x == gishatichArr[i].x && y == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }
        }
        this.energy++
    }
    move() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0);
        var cell1 = this.chooseCell(1);
        var cell2 = this.chooseCell(2);
        var cell3 = this.chooseCell(3);
        for (var i in emptyCells) {
            if (emptyCells.length != 0) {
                var randomCell = random(emptyCells)

                var x = randomCell[0];
                var y = randomCell[1];

                matrix[y][x] = 4;

                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
            }
        }
        for (var i in cell1) {
            if (cell1.length != 1) {
                var randomCell = random(cell1)

                var x = randomCell[0];
                var y = randomCell[1];

                matrix[y][x] = 4;

                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
            }
        }
        for (var i in cell2) {
            if (cell2.length != 2) {
                var randomCell = random(cell2)

                var x = randomCell[0];
                var y = randomCell[1];

                matrix[y][x] = 4;

                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
            }
        }
        for (var i in cell3) {
            if (cell3.length != 3) {
                var randomCell = random(cell3)

                var x = randomCell[0];
                var y = randomCell[1];

                matrix[y][x] = 4;

                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
            }
        }


    }
}