"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    function createData() {
        for (let category in Endabgabe_Eisdealer.data) {
            // console.log(category);
            let items = Endabgabe_Eisdealer.data[category];
            switch (category) {
                case "IceCream":
                    for (let iceCream of items) {
                        createIceCreamData(iceCream);
                    }
                    break;
                case "Sauce":
                    for (let sauce of items) {
                        createSauceData(sauce);
                    }
                    break;
                case "Sprinkles":
                    for (let sprinkle of items) {
                        createSprinklesData(sprinkle);
                    }
                    break;
                default:
                    break;
            }
        }
    }
    Endabgabe_Eisdealer.createData = createData;
    // Add event listener call for displaySortiment
    function createIceCreamData(iceCream) {
        // Create Elements and Save in Variable
        let IceCreamCheckbox = document.createElement("input");
        IceCreamCheckbox.setAttribute("type", "checkbox");
        let IceCreamNumber = document.createElement("input");
        IceCreamNumber.setAttribute("type", "number");
        IceCreamNumber.setAttribute("min", "0");
        IceCreamNumber.setAttribute("max", "3");
        IceCreamNumber.setAttribute("placeholder", "0");
        let IceCreamLabel = document.createElement("label");
        // Write Text
        let text = document.createElement("legend");
        IceCreamLabel.appendChild(text);
        text.innerHTML = iceCream.name;
        IceCreamCheckbox.name = iceCream.name;
        // Add Checkbox and Number to Label
        IceCreamLabel.appendChild(IceCreamCheckbox);
        IceCreamLabel.appendChild(IceCreamNumber);
        // Put label under fieldset
        document.getElementById("FieldsetIceCream")?.appendChild(IceCreamLabel);
        // Add event listener for changes in checkbox or number input
        IceCreamCheckbox.addEventListener('change', () => {
            Endabgabe_Eisdealer.updateIceCreamDrawing();
            displaySortiment();
        });
        IceCreamNumber.addEventListener('input', () => {
            Endabgabe_Eisdealer.updateIceCreamDrawing();
            displaySortiment();
        });
    }
    Endabgabe_Eisdealer.createIceCreamData = createIceCreamData;
    // The other data creation functions should follow the same pattern
    function createSauceData(sauce) {
        let SauceCheckbox = document.createElement("input");
        SauceCheckbox.setAttribute("type", "checkbox");
        let SauceNumber = document.createElement("input");
        SauceNumber.setAttribute("type", "number");
        SauceNumber.setAttribute("min", "0");
        SauceNumber.setAttribute("max", "3");
        SauceNumber.setAttribute("placeholder", "0");
        let SauceLabel = document.createElement("label");
        let text = document.createElement("legend");
        SauceLabel.appendChild(text);
        text.innerHTML = sauce.name;
        SauceCheckbox.name = sauce.name;
        SauceLabel.appendChild(SauceCheckbox);
        SauceLabel.appendChild(SauceNumber);
        document.getElementById("FieldsetSauce")?.appendChild(SauceLabel);
        SauceCheckbox.addEventListener('change', () => {
            Endabgabe_Eisdealer.updateSauceDrawing();
            displaySortiment();
        });
        SauceNumber.addEventListener('input', () => {
            Endabgabe_Eisdealer.updateSauceDrawing();
            displaySortiment();
        });
    }
    Endabgabe_Eisdealer.createSauceData = createSauceData;
    function createSprinklesData(sprinkle) {
        let SprinkleCheckbox = document.createElement("input");
        SprinkleCheckbox.setAttribute("type", "checkbox");
        let SprinkleNumber = document.createElement("input");
        SprinkleNumber.setAttribute("type", "number");
        SprinkleNumber.setAttribute("min", "0");
        SprinkleNumber.setAttribute("max", "3");
        SprinkleNumber.setAttribute("placeholder", "0");
        let SprinkleLabel = document.createElement("label");
        let text = document.createElement("legend");
        SprinkleLabel.appendChild(text);
        text.innerHTML = sprinkle.name;
        SprinkleCheckbox.name = sprinkle.name;
        SprinkleLabel.appendChild(SprinkleCheckbox);
        SprinkleLabel.appendChild(SprinkleNumber);
        document.getElementById("FieldsetSprinkle")?.appendChild(SprinkleLabel);
        SprinkleCheckbox.addEventListener('change', () => {
            Endabgabe_Eisdealer.updateSprinkleDrawing();
            displaySortiment();
        });
        SprinkleNumber.addEventListener('input', () => {
            Endabgabe_Eisdealer.updateSprinkleDrawing();
            displaySortiment();
        });
    }
    Endabgabe_Eisdealer.createSprinklesData = createSprinklesData;
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
        // Log IceCream
        logCheckedItems("Ice Cream", Endabgabe_Eisdealer.data.IceCream);
        // Log Sauce
        logCheckedItems("Sauce", Endabgabe_Eisdealer.data.Sauce);
        // Log Sprinkles
        logCheckedItems("Sprinkles", Endabgabe_Eisdealer.data.Sprinkles);
    }
    Endabgabe_Eisdealer.displaySortiment = displaySortiment;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=GenerateContent.js.map