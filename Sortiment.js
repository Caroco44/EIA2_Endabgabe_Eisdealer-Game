"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    class Food {
        positionX;
        positionY;
        color;
        // zusätzliche Eigenschaften
        state;
        price;
        name;
        constructor(_positionX, _positionY, _color) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.color = _color;
            this.draw();
        }
        move() { }
        draw() { }
    }
    Endabgabe_Eisdealer.Food = Food;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Sortiment.js.map