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
            Endabgabe_Eisdealer.crc2.translate(this.positionX, this.positionY);
            Endabgabe_Eisdealer.crc2.fillStyle = "rgb(125,58,37)";
            Endabgabe_Eisdealer.crc2.fillRect(0, 0, 150, 70);
            Endabgabe_Eisdealer.crc2.restore();
        }
        reset() {
            this.state = "free";
        }
    }
    Endabgabe_Eisdealer.Table = Table;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Table.js.map