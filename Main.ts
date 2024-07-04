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
    let updatedItems: Sortiment[] = []; // Use Sortiment type array to hold all items

    for (let iceCream of data.IceCream) {
        let iceCreamCheckbox = document.querySelector<HTMLInputElement>(`input[name="${iceCream.name}"]`);
        let iceCreamNumber = iceCreamCheckbox?.nextElementSibling as HTMLInputElement;

        if (iceCreamCheckbox?.checked) {
            let quantity = parseInt(iceCreamNumber.value) || 0;
            for (let i = 0; i < quantity; i++) {
                updatedItems.push(new IceCream(900, 140, iceCream.color));
            }
        }
    }

    // Merge updated items into sortiment
    sortiment = [...sortiment.filter(item => !(item instanceof IceCream)), ...updatedItems];
}

export function updateSauceDrawing() {
    let updatedItems: Sortiment[] = []; // Use Sortiment type array to hold all items

    for (let sauce of data.Sauce) {
        let sauceCheckbox = document.querySelector<HTMLInputElement>(`input[name="${sauce.name}"]`);
        let sauceNumber = sauceCheckbox?.nextElementSibling as HTMLInputElement;

        if (sauceCheckbox?.checked) {
            let quantity = parseInt(sauceNumber.value) || 0;
            for (let i = 0; i < quantity; i++) {
                updatedItems.push(new Sauce(900, 100, sauce.color));
            }
        }
    }

    // Merge updated items into sortiment
    sortiment = [...sortiment.filter(item => !(item instanceof Sauce)), ...updatedItems];
}

export function updateSprinkleDrawing() {
    let updatedItems: Sortiment[] = []; // Use Sortiment type array to hold all items

    for (let sprinkle of data.Sprinkles) {
        let sprinkleCheckbox = document.querySelector<HTMLInputElement>(`input[name="${sprinkle.name}"]`);
        let sprinkleNumber = sprinkleCheckbox?.nextElementSibling as HTMLInputElement;

        if (sprinkleCheckbox?.checked) {
            let quantity = parseInt(sprinkleNumber.value) || 0;
            for (let i = 0; i < quantity; i++) {
                updatedItems.push(new Sprinkles(900, 100, sprinkle.color));
            }
        }
    }

    // Merge updated items into sortiment
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