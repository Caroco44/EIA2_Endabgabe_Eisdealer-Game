"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    window.addEventListener("load", handleLoad);
    let imgData;
    // Arrays
    Endabgabe_Eisdealer.sortiment = [];
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
        customers.push(new Endabgabe_Eisdealer.Customer(200, 400, "green"));
        Endabgabe_Eisdealer.sortiment.push(new Endabgabe_Eisdealer.Cone(900, 270, "brown"));
        tables.push(new Endabgabe_Eisdealer.Table(400, 80));
        tables.push(new Endabgabe_Eisdealer.Table(600, 200));
        tables.push(new Endabgabe_Eisdealer.Table(400, 320));
        tables.push(new Endabgabe_Eisdealer.Table(600, 440));
        window.addEventListener("keydown", changeMood);
        canvas.addEventListener("pointerdown", tableClicked);
        Endabgabe_Eisdealer.createData();
        document.querySelectorAll("input[type='checkbox'], input[type='number']").forEach(input => {
            input.addEventListener("change", calculatePrice);
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
    // Animation
    function animation() {
        drawBackground();
        Endabgabe_Eisdealer.crc2.putImageData(imgData, 0, 0);
        for (let food of Endabgabe_Eisdealer.sortiment) {
            food.draw();
        }
        for (let customer of customers) {
            customer.move();
        }
        for (let table of tables) {
            table.draw();
        }
    }
    function calculatePrice() {
        let totalPrice = 0;
        // Calculate the price for IceCream
        for (let iceCream of Endabgabe_Eisdealer.data.IceCream) {
            let iceCreamCheckbox = document.querySelector(`input[name="${iceCream.name}"]`);
            let iceCreamNumber = iceCreamCheckbox?.nextElementSibling;
            if (iceCreamCheckbox?.checked) {
                let quantity = parseInt(iceCreamNumber.value) || 0; // Default to 0 if empty
                totalPrice += iceCream.price * quantity;
            }
        }
        // Calculate the price for Sauce
        for (let sauce of Endabgabe_Eisdealer.data.Sauce) {
            let sauceCheckbox = document.querySelector(`input[name="${sauce.name}"]`);
            let sauceNumber = sauceCheckbox?.nextElementSibling;
            if (sauceCheckbox?.checked) {
                let quantity = parseInt(sauceNumber.value) || 0; // Default to 0 if empty
                totalPrice += sauce.price * quantity;
            }
        }
        // Calculate the price for Sprinkles
        for (let sprinkle of Endabgabe_Eisdealer.data.Sprinkles) {
            let sprinkleCheckbox = document.querySelector(`input[name="${sprinkle.name}"]`);
            let sprinkleNumber = sprinkleCheckbox?.nextElementSibling;
            if (sprinkleCheckbox?.checked) {
                let quantity = parseInt(sprinkleNumber.value) || 0; // Default to 0 if empty
                totalPrice += sprinkle.price * quantity;
            }
        }
        // Update the total price on the webpage
        let totalPriceElement = document.getElementById("totalPrice");
        if (totalPriceElement) {
            totalPriceElement.textContent = `Total Price: ${totalPrice.toFixed(2)} €`;
        }
    }
    Endabgabe_Eisdealer.calculatePrice = calculatePrice;
    function displayCustomerOrder() {
        // Filter customers who are currently ordering
        let orderingCustomers = customers.filter(customer => customer.state == "ordering");
        // Iterate over each ordering customer
        orderingCustomers.forEach(customer => {
            // Create order display only if the customer has a valid position
            if (customer.positionX !== undefined && customer.positionY !== undefined) {
                // Create a new div element with the content "hello world"
                let order = document.createElement("div");
                order.textContent = "hello world";
                order.classList.add("order-item");
                // Calculate position based on customer's coordinates
                let customerOrderDiv = document.createElement("div");
                customerOrderDiv.classList.add("customerOrder");
                customerOrderDiv.style.position = "absolute";
                customerOrderDiv.style.left = `${customer.positionX - 150}px`;
                customerOrderDiv.style.top = `${customer.positionY}px`;
                // Append the new order div to the customerOrderDiv
                customerOrderDiv.appendChild(order);
                // Append the customerOrderDiv to the document body or another appropriate parent element
                document.body.appendChild(customerOrderDiv);
            }
        });
    }
    Endabgabe_Eisdealer.displayCustomerOrder = displayCustomerOrder;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Main.js.map