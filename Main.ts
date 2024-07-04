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


  function handleLoad(_event: Event): void {
    let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if (!canvas)
      return;
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawBackground();

    imgData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);


    sortiment.push(new IceCream(920, 140, "yellow"));
    sortiment.push(new Sauce(900, 140, "purple"));
    sortiment.push(new Sprinkles(880, 140, "red"));

    customers.push(new Customer(200, 400, "green"));

    tables.push(new Table(400, 80));
    tables.push(new Table(600, 200));
    tables.push(new Table(400, 320));
    tables.push(new Table(600, 440));

    window.addEventListener("keydown", changeMood);
    canvas.addEventListener("pointerdown", tableClicked);

    createData();

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

    // Draw Ice Cream Cone
    crc2.save();
    crc2.beginPath();

    crc2.translate(900, 270);

    crc2.moveTo(0, 0);
    crc2.lineTo(-50, -100);
    crc2.lineTo(50, -100);
    crc2.closePath();

    crc2.fillStyle = "brown";
    crc2.fill();

    crc2.restore();

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

      //Generate random positions within the defined range
      let x = Math.random() * (maxX - minX) + minX;
      let y = Math.random() * (maxY - minY) + minY;
      customers.push(new Customer(x, y, "green"));
    }
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
  }

}