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
        sortiment.push(new Endabgabe_Eisdealer.IceCream(1100, 400, "yellow"));
        sortiment.push(new Endabgabe_Eisdealer.Sauce(1000, 400, "purple"));
        sortiment.push(new Endabgabe_Eisdealer.Sprinkles(1050, 400, "red"));
        customers.push(new Endabgabe_Eisdealer.Customer(200, 400, "green"));
        tables.push(new Endabgabe_Eisdealer.Table(450, 80));
        tables.push(new Endabgabe_Eisdealer.Table(750, 200));
        tables.push(new Endabgabe_Eisdealer.Table(450, 290));
        tables.push(new Endabgabe_Eisdealer.Table(650, 440));
        window.addEventListener("keydown", changeMood);
        canvas.addEventListener("pointerdown", tableClicked);
        setInterval(createCustomer, 5000);
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
            for (let customer of customers) {
                customer.changeMood();
            }
        }
    }
    // Table is Clicked
    function tableClicked(_event) {
        let clickX = _event.clientX;
        let clickY = _event.clientY;
        for (let table of tables) {
            if (table instanceof Endabgabe_Eisdealer.Table && table.state === "free") {
                // Check if the click is within the bounds of the table
                if (table.positionX < clickX && clickX < table.positionX + 150 && table.positionY < clickY && clickY < table.positionY + 70) {
                    for (let customer of customers) {
                        if (customer.state == "waiting") {
                            customer.state = "coming";
                            customer.targetPositionX = table.positionX;
                            customer.targetPositionY = table.positionY;
                            table.state = "occupied";
                            break;
                        }
                    }
                }
            }
        }
    }
    // Create a new Customer
    function createCustomer() {
        // Define the range for random positions
        let minX = 50;
        let maxX = 300;
        let minY = 400;
        let maxY = 500;
        //Generate random positions within the defined range
        let x = Math.random() * (maxX - minX) + minX;
        let y = Math.random() * (maxY - minY) + minY;
        customers.push(new Endabgabe_Eisdealer.Customer(x, y, "green"));
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