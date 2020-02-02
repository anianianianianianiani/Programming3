var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class GrassEater extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
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
        return super.chooseCell(character);
    }
    mult() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newGrass = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
            this.energy = 3;
        }
    }
    eat() {
        this.getNewCoordinates();

        var filledCells = this.chooseCell(1);
        if (filledCells.length != 0) {
            var randomCell = random(filledCells)

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 2;

            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy++;

            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 3) {
                this.mult();
            }
        }
        else this.move();
    }

    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        if (emptyCells.length != 0) {
            var randomCell = random(emptyCells)

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 2;

            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }

        if (this.energy <= 0) this.die();
    }

    die() {
        matrix[this.y][this.x] = 0;

        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}

