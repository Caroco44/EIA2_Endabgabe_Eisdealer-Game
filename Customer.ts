namespace Endabgabe_Eisdealer {
  export class Customer {
    public positionX: number;
    public positionY: number;
    public color: string;
    public mood: "happy" | "sad";
    public state: "waiting" | "coming" | "ordering" | "leaving" | "eating";
    public targetPositionX: number | undefined;
    public targetPositionY: number | undefined;
    public id: number;

    private static nextId: number = 1;
    private orderStartTime: number | undefined;

    constructor(_positionX: number, _positionY: number, _color: string) {
      this.positionX = _positionX;
      this.positionY = _positionY;
      this.color = _color;
      this.mood = "happy";
      this.state = "waiting";
      this.targetPositionX = undefined;
      this.targetPositionY = undefined;
      this.id = Customer.nextId++;
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
          console.log("Customer reached the Cone.");
          this.state = "leaving";
        }
      } else if (this.state == "leaving") {
        let dx = 0 - this.positionX;
        let dy = 0 - this.positionY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
          this.positionX += dx / distance * 2;
          this.positionY += dy / distance * 2;
        } else {
          console.log("Customer reached (0, 0).");

          // Reset the corresponding table state to "free"
          let table = tables.find(t => t.positionX === this.targetPositionX && t.positionY === this.targetPositionY);
          if (table) {
            table.state = "free"; // Ensure table state is set to "free"
          }

          // Remove the customer from the scene
          removeCustomer(this);
        }
      }

      this.draw(); // Draw the customer at its current position
    }

    public order(): void {
      this.state = "ordering";
      console.log("I want to order now");
      displayCustomerOrder();
      
      // Start the order timer when order() is called
      this.startOrderTimer();
    }

    public startOrderTimer(): void {
  this.orderStartTime = Date.now();

  setTimeout(() => {
    if ((this.state === "ordering" || this.state === "waiting") && this.orderStartTime !== undefined) {
      let currentTime = Date.now();
      let elapsedSeconds = (currentTime - this.orderStartTime) / 1000;

      if (elapsedSeconds > 7) {
        console.log("Customer has been ordering or waiting for more than 7 seconds. Changing mood to 'sad'.");
        this.mood = "sad";
      }
    }
  }, 7000); // 7000 milliseconds = 7 seconds
}

    public draw(): void {
      crc2.save();
      crc2.beginPath();
      crc2.translate(this.positionX, this.positionY);

      if (this.mood == "happy") {
        crc2.fillStyle = this.color;
      } else if (this.mood == "sad") {
        crc2.fillStyle = "red";
      }

      crc2.arc(0, 0, 40, 0, 2 * Math.PI);
      crc2.fill();
      crc2.closePath();

      crc2.beginPath();
      crc2.fillStyle = 'black';
      crc2.arc(-20, -10, 4, 0, 2 * Math.PI);
      crc2.fill();
      crc2.closePath();
      crc2.beginPath();
      crc2.arc(15, -15, 4, 0, 2 * Math.PI);
      crc2.fill();
      crc2.closePath();

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
  }
}