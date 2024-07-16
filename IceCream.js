"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    class IceCream extends Endabgabe_Eisdealer.Sortiment {
        constructor(_positionX, _positionY, _color) {
            super(_positionX, _positionY, _color);
            this.draw();
        }
        draw() {
            Endabgabe_Eisdealer.crc2.save();
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.translate(this.positionX, this.positionY);
            Endabgabe_Eisdealer.crc2.fillStyle = this.color;
            Endabgabe_Eisdealer.crc2.arc(10, 10, 30, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.restore();
        }
    }
    Endabgabe_Eisdealer.IceCream = IceCream;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=IceCream.js.map