"use strict";
var L09_Ententeich;
(function (L09_Ententeich) {
    class Duck extends L09_Ententeich.Moveable {
        state;
        constructor(_positionX, _positionY, _color) {
            super(_positionX, _positionY, _color);
            this.state = "swim";
        }
        moveSwim() {
            if (this.state == "swim") {
                //this.positionX -= 2
                this.positionX = this.positionX - 2;
                if (this.positionX < 580)
                    this.positionX = 580;
                this.draw();
            }
        }
        moveEat() {
            if (this.state == "eat") {
                // Ente soll sich auf Brot zubewegen
                console.log("moveEat ausgelöst");
                this.draw();
            }
        }
        changeColor() {
            if (this.color == "purple") {
                this.color = "yellow";
            }
            else {
                this.color = "purple";
            }
        }
        draw() {
            L09_Ententeich.crc2.save();
            L09_Ententeich.crc2.beginPath();
            L09_Ententeich.crc2.translate(this.positionX, this.positionY);
            L09_Ententeich.crc2.fillStyle = this.color;
            L09_Ententeich.crc2.arc(10, 10, 20, 0, 2 * Math.PI);
            L09_Ententeich.crc2.fill();
            L09_Ententeich.crc2.ellipse(35, 35, 40, 20, 0, 0, 2 * Math.PI);
            L09_Ententeich.crc2.fill();
            L09_Ententeich.crc2.closePath();
            L09_Ententeich.crc2.restore();
        }
    }
    L09_Ententeich.Duck = Duck;
})(L09_Ententeich || (L09_Ententeich = {}));
//# sourceMappingURL=Duck.js.map