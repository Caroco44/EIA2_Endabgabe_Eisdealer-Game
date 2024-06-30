"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    class Table {
        positionX;
        positionY;
        state;
        constructor(_positionX, _positionY) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.state = "free";
        }
        draw() {
            Endabgabe_Eisdealer.crc2.save();
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.save();
            Endabgabe_Eisdealer.crc2.translate(this.positionX, this.positionY);
            if (this.state == "free") {
                Endabgabe_Eisdealer.crc2.fillStyle = "brown";
            }
            else if (this.state == "occupied") {
                Endabgabe_Eisdealer.crc2.fillStyle = "purple";
            }
            Endabgabe_Eisdealer.crc2.fillRect(0, 0, 150, 70);
            Endabgabe_Eisdealer.crc2.restore();
        }
    }
    Endabgabe_Eisdealer.Table = Table;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Table.js.map