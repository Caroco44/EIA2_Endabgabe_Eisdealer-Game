"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    class Customer {
        positionX;
        positionY;
        color;
        mood;
        state;
        constructor(_positionX, _positionY, _color) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.color = _color;
            this.mood = "happy";
            this.state = "waiting";
        }
        move() {
            if (this.state == "waiting") {
                // move to certain area and wait
                // this.positionX = 100 + Math.random() * (500 - 100);
                // this.positionY = 500 + Math.random() * (900 - 500);
            }
            else if (this.state == "coming") {
                // move to free table
            }
            else if (this.state == "leaving") {
                // leave the screen and switch back to waiting
            }
            this.draw();
        }
        draw() {
            Endabgabe_Eisdealer.crc2.save();
            Endabgabe_Eisdealer.crc2.beginPath();
            // Draw the face
            Endabgabe_Eisdealer.crc2.translate(this.positionX, this.positionY);
            if (this.mood == "happy") {
                Endabgabe_Eisdealer.crc2.fillStyle = this.color;
            }
            else if (this.mood == "sad") {
                Endabgabe_Eisdealer.crc2.fillStyle = "red";
            }
            Endabgabe_Eisdealer.crc2.arc(0, 0, 40, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            // Draw the pupils
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.fillStyle = 'black';
            Endabgabe_Eisdealer.crc2.arc(-20, -10, 4, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.arc(15, -15, 4, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            // Draw the mouth based on mood
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.strokeStyle = 'black';
            Endabgabe_Eisdealer.crc2.lineWidth = 5;
            if (this.mood == "happy") {
                Endabgabe_Eisdealer.crc2.arc(0, 0, 8, 0, Math.PI, false);
            }
            else if (this.mood == "sad") {
                Endabgabe_Eisdealer.crc2.arc(0, 8, 8, Math.PI, 2 * Math.PI, false);
            }
            Endabgabe_Eisdealer.crc2.stroke();
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.restore();
        }
        // Toggle between moods
        changeMood() {
            if (this.mood == "happy") {
                this.mood = "sad";
            }
            else {
                this.mood = "happy";
            }
        }
    }
    Endabgabe_Eisdealer.Customer = Customer;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Customer.js.map