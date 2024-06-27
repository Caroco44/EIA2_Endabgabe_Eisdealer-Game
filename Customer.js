"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    class Customer extends Endabgabe_Eisdealer.Food {
        state;
        constructor(_positionX, _positionY, _color) {
            super(_positionX, _positionY, _color);
            this.state = "swim";
        }
        moveSwim() {
            if (this.state == "swim") {
                //this.positionX -= 2
                this.positionX = this.positionX - 2;
                if (this.positionX < 580)
                    this.positionX = 580;
                this.draw();
            }
        }
        moveEat() {
            if (this.state == "eat") {
                // Ente soll sich auf Brot zubewegen
                console.log("moveEat ausgelöst");
                this.draw();
            }
        }
        changeColor() {
            if (this.color == "purple") {
                this.color = "yellow";
            }
            else {
                this.color = "purple";
            }
        }
        draw() {
            Endabgabe_Eisdealer.crc2.save();
            Endabgabe_Eisdealer.crc2.beginPath();
            Endabgabe_Eisdealer.crc2.translate(this.positionX, this.positionY);
            Endabgabe_Eisdealer.crc2.fillStyle = this.color;
            Endabgabe_Eisdealer.crc2.arc(10, 10, 20, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.ellipse(35, 35, 40, 20, 0, 0, 2 * Math.PI);
            Endabgabe_Eisdealer.crc2.fill();
            Endabgabe_Eisdealer.crc2.closePath();
            Endabgabe_Eisdealer.crc2.restore();
        }
    }
    Endabgabe_Eisdealer.Customer = Customer;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Customer.js.map