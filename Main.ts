namespace Endabgabe_Eisdealer {
  // export interface Vector {
  //   x: number;
  //   y: number;
  // }

  window.addEventListener("load", handleLoad);
  export let crc2: CanvasRenderingContext2D;

  let imgData: ImageData;


  // Array of Ice Cream
  let moveables: Food[] = [];


  function handleLoad(_event: Event): void {
    let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if (!canvas)
      return;
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawBackground();

    imgData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);

    moveables.push(new Customer(1000, 420, "yellow"));
    moveables.push(new Customer(1200, 320, "lightblue"));

    window.setInterval(function (): void {
      animation();
    }, 24)
  }

  // Animate the Moveables
  function animation(): void {
    drawBackground();
    crc2.putImageData(imgData, 0, 0);

    for (let moveable of moveables) {
      moveable.move();
    }
  }

  // Draw Background
  function drawBackground(): void {

    let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
    gradient.addColorStop(0, "lightblue");
    gradient.addColorStop(1, "lightpink");

    crc2.fillStyle = gradient;
    crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
  }

}