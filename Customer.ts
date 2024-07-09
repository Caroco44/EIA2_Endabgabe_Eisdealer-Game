namespace Endabgabe_Eisdealer {
  export class Customer {
    public positionX: number;
    public positionY: number;
    public color: string;

    public mood: "happy" | "sad";
    public state: "waiting" | "coming" | "ordering" | "leaving" | "eating";
    public targetPositionX: number | undefined;
    public targetPositionY: number | undefined;

    public id: number; // Unique identifier for each customer
    private static nextId: number = 1; // Static variable to keep track of the next ID

    constructor(_positionX: number, _positionY: number, _color: string) {
      this.positionX = _positionX;
      this.positionY = _positionY;
      this.color = _color;
      this.mood = "happy";
      this.state = "waiting";
      this.targetPositionX = undefined;
      this.targetPositionY = undefined;

      this.id = Customer.nextId++; // Assign a unique ID to this customer
    }

    public move(): void {
      if (this.state == "coming" && this.targetPositionX !== undefined && this.targetPositionY !== undefined) {
        // Move towards the target table
        let dx = this.targetPositionX - this.positionX;
        let dy = this.targetPositionY - this.positionY;
        let distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance > 1) {
          this.positionX += dx / distance * 2;
          this.positionY += dy / distance * 2;
        } else {
          this.order();
        }
      } else if (this.state == "eating") {
        // Move towards the Cone
        let conePositionX = 900; // Adjust according to your Cone's position
        let conePositionY = 270; // Adjust according to your Cone's position
    
        let dx = conePositionX - this.positionX;
        let dy = conePositionY - this.positionY;
        let distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance > 1) {
          this.positionX += dx / distance * 2;
          this.positionY += dy / distance * 2;
        } else {
          // Perform actions when customer reaches the Cone
          console.log("Customer reached the Cone.");
    
          // Change state to "leaving" or perform further actions
          this.state = "leaving";
        }
      } else if (this.state == "leaving") {
        // Move towards position (0, 0)
        let dx = 0 - this.positionX;
        let dy = 0 - this.positionY;
        let distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance > 1) {
          this.positionX += dx / distance * 2;
          this.positionY += dy / distance * 2;
        } else {
          // Once the customer reaches (0, 0), you might want to reset or perform additional actions
          console.log("Customer reached (0, 0).");
    
          // Example: Reset the customer or remove them from the scene
          // Resetting position for reuse (assuming it's necessary)
          this.positionX = 0;
          this.positionY = 0;
    
        
        }
      }
    
      this.draw(); // Draw the customer at its current position
    }



    public order(): void {
      this.state = "ordering";
      console.log("I want to order now");

      displayCustomerOrder();
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