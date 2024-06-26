"use strict";
var L09_Ententeich;
(function (L09_Ententeich) {
    class Insect extends L09_Ententeich.Moveable {
        constructor(_positionX, _positionY, _color) {
            super(_positionX, _positionY, _color);
        }
        move() {
            const movementRange = 2;
            let randomX = (Math.random() - 0.5) * movementRange;
            let randomY = (Math.random() - 0.5) * movementRange;
            this.positionX += randomX;
            this.positionY += randomY;
            this.draw();
        }
        draw() {
            L09_Ententeich.crc2.save();
            L09_Ententeich.crc2.beginPath();
            L09_Ententeich.crc2.translate(this.positionX, this.positionY);
            L09_Ententeich.crc2.fillStyle = this.color;
            L09_Ententeich.crc2.ellipse(35, 35, 10, 5, 0, 0, 2 * Math.PI);
            L09_Ententeich.crc2.fill();
            L09_Ententeich.crc2.closePath();
            L09_Ententeich.crc2.restore();
        }
    }
    L09_Ententeich.Insect = Insect;
})(L09_Ententeich || (L09_Ententeich = {}));
//# sourceMappingURL=Insects.js.map