"use strict";
var L09_Ententeich;
(function (L09_Ententeich) {
    class Moveable {
        positionX;
        positionY;
        color;
        constructor(_positionX, _positionY, _color) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.color = _color;
            this.draw();
        }
        move() { }
        draw() { }
    }
    L09_Ententeich.Moveable = Moveable;
})(L09_Ententeich || (L09_Ententeich = {}));
//# sourceMappingURL=Moveable.js.map