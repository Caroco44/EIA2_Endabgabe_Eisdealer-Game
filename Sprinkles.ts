namespace Endabgabe_Eisdealer {
  export class Sprinkles extends Sortiment {

    constructor(_positionX: number, _positionY: number, _color: string) {
      super(_positionX, _positionY, _color)
    }

    public move() {

      this.draw();
    }

    public draw(): void {
      crc2.save();
      crc2.beginPath();
      crc2.translate(this.positionX, this.positionY);

      crc2.fillStyle = "red";
      crc2.fillRect(0, 0, 10, 20);
      crc2.fill();

      crc2.closePath();
      crc2.restore();
    }
  }
}