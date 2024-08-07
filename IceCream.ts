namespace Endabgabe_Eisdealer {
  export class IceCream extends Sortiment {

    constructor(_positionX: number, _positionY: number, _color: string) {
      super(_positionX, _positionY, _color)
      this.draw();
    }


    public draw(): void {
      crc2.save();
      crc2.beginPath();
      crc2.translate(this.positionX, this.positionY);

      crc2.fillStyle = this.color;
      crc2.arc(10, 10, 30, 0, 2 * Math.PI)
      crc2.fill();

      crc2.closePath();
      crc2.restore();
    }
  }
}