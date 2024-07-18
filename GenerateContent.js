"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    // CREATE DATA
    function createData() {
        for (let category in Endabgabe_Eisdealer.data) {
            let items = Endabgabe_Eisdealer.data[category];
            switch (category) {
                case "IceCream":
                    for (let iceCream of items) {
                        createIceCreamList(iceCream);
                    }
                    break;
                case "Sauce":
                    for (let sauce of items) {
                        createSauceList(sauce);
                    }
                    break;
                case "Sprinkles":
                    for (let sprinkle of items) {
                        createSprinklesList(sprinkle);
                    }
                    break;
                default:
                    break;
            }
        }
    }
    Endabgabe_Eisdealer.createData = createData;
    // CREATE ICE CREAM LIST
    function createIceCreamList(_iceCream) {
        // Create Elements
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
        text.innerHTML = _iceCream.name;
        IceCreamCheckbox.name = _iceCream.name;
        // Add Checkbox and Number to Label
        IceCreamLabel.appendChild(IceCreamCheckbox);
        IceCreamLabel.appendChild(IceCreamNumber);
        // Put label under fieldset
        document.getElementById("FieldsetIceCream")?.appendChild(IceCreamLabel);
        // Add event listener for changes in checkbox or number input
        IceCreamCheckbox.addEventListener('change', () => {
            updateIceCream();
        });
        IceCreamNumber.addEventListener('input', () => {
            updateIceCream();
        });
    }
    Endabgabe_Eisdealer.createIceCreamList = createIceCreamList;
    // CREATE SAUCE LIST
    function createSauceList(_sauce) {
        // Create Elements
        let SauceCheckbox = document.createElement("input");
        SauceCheckbox.setAttribute("type", "checkbox");
        let SauceNumber = document.createElement("input");
        SauceNumber.setAttribute("type", "number");
        SauceNumber.setAttribute("min", "0");
        SauceNumber.setAttribute("max", "3");
        SauceNumber.setAttribute("placeholder", "0");
        let SauceLabel = document.createElement("label");
        // Write Text
        let text = document.createElement("legend");
        SauceLabel.appendChild(text);
        text.innerHTML = _sauce.name;
        SauceCheckbox.name = _sauce.name;
        // Add Checkbox and Number to Label
        SauceLabel.appendChild(SauceCheckbox);
        SauceLabel.appendChild(SauceNumber);
        // Put label under fieldset
        document.getElementById("FieldsetSauce")?.appendChild(SauceLabel);
        // Add event listener for changes in checkbox or number input
        SauceCheckbox.addEventListener('change', () => {
            updateSauce();
        });
        SauceNumber.addEventListener('input', () => {
            updateSauce();
        });
    }
    Endabgabe_Eisdealer.createSauceList = createSauceList;
    // CREATE SPRINKLES LIST
    function createSprinklesList(_sprinkle) {
        // Create Elements
        let SprinkleCheckbox = document.createElement("input");
        SprinkleCheckbox.setAttribute("type", "checkbox");
        let SprinkleNumber = document.createElement("input");
        SprinkleNumber.setAttribute("type", "number");
        SprinkleNumber.setAttribute("min", "0");
        SprinkleNumber.setAttribute("max", "3");
        SprinkleNumber.setAttribute("placeholder", "0");
        let SprinkleLabel = document.createElement("label");
        // Write Text
        let text = document.createElement("legend");
        SprinkleLabel.appendChild(text);
        text.innerHTML = _sprinkle.name;
        SprinkleCheckbox.name = _sprinkle.name;
        // Add Checkbox and Number to Label
        SprinkleLabel.appendChild(SprinkleCheckbox);
        SprinkleLabel.appendChild(SprinkleNumber);
        // Put label under fieldset
        document.getElementById("FieldsetSprinkle")?.appendChild(SprinkleLabel);
        // Add event listener for changes in checkbox or number input
        SprinkleCheckbox.addEventListener('change', () => {
            updateSprinkle();
        });
        SprinkleNumber.addEventListener('input', () => {
            updateSprinkle();
        });
    }
    Endabgabe_Eisdealer.createSprinklesList = createSprinklesList;
    // UPDATE ICE CREAM
    function updateIceCream() {
        let updatedItems = [];
        // Map to group by color
        let existingIceCreamsByColor = new Map();
        // Fill Map with existing Items
        Endabgabe_Eisdealer.sortiment.forEach(item => {
            if (item instanceof Endabgabe_Eisdealer.IceCream) {
                if (!existingIceCreamsByColor.has(item.color)) {
                    existingIceCreamsByColor.set(item.color, []);
                }
                existingIceCreamsByColor.get(item.color).push(item);
            }
        });
        // Process user input for each Ice Cream type
        Endabgabe_Eisdealer.data.IceCream.forEach(iceCream => {
            let iceCreamCheckbox = document.querySelector(`input[name="${iceCream.name}"]`);
            let iceCreamNumber = iceCreamCheckbox?.nextElementSibling;
            let quantity = iceCreamCheckbox?.checked ? parseInt(iceCreamNumber?.value) || 0 : 0;
            let existingIceCreams = existingIceCreamsByColor.get(iceCream.color) || [];
            // Calculate difference between desired and existing quantity
            let newCount = Math.max(0, quantity - existingIceCreams.length);
            // Add new Ice Cream
            for (let i = 0; i < newCount; i++) {
                let randomX = Math.random() * 90 + 850;
                let randomY = Math.random() * 20 + 110;
                existingIceCreams.push(new Endabgabe_Eisdealer.IceCream(randomX, randomY, iceCream.color));
            }
            // Limit to desired quantity
            updatedItems.push(...existingIceCreams.slice(0, quantity));
        });
        // Update sortiment array
        Endabgabe_Eisdealer.sortiment = [...Endabgabe_Eisdealer.sortiment.filter(item => !(item instanceof Endabgabe_Eisdealer.IceCream)), ...updatedItems];
    }
    Endabgabe_Eisdealer.updateIceCream = updateIceCream;
    // UPDATE SAUCE
    function updateSauce() {
        let updatedItems = [];
        // Map to group by color
        let existingSaucesByColor = new Map();
        // Fill Map with existing Items
        Endabgabe_Eisdealer.sortiment.forEach(item => {
            if (item instanceof Endabgabe_Eisdealer.Sauce) {
                if (!existingSaucesByColor.has(item.color)) {
                    existingSaucesByColor.set(item.color, []);
                }
                existingSaucesByColor.get(item.color).push(item);
            }
        });
        // Process user input for each Sauce type
        Endabgabe_Eisdealer.data.Sauce.forEach(sauce => {
            let sauceCheckbox = document.querySelector(`input[name="${sauce.name}"]`);
            let sauceNumber = sauceCheckbox?.nextElementSibling;
            let quantity = sauceCheckbox?.checked ? parseInt(sauceNumber?.value) || 0 : 0;
            let existingSauces = existingSaucesByColor.get(sauce.color) || [];
            // Calculate difference between desired and existing quantity
            let newCount = Math.max(0, quantity - existingSauces.length);
            // Add new Sauce
            for (let i = 0; i < newCount; i++) {
                let randomX = Math.random() * 90 + 850;
                let randomY = Math.random() * 20 + 110;
                existingSauces.push(new Endabgabe_Eisdealer.Sauce(randomX, randomY, sauce.color));
            }
            // Limit to desired quantity
            updatedItems.push(...existingSauces.slice(0, quantity));
        });
        // Update sortiment array
        Endabgabe_Eisdealer.sortiment = [...Endabgabe_Eisdealer.sortiment.filter(item => !(item instanceof Endabgabe_Eisdealer.Sauce)), ...updatedItems];
    }
    Endabgabe_Eisdealer.updateSauce = updateSauce;
    // UPDATE SPRINKLES
    function updateSprinkle() {
        let updatedItems = [];
        // Map to group by color
        let existingSprinklesByColor = new Map();
        // Fill Map with existing Items
        Endabgabe_Eisdealer.sortiment.forEach(item => {
            if (item instanceof Endabgabe_Eisdealer.Sprinkles) {
                if (!existingSprinklesByColor.has(item.color)) {
                    existingSprinklesByColor.set(item.color, []);
                }
                existingSprinklesByColor.get(item.color).push(item);
            }
        });
        // Process user input for each Sprinkle type
        Endabgabe_Eisdealer.data.Sprinkles.forEach(sprinkles => {
            let sprinkleCheckbox = document.querySelector(`input[name="${sprinkles.name}"]`);
            let sprinkleNumber = sprinkleCheckbox?.nextElementSibling;
            let quantity = sprinkleCheckbox?.checked ? parseInt(sprinkleNumber?.value) || 0 : 0;
            let existingSprinkles = existingSprinklesByColor.get(sprinkles.color) || [];
            // Calculate difference between desired and existing quantity
            let newCount = Math.max(0, quantity - existingSprinkles.length);
            // Add new Sprinkles
            for (let i = 0; i < newCount; i++) {
                let randomX = Math.random() * 90 + 850;
                let randomY = Math.random() * 20 + 110;
                existingSprinkles.push(new Endabgabe_Eisdealer.Sprinkles(randomX, randomY, sprinkles.color));
            }
            // Limit to desired quantity
            updatedItems.push(...existingSprinkles.slice(0, quantity));
        });
        // Update sortiment array
        Endabgabe_Eisdealer.sortiment = [...Endabgabe_Eisdealer.sortiment.filter(item => !(item instanceof Endabgabe_Eisdealer.Sprinkles)), ...updatedItems];
    }
    Endabgabe_Eisdealer.updateSprinkle = updateSprinkle;
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=GenerateContent.js.map