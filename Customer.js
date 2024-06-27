"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    class Customer {
        positionX;
        positionY;
        color;
        constructor(_positionX, _positionY, _color) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.color = _color;
        }
        move() {
            //this.positionX -= 2
            this.positionX = this.positionX - 2;
            if (this.positionX < 580)
                this.positionX = 580;
            this.draw();
        }
        draw() {
            Endabgabe_Eisdealer.crc2.save();
            Endabgabe_Eisdealer.crc2.beginPath();
            // Draw the face
            Endabgabe_Eisdealer.crc2.translate(this.positionX, this.positionY);
            Endabgabe_Eisdealer.crc2.fillStyle = this.color;
            Endabgabe_Eisdealer.crc2.arc(0, 0, 50, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            // Draw the pupils
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.fillStyle = 'black';
            Endabgabe_Eisdealer.crc2.arc(-25, -10, 5, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.arc(20, -15, 5, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            // Draw the mouth
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.strokeStyle = 'black';
            Endabgabe_Eisdealer.crc2.lineWidth = 5;
            Endabgabe_Eisdealer.crc2.arc(0, 0, 8, 0, Math.PI, false);
            Endabgabe_Eisdealer.crc2.stroke();
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.restore();
        }
        mood() {
            Endabgabe_Eisdealer.crc2.save();
            Endabgabe_Eisdealer.crc2.beginPath();
            // Draw the face
            Endabgabe_Eisdealer.crc2.translate(this.positionX, this.positionY);
            Endabgabe_Eisdealer.crc2.fillStyle = this.color;
            Endabgabe_Eisdealer.crc2.arc(0, 0, 50, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            // Draw the pupils
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.fillStyle = 'black';
            Endabgabe_Eisdealer.crc2.arc(-25, -10, 5, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.arc(20, -15, 5, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            // Draw the mouth
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.strokeStyle = 'black';
            Endabgabe_Eisdealer.crc2.lineWidth = 5;
            Endabgabe_Eisdealer.crc2.arc(0, 0, 8, 0, Math.PI, false);
            Endabgabe_Eisdealer.crc2.stroke();
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.restore();
        }
    }
    Endabgabe_Eisdealer.Customer = Customer;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Customer.js.map