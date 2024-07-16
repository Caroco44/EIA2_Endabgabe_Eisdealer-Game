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

      crc2.fillStyle = "rgb(125,58,37)";

      crc2.fillRect(0, 0, 150, 70);
      crc2.restore();
    }

    public reset(): void {
      this.state = "free";
    }
  }
}

