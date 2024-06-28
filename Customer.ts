namespace Endabgabe_Eisdealer {
  export class Customer {

    public positionX: number;
    public positionY: number;
    public color: string;

    public mood: "happy" | "sad";
    public state: "waiting" | "coming" | "leaving";

    constructor(_positionX: number, _positionY: number, _color: string) {
      this.positionX = _positionX;
      this.positionY = _positionY;
      this.color = _color;
      this.mood = "happy";
      this.state = "waiting";
    }

    public move(): void {

      if (this.state == "waiting") {
        // move to certain area and wait
        // this.positionX = 100 + Math.random() * (500 - 100);
        // this.positionY = 900 + Math.random() * (1000 - 900);
      } else if (this.state == "coming") {
        // move to free table
      } else if (this.state == "leaving") {
        // leave the screen and switch back to waiting
      }

      this.draw();
    }

    public draw(): void {
      crc2.save();
      crc2.beginPath();

      // Draw the face
      crc2.translate(this.positionX, this.positionY);

      if (this.mood == "happy") {
        crc2.fillStyle = this.color;
      } else if (this.mood == "sad") {
        crc2.fillStyle = "red";
      }

      crc2.arc(0, 0, 40, 0, 2 * Math.PI);
      crc2.fill();
      crc2.closePath();

      // Draw the pupils
      crc2.beginPath();
      crc2.fillStyle = 'black';
      crc2.arc(-20, -10, 4, 0, 2 * Math.PI);
      crc2.fill();
      crc2.closePath();
      crc2.beginPath();
      crc2.arc(15, -15, 4, 0, 2 * Math.PI);
      crc2.fill();
      crc2.closePath();

      // Draw the mouth based on mood
      crc2.beginPath();
      crc2.strokeStyle = 'black';
      crc2.lineWidth = 5;

      if (this.mood == "happy") {
        crc2.arc(0, 0, 8, 0, Math.PI, false);
      } else if (this.mood == "sad") {
        crc2.arc(0, 8, 8, Math.PI, 2 * Math.PI, false);
      }

      crc2.stroke();
      crc2.closePath();

      crc2.restore();
    }

    // Toggle between moods
    public changeMood(): void {
      if (this.mood == "happy") {
        this.mood = "sad";
      } else {
        this.mood = "happy";
      }
    }
  }
}