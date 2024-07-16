namespace Endabgabe_Eisdealer {

  // CREATE DATA
  export function createData() {
    for (let category in data) {

      let items: Item[] = data[category];

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


  // CREATE ICE CREAM LIST
  export function createIceCreamList(_iceCream: Item) {
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
    });
    IceCreamNumber.addEventListener('input', () => {
      updateIceCream();
    });
  }



  // CREATE SAUCE LIST
  export function createSauceList(_sauce: Item) {
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
    });
    SauceNumber.addEventListener('input', () => {
      updateSauce();
    });
  }



  // CREATE SPRINKLES LIST
  export function createSprinklesList(_sprinkle: Item) {
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
    });
    SprinkleNumber.addEventListener('input', () => {
      updateSprinkle();
    });
  }



  // UPDATE ICE CREAM
  export function updateIceCream(): void {
    let updatedItems: Sortiment[] = [];

    // Map, um existierende Eiskugeln nach Farbe zu gruppieren
    let existingIceCreamsByColor: Map<string, IceCream[]> = new Map();

    // Füllen der Map mit existierenden Eiskugeln
    sortiment.forEach(item => {
      if (item instanceof IceCream) {
        if (!existingIceCreamsByColor.has(item.color)) {
          existingIceCreamsByColor.set(item.color, []);
        }
        existingIceCreamsByColor.get(item.color)!.push(item);
      }
    });

    // Verarbeiten von jedem IceCream aus den Daten
    data.IceCream.forEach(iceCream => {
      let iceCreamCheckbox = document.querySelector<HTMLInputElement>(`input[name="${iceCream.name}"]`);
      let iceCreamNumber = iceCreamCheckbox?.nextElementSibling as HTMLInputElement;

      let quantity = iceCreamCheckbox?.checked ? parseInt(iceCreamNumber?.value) || 0 : 0;
      let existingIceCreams = existingIceCreamsByColor.get(iceCream.color) || [];

      // Berechnen der Differenz zur gewünschten Menge
      let newCount = Math.max(0, quantity - existingIceCreams.length);

      // Hinzufügen neuer Eiskugeln
      for (let i = 0; i < newCount; i++) {
        let randomX = Math.random() * 90 + 850;
        let randomY = Math.random() * 20 + 110;
        existingIceCreams.push(new IceCream(randomX, randomY, iceCream.color));
      }

      // Beschränken auf die gewünschte Menge
      updatedItems.push(...existingIceCreams.slice(0, quantity));
    });

    // Aktualisieren des Sortiments mit den neuen Eiskugeln
    sortiment = [...sortiment.filter(item => !(item instanceof IceCream)), ...updatedItems];
  }



  // UPDATE SAUCE
  export function updateSauce(): void {
    let updatedItems: Sortiment[] = []; // Array für die aktualisierten Elemente

    // Map, um existierende Eiskugeln nach Farbe zu gruppieren
    let existingSaucesByColor: Map<string, Sauce[]> = new Map();

    // Füllen der Map mit existierenden Eiskugeln
    sortiment.forEach(item => {
      if (item instanceof Sauce) {
        if (!existingSaucesByColor.has(item.color)) {
          existingSaucesByColor.set(item.color, []);
        }
        existingSaucesByColor.get(item.color)!.push(item);
      }
    });

    // Verarbeiten von jedem IceCream aus den Daten
    data.Sauce.forEach(sauce => {
      let sauceCheckbox = document.querySelector<HTMLInputElement>(`input[name="${sauce.name}"]`);
      let sauceNumber = sauceCheckbox?.nextElementSibling as HTMLInputElement;

      let quantity = sauceCheckbox?.checked ? parseInt(sauceNumber?.value) || 0 : 0;
      let existingSauces = existingSaucesByColor.get(sauce.color) || [];

      // Berechnen der Differenz zur gewünschten Menge
      let newCount = Math.max(0, quantity - existingSauces.length);

      // Hinzufügen neuer Eiskugeln
      for (let i = 0; i < newCount; i++) {
        let randomX = Math.random() * 90 + 850;
        let randomY = Math.random() * 20 + 110;
        existingSauces.push(new Sauce(randomX, randomY, sauce.color));
      }

      // Beschränken auf die gewünschte Menge
      updatedItems.push(...existingSauces.slice(0, quantity));
    });

    // Aktualisieren des Sortiments mit den neuen Eiskugeln
    sortiment = [...sortiment.filter(item => !(item instanceof Sauce)), ...updatedItems];
  }



  // UPDATE SPRINKLES
  export function updateSprinkle(): void {
    let updatedItems: Sortiment[] = []; // Array für die aktualisierten Elemente

    // Map, um existierende Eiskugeln nach Farbe zu gruppieren
    let existingSprinklesByColor: Map<string, Sauce[]> = new Map();

    // Füllen der Map mit existierenden Eiskugeln
    sortiment.forEach(item => {
      if (item instanceof Sprinkles) {
        if (!existingSprinklesByColor.has(item.color)) {
          existingSprinklesByColor.set(item.color, []);
        }
        existingSprinklesByColor.get(item.color)!.push(item);
      }
    });

    // Verarbeiten von jedem IceCream aus den Daten
    data.Sprinkles.forEach(sprinkles => {
      let sprinkleCheckbox = document.querySelector<HTMLInputElement>(`input[name="${sprinkles.name}"]`);
      let sprinkleNumber = sprinkleCheckbox?.nextElementSibling as HTMLInputElement;

      let quantity = sprinkleCheckbox?.checked ? parseInt(sprinkleNumber?.value) || 0 : 0;
      let existingSprinkles = existingSprinklesByColor.get(sprinkles.color) || [];

      // Berechnen der Differenz zur gewünschten Menge
      let newCount = Math.max(0, quantity - existingSprinkles.length);

      // Hinzufügen neuer Eiskugeln
      for (let i = 0; i < newCount; i++) {
        let randomX = Math.random() * 90 + 850;
        let randomY = Math.random() * 20 + 110;
        existingSprinkles.push(new Sprinkles(randomX, randomY, sprinkles.color));
      }

      // Beschränken auf die gewünschte Menge
      updatedItems.push(...existingSprinkles.slice(0, quantity));
    });

    // Aktualisieren des Sortiments mit den neuen Eiskugeln
    sortiment = [...sortiment.filter(item => !(item instanceof Sprinkles)), ...updatedItems];
  }










}