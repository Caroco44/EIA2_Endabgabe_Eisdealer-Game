"use strict";
var L09_Ententeich;
(function (L09_Ententeich) {
    class BabyDuck extends L09_Ententeich.Moveable {
        constructor(_positionX, _positionY, _color) {
            super(_positionX, _positionY, _color);
        }
        move() {
            //this.positionX -= 2
            this.positionX = this.positionX - 2;
            if (this.positionX < 580)
                this.positionX = 580;
            this.draw();
        }
        changeColor() {
            if (this.color == "lightblue") {
                this.color = "red";
            }
            else {
                this.color = "lightblue";
            }
        }
        draw() {
            L09_Ententeich.crc2.save();
            L09_Ententeich.crc2.beginPath();
            L09_Ententeich.crc2.translate(this.positionX, this.positionY);
            L09_Ententeich.crc2.scale(0.5, 0.5);
            L09_Ententeich.crc2.fillStyle = this.color;
            L09_Ententeich.crc2.arc(10, 10, 20, 0, 2 * Math.PI);
            L09_Ententeich.crc2.fill();
            L09_Ententeich.crc2.ellipse(35, 35, 40, 20, 0, 0, 2 * Math.PI);
            L09_Ententeich.crc2.fill();
            L09_Ententeich.crc2.closePath();
            L09_Ententeich.crc2.restore();
        }
    }
    L09_Ententeich.BabyDuck = BabyDuck;
})(L09_Ententeich || (L09_Ententeich = {}));
//# sourceMappingURL=BabyDuck.js.map