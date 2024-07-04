namespace Endabgabe_Eisdealer {
  export class Cone {
    public positionX: number;
    public positionY: number;

    constructor(_positionX: number, _positionY: number) {
      this.positionX = _positionX;
      this.positionY = _positionY;
    }

    public move(): void {

      this.draw();
    }

    public draw(): void {
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

  }
}