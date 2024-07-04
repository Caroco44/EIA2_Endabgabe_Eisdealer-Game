"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    class Cone {
        positionX;
        positionY;
        constructor(_positionX, _positionY) {
            this.positionX = _positionX;
            this.positionY = _positionY;
        }
        move() {
            this.draw();
        }
        draw() {
            Endabgabe_Eisdealer.crc2.save();
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.translate(900, 270);
            Endabgabe_Eisdealer.crc2.moveTo(0, 0);
            Endabgabe_Eisdealer.crc2.lineTo(-50, -100);
            Endabgabe_Eisdealer.crc2.lineTo(50, -100);
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.fillStyle = "brown";
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.restore();
        }
    }
    Endabgabe_Eisdealer.Cone = Cone;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Cone.js.map