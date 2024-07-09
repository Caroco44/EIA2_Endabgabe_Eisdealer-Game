namespace Endabgabe_Eisdealer {
  export class Table {
    public positionX: number;
    public positionY: number;
    public state: "free" | "occupied";

    constructor(_positionX: number, _positionY: number) {
      this.positionX = _positionX;
      this.positionY = _positionY;
      this.state = "free";
    }

    public draw(): void {
      crc2.save();
      crc2.beginPath();
      crc2.translate(this.positionX, this.positionY);

      if (this.state == "free") {
        crc2.fillStyle = "brown";
      } else if (this.state == "occupied") {
        crc2.fillStyle = "purple";
      }
      
      crc2.fillRect(0, 0, 150, 70);
      crc2.restore();
    }

    public reset(): void {
      this.state = "free";
    }
  }
}

