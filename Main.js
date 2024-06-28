"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    // export interface Vector {
    //   x: number;
    //   y: number;
    // }
    window.addEventListener("load", handleLoad);
    let imgData;
    // Arrays
    let sortiment = [];
    let customers = [];
    let tables = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Endabgabe_Eisdealer.crc2 = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawBackground();
        imgData = Endabgabe_Eisdealer.crc2.getImageData(0, 0, Endabgabe_Eisdealer.crc2.canvas.width, Endabgabe_Eisdealer.crc2.canvas.height);
        // Create Ingredients of Food
        // sortiment.push(new IceCream(1000, 420, "yellow"));
        // sortiment.push(new IceCream(1200, 320, "lightblue"));
        //Create Objects
        customers.push(new Endabgabe_Eisdealer.Customer(200, 400, "green"));
        tables.push(new Endabgabe_Eisdealer.Table(450, 80));
        tables.push(new Endabgabe_Eisdealer.Table(750, 200));
        tables.push(new Endabgabe_Eisdealer.Table(450, 290));
        tables.push(new Endabgabe_Eisdealer.Table(650, 440));
        window.addEventListener("keydown", changeMood);
        window.setInterval(function () {
            animation();
        }, 24);
    }
    // Draw Background
    function drawBackground() {
        let gradient = Endabgabe_Eisdealer.crc2.createLinearGradient(0, 0, 0, Endabgabe_Eisdealer.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(1, "lightpink");
        Endabgabe_Eisdealer.crc2.fillStyle = gradient;
        Endabgabe_Eisdealer.crc2.fillRect(0, 0, Endabgabe_Eisdealer.crc2.canvas.width, Endabgabe_Eisdealer.crc2.canvas.height);
    }
    // Change Mood
    function changeMood(_event) {
        if (_event.code == "Space") {
            for (let moveable of customers) {
                if (moveable instanceof Endabgabe_Eisdealer.Customer) {
                    moveable.changeMood();
                }
            }
        }
    }
    // Animation
    function animation() {
        drawBackground();
        Endabgabe_Eisdealer.crc2.putImageData(imgData, 0, 0);
        for (let food of sortiment) {
            food.move();
        }
        for (let customer of customers) {
            customer.move();
        }
        for (let table of tables) {
            table.draw();
        }
    }
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Main.js.map