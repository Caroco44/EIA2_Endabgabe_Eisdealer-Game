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
  
      // Draw the face
      crc2.translate(this.positionX, this.positionY);
      crc2.fillStyle = this.color;
      crc2.arc(0, 0, 50, 0, 2 * Math.PI);
      crc2.fill();
      crc2.closePath();

  
      // Draw the pupils
      crc2.beginPath();
      crc2.fillStyle = 'black';
      crc2.arc(-25, -10, 5, 0, 2 * Math.PI);
      crc2.fill();
      crc2.closePath();
      crc2.beginPath();
      crc2.arc(20, -15, 5, 0, 2 * Math.PI);
      crc2.fill();
      crc2.closePath();
  
      // Draw the mouth
      crc2.beginPath();
      crc2.strokeStyle = 'black';
      crc2.lineWidth = 5;
      crc2.arc(0, 0, 8, 0, Math.PI, false);
      crc2.stroke();
      crc2.closePath();
  
      crc2.restore();
  }


  // Change Mood
  public changeMood(): void {
    crc2.save();
    crc2.beginPath();

    // Draw the face
    crc2.translate(this.positionX, this.positionY);
    crc2.fillStyle = this.color;
    crc2.arc(0, 0, 50, 0, 2 * Math.PI);
    crc2.fill();
    crc2.closePath();


    // Draw the pupils
    crc2.beginPath();
    crc2.fillStyle = 'black';
    crc2.arc(-25, -10, 5, 0, 2 * Math.PI);
    crc2.fill();
    crc2.closePath();
    crc2.beginPath();
    crc2.arc(20, -15, 5, 0, 2 * Math.PI);
    crc2.fill();
    crc2.closePath();

    // Draw the mouth
    crc2.beginPath();
    crc2.strokeStyle = 'black';
    crc2.lineWidth = 5;
    crc2.arc(0, 20, 30, Math.PI, 2 * Math.PI, false);
    crc2.stroke();
    crc2.closePath();

    crc2.restore();
}
  }
}