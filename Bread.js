"use strict";
var L09_Ententeich;
(function (L09_Ententeich) {
    class Bread {
        positionX;
        positionY;
        color;
        constructor(_positionX, _positionY, _color) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.color = _color;
        }
        draw() {
            L09_Ententeich.crc2.save();
            L09_Ententeich.crc2.beginPath();
            L09_Ententeich.crc2.translate(this.positionX, this.positionY);
            L09_Ententeich.crc2.fillStyle = this.color;
            L09_Ententeich.crc2.ellipse(0, 0, 5, 4, 0, 0, 2 * Math.PI);
            L09_Ententeich.crc2.fill();
            L09_Ententeich.crc2.closePath();
            L09_Ententeich.crc2.restore();
        }
    }
    L09_Ententeich.Bread = Bread;
})(L09_Ententeich || (L09_Ententeich = {}));
//# sourceMappingURL=Bread.js.map