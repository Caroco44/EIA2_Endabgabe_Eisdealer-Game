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
    let cone = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Endabgabe_Eisdealer.crc2 = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawBackground();
        imgData = Endabgabe_Eisdealer.crc2.getImageData(0, 0, Endabgabe_Eisdealer.crc2.canvas.width, Endabgabe_Eisdealer.crc2.canvas.height);
        customers.push(new Endabgabe_Eisdealer.Customer(200, 400, "green"));
        cone.push(new Endabgabe_Eisdealer.Cone(900, 270));
        tables.push(new Endabgabe_Eisdealer.Table(400, 80));
        tables.push(new Endabgabe_Eisdealer.Table(600, 200));
        tables.push(new Endabgabe_Eisdealer.Table(400, 320));
        tables.push(new Endabgabe_Eisdealer.Table(600, 440));
        window.addEventListener("keydown", changeMood);
        canvas.addEventListener("pointerdown", tableClicked);
        Endabgabe_Eisdealer.createData();
        document.querySelectorAll("input[type='checkbox'], input[type='number']").forEach(input => {
            input.addEventListener("change", Endabgabe_Eisdealer.calculatePrice);
        });
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
        if (customers.length < 7) {
            // Define the range for random positions
            let minX = 50;
            let maxX = 300;
            let minY = 400;
            let maxY = 500;
            // Generate random positions within the defined range
            let x = Math.random() * (maxX - minX) + minX;
            let y = Math.random() * (maxY - minY) + minY;
            customers.push(new Endabgabe_Eisdealer.Customer(x, y, "green"));
        }
    }
    function updateIceCreamDrawing() {
        let updatedItems = []; // Use Sortiment type array to hold all items
        for (let iceCream of Endabgabe_Eisdealer.data.IceCream) {
            let iceCreamCheckbox = document.querySelector(`input[name="${iceCream.name}"]`);
            let iceCreamNumber = iceCreamCheckbox?.nextElementSibling;
            if (iceCreamCheckbox?.checked) {
                let quantity = parseInt(iceCreamNumber.value) || 0;
                for (let i = 0; i < quantity; i++) {
                    updatedItems.push(new Endabgabe_Eisdealer.IceCream(900, 140, iceCream.color));
                }
            }
        }
        // Merge updated items into sortiment
        sortiment = [...sortiment.filter(item => !(item instanceof Endabgabe_Eisdealer.IceCream)), ...updatedItems];
    }
    Endabgabe_Eisdealer.updateIceCreamDrawing = updateIceCreamDrawing;
    function updateSauceDrawing() {
        let updatedItems = []; // Use Sortiment type array to hold all items
        for (let sauce of Endabgabe_Eisdealer.data.Sauce) {
            let sauceCheckbox = document.querySelector(`input[name="${sauce.name}"]`);
            let sauceNumber = sauceCheckbox?.nextElementSibling;
            if (sauceCheckbox?.checked) {
                let quantity = parseInt(sauceNumber.value) || 0;
                for (let i = 0; i < quantity; i++) {
                    updatedItems.push(new Endabgabe_Eisdealer.Sauce(900, 100, sauce.color));
                }
            }
        }
        // Merge updated items into sortiment
        sortiment = [...sortiment.filter(item => !(item instanceof Endabgabe_Eisdealer.Sauce)), ...updatedItems];
    }
    Endabgabe_Eisdealer.updateSauceDrawing = updateSauceDrawing;
    function updateSprinkleDrawing() {
        let updatedItems = []; // Use Sortiment type array to hold all items
        for (let sprinkle of Endabgabe_Eisdealer.data.Sprinkles) {
            let sprinkleCheckbox = document.querySelector(`input[name="${sprinkle.name}"]`);
            let sprinkleNumber = sprinkleCheckbox?.nextElementSibling;
            if (sprinkleCheckbox?.checked) {
                let quantity = parseInt(sprinkleNumber.value) || 0;
                for (let i = 0; i < quantity; i++) {
                    updatedItems.push(new Endabgabe_Eisdealer.Sprinkles(900, 100, sprinkle.color));
                }
            }
        }
        // Merge updated items into sortiment
        sortiment = [...sortiment.filter(item => !(item instanceof Endabgabe_Eisdealer.Sprinkles)), ...updatedItems];
    }
    Endabgabe_Eisdealer.updateSprinkleDrawing = updateSprinkleDrawing;
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
        for (let cones of cone) {
            cones.draw();
        }
    }
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Main.js.map