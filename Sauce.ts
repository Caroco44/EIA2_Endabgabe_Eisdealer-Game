namespace Endabgabe_Eisdealer {
  export class Sauce extends Food {

    constructor(_positionX: number, _positionY: number, _color: string) {
      super(_positionX, _positionY, _color)
    }


    // public draw(): void {
    //   crc2.save();
    //   crc2.beginPath();
    //   crc2.translate(this.positionX, this.positionY);

    //   crc2.fillStyle = this.color;
    //   crc2.arc(10, 10, 20, 0, 2 * Math.PI)
    //   crc2.fill();

    //   crc2.ellipse(35, 35, 40, 20, 0, 0, 2 * Math.PI);
    //   crc2.fill();

    //   crc2.closePath();
    //   crc2.restore();
    // }
  }
}