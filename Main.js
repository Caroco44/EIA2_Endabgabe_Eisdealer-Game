"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    // export interface Vector {
    //   x: number;
    //   y: number;
    // }
    window.addEventListener("load", handleLoad);
    let imgData;
    // Array of Ice Cream
    let moveables = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Endabgabe_Eisdealer.crc2 = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawBackground();
        imgData = Endabgabe_Eisdealer.crc2.getImageData(0, 0, Endabgabe_Eisdealer.crc2.canvas.width, Endabgabe_Eisdealer.crc2.canvas.height);
        moveables.push(new Endabgabe_Eisdealer.Customer(1000, 420, "yellow"));
        moveables.push(new Endabgabe_Eisdealer.Customer(1200, 320, "lightblue"));
        window.setInterval(function () {
            animation();
        }, 24);
    }
    // Animate the Moveables
    function animation() {
        drawBackground();
        Endabgabe_Eisdealer.crc2.putImageData(imgData, 0, 0);
        for (let moveable of moveables) {
            moveable.move();
        }
    }
    // Draw Background
    function drawBackground() {
        let gradient = Endabgabe_Eisdealer.crc2.createLinearGradient(0, 0, 0, Endabgabe_Eisdealer.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(1, "lightpink");
        Endabgabe_Eisdealer.crc2.fillStyle = gradient;
        Endabgabe_Eisdealer.crc2.fillRect(0, 0, Endabgabe_Eisdealer.crc2.canvas.width, Endabgabe_Eisdealer.crc2.canvas.height);
    }
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Main.js.map