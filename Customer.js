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
        id;
        static nextId = 1;
        startTime;
        constructor(_positionX, _positionY, _color) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.color = _color;
            this.mood = "happy";
            this.state = "waiting";
            this.targetPositionX = undefined;
            this.targetPositionY = undefined;
            this.id = Customer.nextId++;
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
            else if (this.state == "eating") {
                // Move towards the Cone
                let conePositionX = 900;
                let conePositionY = 270;
                let dx = conePositionX - this.positionX;
                let dy = conePositionY - this.positionY;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 1) {
                    this.positionX += dx / distance * 2;
                    this.positionY += dy / distance * 2;
                }
                else {
                    this.state = "paying";
                }
            }
            else if (this.state == "paying") {
                Endabgabe_Eisdealer.displayCustomerPayment();
            }
            else if (this.state == "waiting" || this.state == "ordering") {
                // Start order timer if not already started
                if (!this.startTime) {
                    this.startTimer();
                }
            }
            else if (this.state == "leaving") {
                let dx = 0 - this.positionX;
                let dy = 0 - this.positionY;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 1) {
                    this.positionX += dx / distance * 2;
                    this.positionY += dy / distance * 2;
                }
                else {
                    // Remove the customer from the scene
                    Endabgabe_Eisdealer.removeElements(this);
                }
            }
            this.draw();
        }
        order() {
            this.state = "ordering";
            Endabgabe_Eisdealer.displayCustomerOrder();
        }
        startTimer() {
            this.startTime = Date.now();
            setTimeout(() => {
                if ((this.state == "waiting" || this.state == "ordering" || this.state == "paying") && this.startTime !== undefined) {
                    let currentTime = Date.now();
                    let elapsedSeconds = (currentTime - this.startTime) / 1000;
                    if (elapsedSeconds > 45) {
                        this.mood = "sad";
                    }
                }
            }, 45000);
        }
        draw() {
            Endabgabe_Eisdealer.crc2.save();
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.translate(this.positionX, this.positionY);
            if (this.mood == "happy") {
                Endabgabe_Eisdealer.crc2.fillStyle = this.color;
            }
            else if (this.mood == "sad") {
                Endabgabe_Eisdealer.crc2.fillStyle = "red";
            }
            else if (this.mood == "excited") {
                Endabgabe_Eisdealer.crc2.fillStyle = "rgb(81,242,0)";
            }
            Endabgabe_Eisdealer.crc2.arc(0, 0, 40, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.fillStyle = 'black';
            Endabgabe_Eisdealer.crc2.arc(-20, -10, 4, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.arc(15, -15, 4, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.strokeStyle = 'black';
            Endabgabe_Eisdealer.crc2.lineWidth = 5;
            if (this.mood == "happy") {
                Endabgabe_Eisdealer.crc2.arc(0, 0, 8, 0, Math.PI, false);
            }
            else if (this.mood == "sad") {
                Endabgabe_Eisdealer.crc2.arc(0, 8, 8, Math.PI, 2 * Math.PI, false);
            }
            else if (this.mood == "excited") {
                Endabgabe_Eisdealer.crc2.arc(0, 0, 15, 0, Math.PI, false);
            }
            Endabgabe_Eisdealer.crc2.stroke();
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.restore();
        }
    }
    Endabgabe_Eisdealer.Customer = Customer;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Customer.js.map