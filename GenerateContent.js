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
    // Add event listener call for displaySortiment
    function createIceCreamList(_iceCream) {
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
            displaySortiment();
        });
        IceCreamNumber.addEventListener('input', () => {
            updateIceCream();
            displaySortiment();
        });
    }
    Endabgabe_Eisdealer.createIceCreamList = createIceCreamList;
    // The other data creation functions should follow the same pattern
    function createSauceList(_sauce) {
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
        text.innerHTML = _sauce.name;
        SauceCheckbox.name = _sauce.name;
        SauceLabel.appendChild(SauceCheckbox);
        SauceLabel.appendChild(SauceNumber);
        document.getElementById("FieldsetSauce")?.appendChild(SauceLabel);
        SauceCheckbox.addEventListener('change', () => {
            updateSauce();
            displaySortiment();
        });
        SauceNumber.addEventListener('input', () => {
            updateSauce();
            displaySortiment();
        });
    }
    Endabgabe_Eisdealer.createSauceList = createSauceList;
    function createSprinklesList(_sprinkle) {
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
        text.innerHTML = _sprinkle.name;
        SprinkleCheckbox.name = _sprinkle.name;
        SprinkleLabel.appendChild(SprinkleCheckbox);
        SprinkleLabel.appendChild(SprinkleNumber);
        document.getElementById("FieldsetSprinkle")?.appendChild(SprinkleLabel);
        SprinkleCheckbox.addEventListener('change', () => {
            updateSprinkle();
            displaySortiment();
        });
        SprinkleNumber.addEventListener('input', () => {
            updateSprinkle();
            displaySortiment();
        });
    }
    Endabgabe_Eisdealer.createSprinklesList = createSprinklesList;
    function updateIceCream() {
        let updatedItems = []; // Array für die aktualisierten Elemente
        // Map, um existierende Eiskugeln nach Farbe zu gruppieren
        let existingIceCreamsByColor = new Map();
        // Füllen der Map mit existierenden Eiskugeln
        Endabgabe_Eisdealer.sortiment.forEach(item => {
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
        Endabgabe_Eisdealer.sortiment = [...Endabgabe_Eisdealer.sortiment.filter(item => !(item instanceof Endabgabe_Eisdealer.IceCream)), ...updatedItems];
    }
    Endabgabe_Eisdealer.updateIceCream = updateIceCream;
    function updateSauce() {
        let updatedItems = []; // Array für die aktualisierten Elemente
        // Map, um existierende Eiskugeln nach Farbe zu gruppieren
        let existingSaucesByColor = new Map();
        // Füllen der Map mit existierenden Eiskugeln
        Endabgabe_Eisdealer.sortiment.forEach(item => {
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
        Endabgabe_Eisdealer.sortiment = [...Endabgabe_Eisdealer.sortiment.filter(item => !(item instanceof Endabgabe_Eisdealer.Sauce)), ...updatedItems];
    }
    Endabgabe_Eisdealer.updateSauce = updateSauce;
    function updateSprinkle() {
        let updatedItems = []; // Array für die aktualisierten Elemente
        // Map, um existierende Eiskugeln nach Farbe zu gruppieren
        let existingSprinklesByColor = new Map();
        // Füllen der Map mit existierenden Eiskugeln
        Endabgabe_Eisdealer.sortiment.forEach(item => {
            if (item instanceof Endabgabe_Eisdealer.Sprinkles) {
                if (!existingSprinklesByColor.has(item.color)) {
                    existingSprinklesByColor.set(item.color, []);
                }
                existingSprinklesByColor.get(item.color).push(item);
            }
        });
        // Verarbeiten von jedem IceCream aus den Daten
        Endabgabe_Eisdealer.data.Sprinkles.forEach(sprinkles => {
            let sprinkleCheckbox = document.querySelector(`input[name="${sprinkles.name}"]`);
            let sprinkleNumber = sprinkleCheckbox?.nextElementSibling;
            let quantity = sprinkleCheckbox?.checked ? parseInt(sprinkleNumber?.value) || 0 : 0;
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
        Endabgabe_Eisdealer.sortiment = [...Endabgabe_Eisdealer.sortiment.filter(item => !(item instanceof Endabgabe_Eisdealer.Sprinkles)), ...updatedItems];
    }
    Endabgabe_Eisdealer.updateSprinkle = updateSprinkle;
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