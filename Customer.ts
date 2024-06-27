namespace Endabgabe_Eisdealer {
  export class Customer extends Food {
    public state: string;

    constructor(_positionX: number, _positionY: number, _color: string) {
      super(_positionX, _positionY, _color)
      this.state = "swim";
    }

    public moveSwim(): void {
      if (this.state == "swim") {
      //this.positionX -= 2
      this.positionX = this.positionX - 2;

      if (this.positionX < 580) this.positionX = 580;

      this.draw();
    }
  }

    public moveEat(): void {
      if (this.state == "eat") {
      
      // Ente soll sich auf Brot zubewegen
      console.log("moveEat ausgelöst")

      this.draw();
    }
  }

    public changeColor(): void {
      if (this.color == "purple") {
        this.color = "yellow"
      } else {
        this.color = "purple"
      }
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