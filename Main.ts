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


    sortiment.push(new IceCream(1100, 400, "yellow"));
    sortiment.push(new Sauce(1000, 400, "purple"));
    sortiment.push(new Sprinkles(1050, 400, "red"));

    customers.push(new Customer(200, 400, "green"));

    tables.push(new Table(450, 80));
    tables.push(new Table(750, 200));
    tables.push(new Table(450, 290));
    tables.push(new Table(650, 440));

    window.addEventListener("keydown", changeMood);

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