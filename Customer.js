"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    class Customer {
        positionX;
        positionY;
        color;
        mood;
        state;
        targetPositionX;
        targetPositionY;
        constructor(_positionX, _positionY, _color) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.color = _color;
            this.mood = "happy";
            this.state = "waiting";
            this.targetPositionX = undefined;
            this.targetPositionY = undefined;
        }
        move() {
            if (this.state == "coming" && this.targetPositionX !== undefined && this.targetPositionY !== undefined) {
                // Move towards the target table
                let dx = this.targetPositionX - this.positionX;
                let dy = this.targetPositionY - this.positionY;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 1) {
                    this.positionX += dx / distance * 2;
                    this.positionY += dy / distance * 2;
                }
                else {
                    this.order();
                }
            }
            this.draw();
        }
        order() {
            this.state = "ordering";
            console.log("I want to order now");
            Endabgabe_Eisdealer.displayCustomerOrder();
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