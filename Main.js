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
        displayCustomerOrder();
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
            if (table instanceof Endabgabe_Eisdealer.Table && table.state == "free") {
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
    function displayCustomerOrder() {
        let orderingCustomers = customers.filter(customer => customer.state == "ordering");
        if (orderingCustomers.length > 0) {
            console.log("displayCustomerOrder was called");
            // Create a new div element with the content "hello world"
            let order = document.createElement("div");
            order.textContent = "hello world";
            order.classList.add("order-item");
            // Get the container div where the order should be displayed
            let customerOrderDiv = document.createElement("div");
            customerOrderDiv.classList.add("customerOrder");
            // Append the new order div to the customerOrderDiv
            customerOrderDiv.appendChild(order);
            // Append the customerOrderDiv to the document body or another appropriate parent element
            document.body.appendChild(customerOrderDiv);
        }
    }
    Endabgabe_Eisdealer.displayCustomerOrder = displayCustomerOrder;
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
        let updatedItems = []; // Array für die aktualisierten Elemente
        // Map, um existierende Eiskugeln nach Farbe zu gruppieren
        let existingIceCreamsByColor = new Map();
        // Füllen der Map mit existierenden Eiskugeln
        sortiment.forEach(item => {
            if (item instanceof Endabgabe_Eisdealer.IceCream) {
                if (!existingIceCreamsByColor.has(item.color)) {
                    existingIceCreamsByColor.set(item.color, []);
                }
                existingIceCreamsByColor.get(item.color).push(item);
            }
        });
        // Verarbeiten von jedem IceCream aus den Daten
        Endabgabe_Eisdealer.data.IceCream.forEach(iceCream => {
            let iceCreamCheckbox = document.querySelector(`input[name="${iceCream.name}"]`);
            let iceCreamNumber = iceCreamCheckbox?.nextElementSibling;
            let quantity = iceCreamCheckbox?.checked ? parseInt(iceCreamNumber?.value) || 0 : 0;
            let existingIceCreams = existingIceCreamsByColor.get(iceCream.color) || [];
            // Berechnen der Differenz zur gewünschten Menge
            let newCount = Math.max(0, quantity - existingIceCreams.length);
            // Hinzufügen neuer Eiskugeln
            for (let i = 0; i < newCount; i++) {
                let randomX = Math.random() * 100 + 800; // Zufällige X-Position zwischen 800 und 900
                let randomY = Math.random() * 20 + 100; // Zufällige Y-Position zwischen 100 und 120
                existingIceCreams.push(new Endabgabe_Eisdealer.IceCream(randomX, randomY, iceCream.color));
            }
            // Beschränken auf die gewünschte Menge
            updatedItems.push(...existingIceCreams.slice(0, quantity));
        });
        // Aktualisieren des Sortiments mit den neuen Eiskugeln
        sortiment = [...sortiment.filter(item => !(item instanceof Endabgabe_Eisdealer.IceCream)), ...updatedItems];
    }
    Endabgabe_Eisdealer.updateIceCreamDrawing = updateIceCreamDrawing;
    function updateSauceDrawing() {
        let updatedItems = []; // Array für die aktualisierten Elemente
        // Map, um existierende Eiskugeln nach Farbe zu gruppieren
        let existingSaucesByColor = new Map();
        // Füllen der Map mit existierenden Eiskugeln
        sortiment.forEach(item => {
            if (item instanceof Endabgabe_Eisdealer.Sauce) {
                if (!existingSaucesByColor.has(item.color)) {
                    existingSaucesByColor.set(item.color, []);
                }
                existingSaucesByColor.get(item.color).push(item);
            }
        });
        // Verarbeiten von jedem IceCream aus den Daten
        Endabgabe_Eisdealer.data.Sauce.forEach(sauce => {
            let sauceCheckbox = document.querySelector(`input[name="${sauce.name}"]`);
            let sauceNumber = sauceCheckbox?.nextElementSibling;
            let quantity = sauceCheckbox?.checked ? parseInt(sauceNumber?.value) || 0 : 0;
            let existingSauces = existingSaucesByColor.get(sauce.color) || [];
            // Berechnen der Differenz zur gewünschten Menge
            let newCount = Math.max(0, quantity - existingSauces.length);
            // Hinzufügen neuer Eiskugeln
            for (let i = 0; i < newCount; i++) {
                let randomX = Math.random() * 100 + 800; // Zufällige X-Position zwischen 800 und 900
                let randomY = Math.random() * 20 + 100; // Zufällige Y-Position zwischen 100 und 120
                existingSauces.push(new Endabgabe_Eisdealer.Sauce(randomX, randomY, sauce.color));
            }
            // Beschränken auf die gewünschte Menge
            updatedItems.push(...existingSauces.slice(0, quantity));
        });
        // Aktualisieren des Sortiments mit den neuen Eiskugeln
        sortiment = [...sortiment.filter(item => !(item instanceof Endabgabe_Eisdealer.Sauce)), ...updatedItems];
    }
    Endabgabe_Eisdealer.updateSauceDrawing = updateSauceDrawing;
    function updateSprinkleDrawing() {
        let updatedItems = []; // Array für die aktualisierten Elemente
        // Map, um existierende Eiskugeln nach Farbe zu gruppieren
        let existingSprinklesByColor = new Map();
        // Füllen der Map mit existierenden Eiskugeln
        sortiment.forEach(item => {
            if (item instanceof Endabgabe_Eisdealer.Sprinkles) {
                if (!existingSprinklesByColor.has(item.color)) {
                    existingSprinklesByColor.set(item.color, []);
                }
                existingSprinklesByColor.get(item.color).push(item);
            }
        });
        // Verarbeiten von jedem IceCream aus den Daten
        Endabgabe_Eisdealer.data.Sprinkles.forEach(sprinkles => {
            let sprinklesCheckbox = document.querySelector(`input[name="${sprinkles.name}"]`);
            let sprinklesNumber = sprinklesCheckbox?.nextElementSibling;
            let quantity = sprinklesCheckbox?.checked ? parseInt(sprinklesNumber?.value) || 0 : 0;
            let existingSprinkles = existingSprinklesByColor.get(sprinkles.color) || [];
            // Berechnen der Differenz zur gewünschten Menge
            let newCount = Math.max(0, quantity - existingSprinkles.length);
            // Hinzufügen neuer Eiskugeln
            for (let i = 0; i < newCount; i++) {
                let randomX = Math.random() * 100 + 800; // Zufällige X-Position zwischen 800 und 900
                let randomY = Math.random() * 20 + 100; // Zufällige Y-Position zwischen 100 und 120
                existingSprinkles.push(new Endabgabe_Eisdealer.Sprinkles(randomX, randomY, sprinkles.color));
            }
            // Beschränken auf die gewünschte Menge
            updatedItems.push(...existingSprinkles.slice(0, quantity));
        });
        // Aktualisieren des Sortiments mit den neuen Eiskugeln
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