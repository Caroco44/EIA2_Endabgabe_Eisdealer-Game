namespace L09_Ententeich {
  export class BabyDuck extends Moveable {

    constructor(_positionX: number, _positionY: number, _color: string) {
      super(_positionX, _positionY, _color)
    }

    public move(): void {
      //this.positionX -= 2
      this.positionX = this.positionX - 2;
  
      if (this.positionX < 580) this.positionX = 580;

      this.draw();
    }

    public changeColor(): void {
      if (this.color == "lightblue") {
        this.color = "red"
      } else {
        this.color = "lightblue"
      }
    }

    public draw(): void {
      crc2.save();
      crc2.beginPath();
      crc2.translate(this.positionX, this.positionY);
      crc2.scale(0.5, 0.5);

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