namespace Endabgabe_Eisdealer {
  export class Customer {

    public positionX: number;
    public positionY: number;
    public color: string;

    constructor(_positionX: number, _positionY: number, _color: string) {
      this.positionX = _positionX;
      this.positionY = _positionY;
      this.color = _color;
    }

    public move(): void {
      //this.positionX -= 2
      this.positionX = this.positionX - 2;

      if (this.positionX < 580) this.positionX = 580;

      this.draw();
    }


    public draw(): void {
      crc2.save();
      crc2.beginPath();
      crc2.translate(this.positionX, this.positionY);

      crc2.fillStyle = this.color;
      crc2.arc(10, 10, 20, 0, 2 * Math.PI)
      crc2.fill();

      crc2.ellipse(35, 35, 40, 20, 0, 0, 2 * Math.PI);
      crc2.fill();

      crc2.closePath();
      crc2.restore();
    }
  }
}