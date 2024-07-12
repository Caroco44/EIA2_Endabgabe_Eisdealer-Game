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
        customers.push(new Endabgabe_Eisdealer.Customer(200, 400, "green"));
        Endabgabe_Eisdealer.sortiment.push(new Endabgabe_Eisdealer.Cone(900, 270, "brown"));
        Endabgabe_Eisdealer.tables.push(new Endabgabe_Eisdealer.Table(400, 80));
        Endabgabe_Eisdealer.tables.push(new Endabgabe_Eisdealer.Table(600, 200));
        Endabgabe_Eisdealer.tables.push(new Endabgabe_Eisdealer.Table(400, 320));
        Endabgabe_Eisdealer.tables.push(new Endabgabe_Eisdealer.Table(600, 440));
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
    // Table is Clicked
    function tableClicked(_event) {
        let clickX = _event.clientX;
        let clickY = _event.clientY;
        for (let table of Endabgabe_Eisdealer.tables) {
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
        for (let table of Endabgabe_Eisdealer.tables) {
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
    let displayedCustomers = new Set(); // To track customers with displayed orders
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getRandomOrder(data) {
        const iceCream = data.IceCream[getRandomInt(0, data.IceCream.length - 1)];
        const sauce = data.Sauce[getRandomInt(0, data.Sauce.length - 1)];
        const sprinkle = data.Sprinkles[getRandomInt(0, data.Sprinkles.length - 1)];
        const iceCreamQty = getRandomInt(1, 3); // Random quantity between 1 and 3
        const sauceQty = getRandomInt(1, 2); // Random quantity between 1 and 2
        const sprinkleQty = getRandomInt(1, 2); // Random quantity between 1 and 2
        return {
            iceCream: { item: iceCream, quantity: iceCreamQty },
            sauce: { item: sauce, quantity: sauceQty },
            sprinkle: { item: sprinkle, quantity: sprinkleQty }
        };
    }
    function displayCustomerOrder() {
        // Filter customers who are currently ordering
        let orderingCustomers = customers.filter(customer => customer.state == "ordering");
        // Iterate over each ordering customer
        orderingCustomers.forEach(customer => {
            // Check if the order display has already been created for this customer
            if (!displayedCustomers.has(customer.id)) { // Assuming customers have a unique 'id'
                // Create order display only if the customer has a valid position
                if (customer.positionX !== undefined && customer.positionY !== undefined) {
                    // Get random order details
                    const orderDetails = getRandomOrder(Endabgabe_Eisdealer.data);
                    // Create a new div element with the order details
                    let order = document.createElement("div");
                    order.classList.add("order-item");
                    // Create HTML content for the order
                    order.innerHTML = `
            <p>${orderDetails.iceCream.item.name} (x${orderDetails.iceCream.quantity})</p>
            <p>${orderDetails.sauce.item.name} (x${orderDetails.sauce.quantity})</p>
            <p>${orderDetails.sprinkle.item.name} (x${orderDetails.sprinkle.quantity})</p>
          `;
                    // Calculate position based on customer's coordinates
                    let customerOrderDiv = document.createElement("div");
                    customerOrderDiv.classList.add("customerOrder");
                    customerOrderDiv.style.position = "absolute";
                    customerOrderDiv.style.left = `${customer.positionX - 170}px`;
                    customerOrderDiv.style.top = `${customer.positionY}px`;
                    customerOrderDiv.setAttribute("data-customer-id", customer.id.toString()); // Set customer ID
                    // Append the new order div to the customerOrderDiv
                    customerOrderDiv.appendChild(order);
                    // Add click event listener to the customerOrderDiv
                    customerOrderDiv.addEventListener("click", (event) => {
                        checkOrder(event); // Pass event to checkOrder
                    });
                    // Append the customerOrderDiv to the document body or another appropriate parent element
                    document.body.appendChild(customerOrderDiv);
                    // Add the customer ID to the set of displayed customers
                    displayedCustomers.add(customer.id);
                }
            }
        });
    }
    Endabgabe_Eisdealer.displayCustomerOrder = displayCustomerOrder;
    function checkOrder(event) {
        // Get the customer ID from the clicked div
        let customerOrderDiv = event.currentTarget;
        let customerIdStr = customerOrderDiv.getAttribute("data-customer-id");
        // Ensure customerIdStr is not null before parsing
        if (customerIdStr !== null) {
            let customerId = parseInt(customerIdStr);
            // Find the customer by ID
            let customer = customers.find(c => c.id === customerId);
            if (customer) {
                // Get the customer's displayed order details
                let orderDivs = customerOrderDiv.querySelectorAll('.order-item p');
                let orderDetails = {
                    iceCream: { name: orderDivs[0].textContent.split(' (x')[0], quantity: parseInt(orderDivs[0].textContent.split(' (x')[1].split(')')[0]) },
                    sauce: { name: orderDivs[1].textContent.split(' (x')[0], quantity: parseInt(orderDivs[1].textContent.split(' (x')[1].split(')')[0]) },
                    sprinkle: { name: orderDivs[2].textContent.split(' (x')[0], quantity: parseInt(orderDivs[2].textContent.split(' (x')[1].split(')')[0]) }
                };
                // Compare the customer's order with the current sortiment
                const isOrderMatching = (category, items) => {
                    for (let item of items) {
                        let itemCheckbox = document.querySelector(`input[name="${item.name}"]`);
                        let itemNumber = itemCheckbox?.nextElementSibling;
                        if (itemCheckbox?.checked) {
                            let quantity = parseInt(itemNumber?.value) || 0;
                            if (item.name == orderDetails[category].name && quantity == orderDetails[category].quantity) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                let iceCreamMatch = isOrderMatching('iceCream', Endabgabe_Eisdealer.data.IceCream);
                let sauceMatch = isOrderMatching('sauce', Endabgabe_Eisdealer.data.Sauce);
                let sprinkleMatch = isOrderMatching('sprinkle', Endabgabe_Eisdealer.data.Sprinkles);
                // Change the customer's state to "eating" only if all parts of the order match
                if (iceCreamMatch && sauceMatch && sprinkleMatch) {
                    customer.state = "eating";
                    customer.mood = "happy";
                    // Remove the order div from the DOM and update table state
                    removeOrderDiv(customerOrderDiv, customer);
                }
                else {
                    console.log("Customer's order does not match the current sortiment.");
                    customer.mood = "sad";
                }
            }
        }
        else {
            console.error("Customer ID not found on the clicked element.");
        }
    }
    Endabgabe_Eisdealer.checkOrder = checkOrder;
    function removeOrderDiv(orderDiv, customer) {
        orderDiv.remove(); // Remove the order div from the DOM
        // Update table state to "free"
        let table = Endabgabe_Eisdealer.tables.find(t => t.positionX === customer.targetPositionX && t.positionY === customer.targetPositionY);
        if (table) {
            table.state = "free";
        }
    }
    function displaySortiment() {
        console.clear(); // Clear the console for a fresh display
        // Function to log checked items and their quantities
        const logCheckedItems = (category, items) => {
            items.forEach(item => {
                let itemCheckbox = document.querySelector(`input[name="${item.name}"]`);
                let itemNumber = itemCheckbox?.nextElementSibling;
                if (itemCheckbox?.checked) {
                    let quantity = parseInt(itemNumber?.value) || 0;
                    console.log(`${category}: ${item.name}, Quantity: ${quantity}`);
                }
            });
        };
        // Log Ice Cream
        logCheckedItems("Ice Cream", Endabgabe_Eisdealer.data.IceCream);
        // Log Sauce
        logCheckedItems("Sauce", Endabgabe_Eisdealer.data.Sauce);
        // Log Sprinkles
        logCheckedItems("Sprinkles", Endabgabe_Eisdealer.data.Sprinkles);
    }
    Endabgabe_Eisdealer.displaySortiment = displaySortiment;
    let displayedPayment = false; // Flag to track if payment info has been displayed
    function displayCustomerPayment() {
        // Find the customer who is currently paying
        let customerPaying = customers.find(customer => customer.state === "paying");
        if (customerPaying && !displayedPayment) {
            // Calculate the total price for the customer's order
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
            // Create a div to display the total price
            let paymentDiv = document.createElement("div");
            paymentDiv.classList.add("payment-info");
            paymentDiv.textContent = `Total Price: ${totalPrice.toFixed(2)} €`;
            // Calculate position based on customer's coordinates
            paymentDiv.style.position = "absolute";
            paymentDiv.style.left = `${customerPaying.positionX - 80}px`; // Adjust position as needed
            paymentDiv.style.top = `${customerPaying.positionY + 30}px`;
            // Append the payment info div to the document body
            document.body.appendChild(paymentDiv);
            // Mark payment as displayed
            displayedPayment = true;
            // Add event listener for clicks on the payment info div
            paymentDiv.addEventListener("click", () => {
                // Change customer's state to "leaving"
                customerPaying.state = "leaving";
                // Remove the payment info div from the document
                document.body.removeChild(paymentDiv);
                displayedPayment = false; // Reset displayedPayment flag
            });
        }
    }
    Endabgabe_Eisdealer.displayCustomerPayment = displayCustomerPayment;
    function removeCustomer(customer) {
        // Remove the customer from the array
        let index = customers.indexOf(customer);
        if (index !== -1) {
            customers.splice(index, 1);
            // Remove the corresponding customerOrderDiv from the DOM
            let customerOrderDivs = document.querySelectorAll(".customerOrder");
            customerOrderDivs.forEach((div) => {
                let customerIdStr = div.getAttribute("data-customer-id");
                if (customerIdStr !== null) {
                    let customerId = parseInt(customerIdStr);
                    if (customerId === customer.id) {
                        div.remove(); // Remove the div from the DOM
                    }
                }
            });
        }
    }
    Endabgabe_Eisdealer.removeCustomer = removeCustomer;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=Main.js.map