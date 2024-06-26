namespace L09_Ententeich {
  export class Insect extends Moveable{

    constructor(_positionX: number, _positionY: number, _color: string) {
      super(_positionX, _positionY, _color)
    }

    public move() {
      const movementRange = 2;
  
      let randomX = (Math.random() - 0.5) * movementRange;
      let randomY = (Math.random() - 0.5) * movementRange;
  
      this.positionX += randomX;
      this.positionY += randomY;
  
      this.draw();
    }

    public draw(): void {
      crc2.save();
      crc2.beginPath();
      crc2.translate(this.positionX, this.positionY);

      crc2.fillStyle = this.color;

      crc2.ellipse(35, 35, 10, 5, 0, 0, 2 * Math.PI);
      crc2.fill();

      crc2.closePath();
      crc2.restore();
    }
  }
}