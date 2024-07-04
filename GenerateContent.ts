namespace Endabgabe_Eisdealer {

    export function createData() {
        for (let category in data) {
            // console.log(category);
            let items: Item[] = data[category];

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

    export function createIceCreamData(iceCream: Item) {
        // Create Elements and Save in Variable
        let IceCreamCheckbox = document.createElement("input");
        IceCreamCheckbox.setAttribute("type", "checkbox")

        let IceCreamNumber = document.createElement("input");
        IceCreamNumber.setAttribute("type", "number");
        IceCreamNumber.setAttribute("min", "0");
        IceCreamNumber.setAttribute("max", "3");
        IceCreamNumber.setAttribute("placeholder", "0");

        let IceCreamLabel = document.createElement("label");

        // Write Text
        let text = document.createElement("legend");
        IceCreamLabel.appendChild(text)
        text.innerHTML = iceCream.name;
        IceCreamCheckbox.name = iceCream.name

        // Add Checkbox and Number to Label
        IceCreamLabel.appendChild(IceCreamCheckbox)
        IceCreamLabel.appendChild(IceCreamNumber)

        // Put label under fieldset
        document.getElementById("FieldsetIceCream")?.appendChild(IceCreamLabel)

        // Add event listener for changes in checkbox or number input
        IceCreamCheckbox.addEventListener('change', updateIceCreamDrawing);
        IceCreamNumber.addEventListener('input', updateIceCreamDrawing);
    }



    export function createSauceData(sauce: Item) {
        // Create Elements and Save in Variable
        let SauceCheckbox = document.createElement("input");
        SauceCheckbox.setAttribute("type", "checkbox")

        let SauceNumber = document.createElement("input");
        SauceNumber.setAttribute("type", "number");
        SauceNumber.setAttribute("min", "0");
        SauceNumber.setAttribute("max", "3");
        SauceNumber.setAttribute("placeholder", "0");

        let SauceLabel = document.createElement("label");

        // Write Text
        let text = document.createElement("legend");
        SauceLabel.appendChild(text)
        text.innerHTML = sauce.name;
        SauceCheckbox.name = sauce.name

        // Add Checkbox and Number to Label
        SauceLabel.appendChild(SauceCheckbox)
        SauceLabel.appendChild(SauceNumber)

        // Put label under fieldset
        document.getElementById("FieldsetSauce")?.appendChild(SauceLabel)

        // Add event listener for changes in checkbox or number input
        SauceCheckbox.addEventListener('change', updateSauceDrawing);
        SauceNumber.addEventListener('input', updateSauceDrawing);
    }



    export function createSprinklesData(sprinkle: Item) {
        // Create Elements and Save in Variable
        let SprinkleCheckbox = document.createElement("input");
        SprinkleCheckbox.setAttribute("type", "checkbox")

        let SprinkleNumber = document.createElement("input");
        SprinkleNumber.setAttribute("type", "number");
        SprinkleNumber.setAttribute("min", "0");
        SprinkleNumber.setAttribute("max", "3");
        SprinkleNumber.setAttribute("placeholder", "0");

        let SprinkleLabel = document.createElement("label");

        // Write Text
        let text = document.createElement("legend");
        SprinkleLabel.appendChild(text)
        text.innerHTML = sprinkle.name;
        SprinkleCheckbox.name = sprinkle.name

        // Add Checkbox and Number to Label
        SprinkleLabel.appendChild(SprinkleCheckbox)
        SprinkleLabel.appendChild(SprinkleNumber)

        // Put label under fieldset
        document.getElementById("FieldsetSprinkle")?.appendChild(SprinkleLabel)

        // Add event listener for changes in checkbox or number input
        SprinkleCheckbox.addEventListener('change', updateSprinkleDrawing);
        SprinkleNumber.addEventListener('input', updateSprinkleDrawing);
    }



    export function calculatePrice() {
        let totalPrice: number = 0;

        // Calculate the price for IceCream
        for (let iceCream of data.IceCream) {
            let iceCreamCheckbox = document.querySelector<HTMLInputElement>(`input[name="${iceCream.name}"]`);
            let iceCreamNumber = iceCreamCheckbox?.nextElementSibling as HTMLInputElement;

            if (iceCreamCheckbox?.checked) {
                let quantity = parseInt(iceCreamNumber.value) || 0; // Default to 0 if empty
                totalPrice += iceCream.price * quantity;
            }
        }

        // Calculate the price for Sauce
        for (let sauce of data.Sauce) {
            let sauceCheckbox = document.querySelector<HTMLInputElement>(`input[name="${sauce.name}"]`);
            let sauceNumber = sauceCheckbox?.nextElementSibling as HTMLInputElement;

            if (sauceCheckbox?.checked) {
                let quantity = parseInt(sauceNumber.value) || 0; // Default to 0 if empty
                totalPrice += sauce.price * quantity;
            }
        }

        // Calculate the price for Sprinkles
        for (let sprinkle of data.Sprinkles) {
            let sprinkleCheckbox = document.querySelector<HTMLInputElement>(`input[name="${sprinkle.name}"]`);
            let sprinkleNumber = sprinkleCheckbox?.nextElementSibling as HTMLInputElement;

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
}