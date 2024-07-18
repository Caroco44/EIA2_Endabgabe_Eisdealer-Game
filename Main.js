"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    window.addEventListener("load", handleLoad);
    let imgData;
    // Arrays
    Endabgabe_Eisdealer.sortiment = [];
    let customers = [];
    Endabgabe_Eisdealer.tables = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Endabgabe_Eisdealer.crc2 = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawBackground();
        imgData = Endabgabe_Eisdealer.crc2.getImageData(0, 0, Endabgabe_Eisdealer.crc2.canvas.width, Endabgabe_Eisdealer.crc2.canvas.height);
        customers.push(new Endabgabe_Eisdealer.Customer(200, 400, "rgb(111,173,11)"));
        Endabgabe_Eisdealer.sortiment.push(new Endabgabe_Eisdealer.Cone(900, 270, "rgb(190,109,25)"));
        Endabgabe_Eisdealer.tables.push(new Endabgabe_Eisdealer.Table(410, 100));
        Endabgabe_Eisdealer.tables.push(new Endabgabe_Eisdealer.Table(610, 220));
        Endabgabe_Eisdealer.tables.push(new Endabgabe_Eisdealer.Table(410, 340));
        Endabgabe_Eisdealer.tables.push(new Endabgabe_Eisdealer.Table(610, 460));
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
    // DRAW BACKGROUND
    function drawBackground() {
        // Draw the background
        Endabgabe_Eisdealer.crc2.fillStyle = "rgb(210,247,254)";
        Endabgabe_Eisdealer.crc2.fillRect(0, 0, Endabgabe_Eisdealer.crc2.canvas.width, Endabgabe_Eisdealer.crc2.canvas.height);
        // Draw cirlce
        let circleX = Endabgabe_Eisdealer.crc2.canvas.width / 2;
        let circleY = Endabgabe_Eisdealer.crc2.canvas.height / 2;
        let circleRadius = Math.min(Endabgabe_Eisdealer.crc2.canvas.width, Endabgabe_Eisdealer.crc2.canvas.height) / 1.7;
        Endabgabe_Eisdealer.crc2.beginPath();
        Endabgabe_Eisdealer.crc2.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI, false);
        Endabgabe_Eisdealer.crc2.fillStyle = "rgb(255,137,137)";
        Endabgabe_Eisdealer.crc2.fill();
        // Draw rectangle
        Endabgabe_Eisdealer.crc2.fillStyle = "rgb(255,137,137)";
        Endabgabe_Eisdealer.crc2.fillRect(800, 0, Endabgabe_Eisdealer.crc2.canvas.width, Endabgabe_Eisdealer.crc2.canvas.height);
        // Draw counter
        Endabgabe_Eisdealer.crc2.fillStyle = "rgb(125,58,37)";
        Endabgabe_Eisdealer.crc2.fillRect(825, 0, 150, 300);
    }
    // CREATE NEW CUSTOMER
    function createCustomer() {
        if (customers.length < 7) {
            // Define range for random positions
            let minX = 50;
            let maxX = 300;
            let minY = 100;
            let maxY = 500;
            // Generate random positions within defined range
            let x = Math.random() * (maxX - minX) + minX;
            let y = Math.random() * (maxY - minY) + minY;
            customers.push(new Endabgabe_Eisdealer.Customer(x, y, "rgb(111,173,11)"));
        }
    }
    // TABLE IS CLICKED
    function tableClicked(_event) {
        let clickX = _event.clientX;
        let clickY = _event.clientY;
        for (let table of Endabgabe_Eisdealer.tables) {
            if (table instanceof Endabgabe_Eisdealer.Table && table.state == "free") {
                // Check if click is within bounds of table
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
    // ANIMATION
    function animation() {
        drawBackground();
        Endabgabe_Eisdealer.crc2.putImageData(imgData, 0, 0);
        for (let food of Endabgabe_Eisdealer.sortiment) {
            food.draw();
        }
        for (let customer of customers) {
            customer.move();
        }
        for (let table of Endabgabe_Eisdealer.tables) {
            table.draw();
        }
    }
    // CALCULATE PRICE
    let displayedPayment = false;
    let totalEarnings = 0;
    let globalTotalPrice = 0;
    function calculatePrice() {
        let totalPrice = 0;
        // Calculate price for IceCream
        for (let iceCream of Endabgabe_Eisdealer.data.IceCream) {
            let iceCreamCheckbox = document.querySelector(`input[name="${iceCream.name}"]`);
            let iceCreamNumber = iceCreamCheckbox?.nextElementSibling;
            if (iceCreamCheckbox?.checked) {
                let quantity = parseInt(iceCreamNumber.value) || 0;
                totalPrice += iceCream.price * quantity;
            }
        }
        // Calculate price for Sauce
        for (let sauce of Endabgabe_Eisdealer.data.Sauce) {
            let sauceCheckbox = document.querySelector(`input[name="${sauce.name}"]`);
            let sauceNumber = sauceCheckbox?.nextElementSibling;
            if (sauceCheckbox?.checked) {
                let quantity = parseInt(sauceNumber.value) || 0;
                totalPrice += sauce.price * quantity;
            }
        }
        // Calculate price for Sprinkles
        for (let sprinkle of Endabgabe_Eisdealer.data.Sprinkles) {
            let sprinkleCheckbox = document.querySelector(`input[name="${sprinkle.name}"]`);
            let sprinkleNumber = sprinkleCheckbox?.nextElementSibling;
            if (sprinkleCheckbox?.checked) {
                let quantity = parseInt(sprinkleNumber.value) || 0;
                totalPrice += sprinkle.price * quantity;
            }
        }
        // Update total price element
        let totalPriceElement = document.getElementById("totalPrice");
        if (totalPriceElement) {
            totalPriceElement.textContent = `Total Price: ${totalPrice.toFixed(2)} €`;
        }
        globalTotalPrice = totalPrice;
    }
    Endabgabe_Eisdealer.calculatePrice = calculatePrice;
    // GENERATE RANDOM CHOICE
    function getRandomChoice(_min, _max) {
        return Math.floor(Math.random() * (_max - _min + 1)) + _min;
    }
    // GENERATE RANDOM ORDER
    function getRandomOrder(_data) {
        const iceCream = Endabgabe_Eisdealer.data.IceCream[getRandomChoice(0, Endabgabe_Eisdealer.data.IceCream.length - 1)];
        const sauce = Endabgabe_Eisdealer.data.Sauce[getRandomChoice(0, Endabgabe_Eisdealer.data.Sauce.length - 1)];
        const sprinkle = Endabgabe_Eisdealer.data.Sprinkles[getRandomChoice(0, Endabgabe_Eisdealer.data.Sprinkles.length - 1)];
        // Generate random quantities between 1 and 3
        const iceCreamQty = getRandomChoice(1, 3);
        const sauceQty = getRandomChoice(1, 3);
        const sprinkleQty = getRandomChoice(1, 3);
        return {
            iceCream: { item: iceCream, quantity: iceCreamQty },
            sauce: { item: sauce, quantity: sauceQty },
            sprinkle: { item: sprinkle, quantity: sprinkleQty }
        };
    }
    let displayedCustomers = new Set();
    // DISPLAY ORDER
    function displayCustomerOrder() {
        let orderingCustomers = customers.filter(customer => customer.state == "ordering");
        orderingCustomers.forEach(customer => {
            // Check if order display has already been created for this customer
            if (!displayedCustomers.has(customer.id)) {
                // Create order display only if customer has valid position
                if (customer.positionX !== undefined && customer.positionY !== undefined) {
                    const orderDetails = getRandomOrder(Endabgabe_Eisdealer.data);
                    // Create new div element with order details
                    let order = document.createElement("div");
                    order.classList.add("order-item");
                    order.innerHTML = `
            <p>${orderDetails.iceCream.item.name} (x${orderDetails.iceCream.quantity})</p>
            <p>${orderDetails.sauce.item.name} (x${orderDetails.sauce.quantity})</p>
            <p>${orderDetails.sprinkle.item.name} (x${orderDetails.sprinkle.quantity})</p>
          `;
                    // Set customerOrderDiv position
                    let customerOrderDiv = document.createElement("div");
                    customerOrderDiv.classList.add("customerOrder");
                    customerOrderDiv.style.position = "absolute";
                    customerOrderDiv.style.left = `${customer.positionX - 190}px`;
                    customerOrderDiv.style.top = `${customer.positionY + 5}px`;
                    customerOrderDiv.setAttribute("data-customer-id", customer.id.toString());
                    customerOrderDiv.appendChild(order);
                    document.body.appendChild(customerOrderDiv);
                    // Add customer ID to set of displayed customers
                    displayedCustomers.add(customer.id);
                    // Add click event listener to customerOrderDiv
                    customerOrderDiv.addEventListener("click", (_event) => {
                        checkOrder(_event);
                    });
                }
            }
        });
    }
    Endabgabe_Eisdealer.displayCustomerOrder = displayCustomerOrder;
    // DOES ORDER MATCH ASSORTMENT
    function checkOrder(event) {
        // Get customer ID from clicked div
        let customerOrderDiv = event.currentTarget;
        let customerOrderDivId = customerOrderDiv.getAttribute("data-customer-id");
        if (customerOrderDivId !== null) {
            let customerId = parseInt(customerOrderDivId);
            // Find customer by ID
            let customer = customers.find(c => c.id === customerId);
            if (customer) {
                let orderDetails = getOrderDetails(customerOrderDiv);
                // Compare the customer's order with current assortment
                let iceCreamMatch = isOrderMatching('iceCream', orderDetails, Endabgabe_Eisdealer.data.IceCream);
                let sauceMatch = isOrderMatching('sauce', orderDetails, Endabgabe_Eisdealer.data.Sauce);
                let sprinkleMatch = isOrderMatching('sprinkle', orderDetails, Endabgabe_Eisdealer.data.Sprinkles);
                if (iceCreamMatch && sauceMatch && sprinkleMatch) {
                    customer.state = "eating";
                    customer.mood = "happy";
                    removeOrderDiv(customerOrderDiv, customer);
                }
                else {
                    console.log("Customer's order does not match the current assortment.");
                    customer.mood = "sad";
                }
            }
        }
        else {
            console.error("Customer ID not found on the clicked element.");
        }
    }
    Endabgabe_Eisdealer.checkOrder = checkOrder;
    // ACCESS ORDER DETAILS
    function getOrderDetails(_customerOrderDiv) {
        let orderDivs = _customerOrderDiv.querySelectorAll('.order-item p');
        return {
            iceCream: { name: orderDivs[0].textContent.split(' (x')[0], quantity: parseInt(orderDivs[0].textContent.split(' (x')[1].split(')')[0]) },
            sauce: { name: orderDivs[1].textContent.split(' (x')[0], quantity: parseInt(orderDivs[1].textContent.split(' (x')[1].split(')')[0]) },
            sprinkle: { name: orderDivs[2].textContent.split(' (x')[0], quantity: parseInt(orderDivs[2].textContent.split(' (x')[1].split(')')[0]) }
        };
    }
    // COMPARE ORDER DETAILS WITH ASSORTMENT
    function isOrderMatching(_category, _orderDetails, _items) {
        for (let item of _items) {
            let itemCheckbox = document.querySelector(`input[name="${item.name}"]`);
            let itemNumber = itemCheckbox?.nextElementSibling;
            if (itemCheckbox?.checked) {
                let quantity = parseInt(itemNumber?.value) || 0;
                if (item.name == _orderDetails[_category].name && quantity == _orderDetails[_category].quantity) {
                    return true;
                }
            }
        }
        return false;
    }
    // REMOVE DIV
    function removeOrderDiv(_orderDiv, _customer) {
        _orderDiv.remove();
        let table = Endabgabe_Eisdealer.tables.find(t => t.positionX == _customer.targetPositionX && t.positionY == _customer.targetPositionY);
        if (table) {
            table.state = "free";
        }
    }
    // DISPLAY PAYMENT OF CUSTOMER
    function displayCustomerPayment() {
        // Find the customer who is currently paying
        let customerPaying = customers.find(customer => customer.state == "paying");
        if (customerPaying && !displayedPayment) {
            // Create a div to display total price
            let paymentDiv = document.createElement("div");
            paymentDiv.classList.add("payment-info");
            paymentDiv.textContent = `Total Price: ${globalTotalPrice.toFixed(2)} €`;
            // Calculate position based on customer's coordinates
            paymentDiv.style.position = "absolute";
            paymentDiv.style.left = `${customerPaying.positionX - 80}px`;
            paymentDiv.style.top = `${customerPaying.positionY + 30}px`;
            document.body.appendChild(paymentDiv);
            displayedPayment = true;
            paymentDiv.addEventListener("click", () => {
                customerPaying.state = "leaving";
                // Remove payment info div from document
                document.body.removeChild(paymentDiv);
                displayedPayment = false; // Reset displayedPayment flag
                // Add globalTotalPrice to totalEarnings
                totalEarnings += globalTotalPrice;
                updateEarningsDisplay();
            });
        }
    }
    Endabgabe_Eisdealer.displayCustomerPayment = displayCustomerPayment;
    // UPDATE EARNINGS DISPLAY
    function updateEarningsDisplay() {
        // Find earnings display div
        let earningsDisplay = document.querySelector(".earnings-info");
        if (earningsDisplay) {
            earningsDisplay.textContent = `Total Earnings: ${totalEarnings.toFixed(2)} €`;
        }
        else {
            // Create earnings display div if it doesn't exist
            earningsDisplay = document.createElement("div");
            earningsDisplay.classList.add("earnings-info");
            earningsDisplay.textContent = `Total Earnings: ${totalEarnings.toFixed(2)} €`;
            document.body.appendChild(earningsDisplay);
        }
    }
    // REMOVE CUSTOMER AND HIS ORDER
    function removeElements(customer) {
        // Remove customer from array
        let index = customers.indexOf(customer);
        if (index !== -1) {
            customers.splice(index, 1);
            // Remove corresponding customerOrderDiv
            let customerOrderDivs = document.querySelectorAll(".customerOrder");
            customerOrderDivs.forEach((div) => {
                let customerOrderId = div.getAttribute("data-customer-id");
                if (customerOrderId !== null) {
                    let customerId = parseInt(customerOrderId);
                    if (customerId == customer.id) {
                        div.remove();
                    }
                }
            });
        }
    }
    Endabgabe_Eisdealer.removeElements = removeElements;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Main.js.map