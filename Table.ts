namespace Endabgabe_Eisdealer {
  export class Table {

    public positionX: number;
    public positionY: number;

    constructor(_positionX: number, _positionY: number) {
      this.positionX = _positionX;
      this.positionY = _positionY;
    }


    public draw(): void {
      crc2.save();
      crc2.beginPath();
  
      crc2.save();
      crc2.translate(this.positionX, this.positionY);
      crc2.fillStyle = "brown";
      crc2.fillRect(0, 0, 150, 70);
      crc2.restore();
  }
  }
}