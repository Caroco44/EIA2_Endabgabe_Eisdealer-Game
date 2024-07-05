namespace Endabgabe_Eisdealer {
  // export interface Vector {
  //   x: number;
  //   y: number;
  // }

  window.addEventListener("load", handleLoad);
  export let crc2: CanvasRenderingContext2D;

  let imgData: ImageData;


  // Arrays
  let sortiment: Sortiment[] = [];
  let customers: Customer[] = [];
  let tables: Table[] = [];
  let cone: Cone[] = [];


  function handleLoad(_event: Event): void {
    let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if (!canvas)
      return;
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawBackground();

    imgData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);

    customers.push(new Customer(200, 400, "green"));
    cone.push(new Cone(900, 270));

    tables.push(new Table(400, 80));
    tables.push(new Table(600, 200));
    tables.push(new Table(400, 320));
    tables.push(new Table(600, 440));

    window.addEventListener("keydown", changeMood);
    canvas.addEventListener("pointerdown", tableClicked);

    createData();
    document.querySelectorAll("input[type='checkbox'], input[type='number']").forEach(input => {
      input.addEventListener("change", calculatePrice);
    });

    setInterval(createCustomer, 5000);


    window.setInterval(function (): void {
      animation();
    }, 24)
  }


  // Draw Background
  function drawBackground(): void {

    let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
    gradient.addColorStop(0, "lightblue");
    gradient.addColorStop(1, "lightpink");

    crc2.fillStyle = gradient;
    crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
  }

  // Change Mood
  function changeMood(_event: KeyboardEvent): void {
    if (_event.code == "Space") {
      for (let customer of customers) {
        customer.changeMood();
      }
    }
  }

  // Table is Clicked
  function tableClicked(_event: PointerEvent) {
    let clickX: number = _event.clientX;
    let clickY: number = _event.clientY;

    for (let table of tables) {
      if (table instanceof Table && table.state === "free") {
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
  function createCustomer(): void {
    if (customers.length < 7) {
      // Define the range for random positions
      let minX = 50;
      let maxX = 300;
      let minY = 400;
      let maxY = 500;

      // Generate random positions within the defined range
      let x = Math.random() * (maxX - minX) + minX;
      let y = Math.random() * (maxY - minY) + minY;
      customers.push(new Customer(x, y, "green"));
    }
  }


  

  export function updateIceCreamDrawing() {
    let updatedItems: Sortiment[] = []; // Array für die aktualisierten Elemente

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
        let randomX = Math.random() * 100 + 800; // Zufällige X-Position zwischen 800 und 900
        let randomY = Math.random() * 20 + 100;  // Zufällige Y-Position zwischen 100 und 120
        existingIceCreams.push(new IceCream(randomX, randomY, iceCream.color));
      }

      // Beschränken auf die gewünschte Menge
      updatedItems.push(...existingIceCreams.slice(0, quantity));
    });

    // Aktualisieren des Sortiments mit den neuen Eiskugeln
    sortiment = [...sortiment.filter(item => !(item instanceof IceCream)), ...updatedItems];
  }




  export function updateSauceDrawing() {
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
        let randomX = Math.random() * 100 + 800; // Zufällige X-Position zwischen 800 und 900
        let randomY = Math.random() * 20 + 100;  // Zufällige Y-Position zwischen 100 und 120
        existingSauces.push(new Sauce(randomX, randomY, sauce.color));
      }

      // Beschränken auf die gewünschte Menge
      updatedItems.push(...existingSauces.slice(0, quantity));
    });

    // Aktualisieren des Sortiments mit den neuen Eiskugeln
    sortiment = [...sortiment.filter(item => !(item instanceof Sauce)), ...updatedItems];
  }



  export function updateSprinkleDrawing() {
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
      let sprinklesCheckbox = document.querySelector<HTMLInputElement>(`input[name="${sprinkles.name}"]`);
      let sprinklesNumber = sprinklesCheckbox?.nextElementSibling as HTMLInputElement;

      let quantity = sprinklesCheckbox?.checked ? parseInt(sprinklesNumber?.value) || 0 : 0;
      let existingSprinkles = existingSprinklesByColor.get(sprinkles.color) || [];

      // Berechnen der Differenz zur gewünschten Menge
      let newCount = Math.max(0, quantity - existingSprinkles.length);

      // Hinzufügen neuer Eiskugeln
      for (let i = 0; i < newCount; i++) {
        let randomX = Math.random() * 100 + 800; // Zufällige X-Position zwischen 800 und 900
        let randomY = Math.random() * 20 + 100;  // Zufällige Y-Position zwischen 100 und 120
        existingSprinkles.push(new Sprinkles(randomX, randomY, sprinkles.color));
      }

      // Beschränken auf die gewünschte Menge
      updatedItems.push(...existingSprinkles.slice(0, quantity));
    });

    // Aktualisieren des Sortiments mit den neuen Eiskugeln
    sortiment = [...sortiment.filter(item => !(item instanceof Sprinkles)), ...updatedItems];
  }




  // Animation
  function animation(): void {
    drawBackground();
    crc2.putImageData(imgData, 0, 0);

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

}