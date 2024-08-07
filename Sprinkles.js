"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    class Sprinkles extends Endabgabe_Eisdealer.Sortiment {
        constructor(_positionX, _positionY, _color) {
            super(_positionX, _positionY, _color);
            this.draw();
        }
        draw() {
            Endabgabe_Eisdealer.crc2.save();
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.translate(this.positionX, this.positionY);
            Endabgabe_Eisdealer.crc2.fillStyle = this.color;
            Endabgabe_Eisdealer.crc2.fillRect(0, 0, 10, 20);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.restore();
        }
    }
    Endabgabe_Eisdealer.Sprinkles = Sprinkles;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Sprinkles.js.map