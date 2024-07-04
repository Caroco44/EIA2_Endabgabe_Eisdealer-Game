"use strict";
var Endabgabe_Eisdealer;
(function (Endabgabe_Eisdealer) {
    Endabgabe_Eisdealer.data = {
        IceCream: [
            { name: "Strawberry", price: 1 },
            { name: "Chocolate", price: 1 },
            { name: "Yoghurt", price: 1 },
            { name: "Mochi", price: 1.5 },
            { name: "Kiwi", price: 1.5 },
        ],
        Sauce: [
            { name: "Strawberry", price: 0.60 },
            { name: "Chocolate", price: 0.60 },
            { name: "Vanilla", price: 0.50 },
        ],
        Sprinkles: [
            { name: "Chocolate", price: 0.50 },
            { name: "Cookie", price: 0.60 },
            { name: "Blueberry", price: 0.70 },
        ]
    };
    function createData() {
        for (let category in Endabgabe_Eisdealer.data) {
            // console.log(category);
            let items = Endabgabe_Eisdealer.data[category];
            switch (category) {
                case "IceCream":
                    for (let iceCream of items) {
                        // console.log(`IceCream: ${iceCream.name}, Price: ${iceCream.price}`);
                        createIceCreamData(iceCream);
                    }
                    break;
                case "Sauce":
                    for (let sauce of items) {
                        // console.log(`Sauce: ${sauce.name}, Price: ${sauce.price}`);
                        createSauceData(sauce);
                    }
                    break;
                case "Sprinkles":
                    for (let sprinkle of items) {
                        // console.log(`Sprinkles: ${sprinkle.name}, Price: ${sprinkle.price}`);
                        createSprinklesData(sprinkle);
                    }
                    break;
                default:
                    break;
            }
        }
    }
    Endabgabe_Eisdealer.createData = createData;
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
    }
    function createSauceData(sauce) {
        // Create Elements and Save in Variable
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
        text.innerHTML = sauce.name;
        SauceCheckbox.name = sauce.name;
        // Add Checkbox and Number to Label
        SauceLabel.appendChild(SauceCheckbox);
        SauceLabel.appendChild(SauceNumber);
        // Put label under fieldset
        document.getElementById("FieldsetSauce")?.appendChild(SauceLabel);
    }
    function createSprinklesData(sprinkle) {
        // Create Elements and Save in Variable
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
        text.innerHTML = sprinkle.name;
        SprinkleCheckbox.name = sprinkle.name;
        // Add Checkbox and Number to Label
        SprinkleLabel.appendChild(SprinkleCheckbox);
        SprinkleLabel.appendChild(SprinkleNumber);
        // Put label under fieldset
        document.getElementById("FieldsetSprinkle")?.appendChild(SprinkleLabel);
    }
})(Endabgabe_Eisdealer || (Endabgabe_Eisdealer = {}));
//# sourceMappingURL=SortimentData.js.map