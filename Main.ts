namespace Endabgabe_Eisdealer {

  window.addEventListener("load", handleLoad);
  export let crc2: CanvasRenderingContext2D;

  let imgData: ImageData;

  // Arrays
  export let sortiment: Sortiment[] = [];
  let customers: Customer[] = [];
  let tables: Table[] = [];


  function handleLoad(_event: Event): void {
    let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if (!canvas)
      return;
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawBackground();

    imgData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);

    customers.push(new Customer(200, 400, "green"));
    sortiment.push(new Cone(900, 270, "brown"));

    tables.push(new Table(400, 80));
    tables.push(new Table(600, 200));
    tables.push(new Table(400, 320));
    tables.push(new Table(600, 440));

    window.addEventListener("keydown", changeMood);
    canvas.addEventListener("pointerdown", tableClicked);
    // canvas.addEventListener("pointerdown", checkOrder);

    createData();

    document.querySelectorAll("input[type='checkbox'], input[type='number']").forEach(input => {
      input.addEventListener("change", calculatePrice);
    });

    setInterval(createCustomer, 5000);
    displayCustomerOrder();

    window.setInterval(function (): void {
      animation();
    }, 24)
  }


  // Draw Background
  function drawBackground(): void {

    let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
    gradient.addColorStop(0, "lightblue");
    gradient.addColorStop(1, "lightpink");

    crc2.fillStyle = gradient;
    crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
  }

  // Change Mood
  function changeMood(_event: KeyboardEvent): void {
    if (_event.code == "Space") {
      for (let customer of customers) {
        customer.changeMood();
      }
    }
  }

  // Table is Clicked
  function tableClicked(_event: PointerEvent) {
    let clickX: number = _event.clientX;
    let clickY: number = _event.clientY;

    for (let table of tables) {
      if (table instanceof Table && table.state == "free") {
        // Check if the click is within the bounds of the table
        if (table.positionX < clickX && clickX < table.positionX + 150 && table.positionY < clickY && clickY < table.positionY + 70) {
          for (let customer of customers) {
            if (customer.state == "waiting") {
              customer.state = "coming";
              customer.targetPositionX = table.positionX;
              customer.targetPositionY = table.positionY;
              table.state = "occupied";
              break;
            }
          }
        }
      }
    }
  }


  // Create a new Customer
  function createCustomer(): void {
    if (customers.length < 7) {
      // Define the range for random positions
      let minX = 50;
      let maxX = 300;
      let minY = 400;
      let maxY = 500;

      // Generate random positions within the defined range
      let x = Math.random() * (maxX - minX) + minX;
      let y = Math.random() * (maxY - minY) + minY;
      customers.push(new Customer(x, y, "green"));
    }
  }

  // Animation
  function animation(): void {
    drawBackground();
    crc2.putImageData(imgData, 0, 0);

    for (let food of sortiment) {
      food.draw();
    }

    for (let customer of customers) {
      customer.move();
    }

    for (let table of tables) {
      table.draw();
    }
  }



  export function calculatePrice() {
    let totalPrice: number = 0;

    // Calculate the price for IceCream
    for (let iceCream of data.IceCream) {
      let iceCreamCheckbox = document.querySelector<HTMLInputElement>(`input[name="${iceCream.name}"]`);
      let iceCreamNumber = iceCreamCheckbox?.nextElementSibling as HTMLInputElement;

      if (iceCreamCheckbox?.checked) {
        let quantity = parseInt(iceCreamNumber.value) || 0; // Default to 0 if empty
        totalPrice += iceCream.price * quantity;
      }
    }

    // Calculate the price for Sauce
    for (let sauce of data.Sauce) {
      let sauceCheckbox = document.querySelector<HTMLInputElement>(`input[name="${sauce.name}"]`);
      let sauceNumber = sauceCheckbox?.nextElementSibling as HTMLInputElement;

      if (sauceCheckbox?.checked) {
        let quantity = parseInt(sauceNumber.value) || 0; // Default to 0 if empty
        totalPrice += sauce.price * quantity;
      }
    }

    // Calculate the price for Sprinkles
    for (let sprinkle of data.Sprinkles) {
      let sprinkleCheckbox = document.querySelector<HTMLInputElement>(`input[name="${sprinkle.name}"]`);
      let sprinkleNumber = sprinkleCheckbox?.nextElementSibling as HTMLInputElement;

      if (sprinkleCheckbox?.checked) {
        let quantity = parseInt(sprinkleNumber.value) || 0; // Default to 0 if empty
        totalPrice += sprinkle.price * quantity;
      }
    }

    // Update the total price on the webpage
    let totalPriceElement = document.getElementById("totalPrice");
    if (totalPriceElement) {
      totalPriceElement.textContent = `Total Price: ${totalPrice.toFixed(2)} €`;
    }
  }




  let displayedCustomers = new Set(); // To track customers with displayed orders

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomOrder(data: any) {
    const iceCream = data.IceCream[getRandomInt(0, data.IceCream.length - 1)];
    const sauce = data.Sauce[getRandomInt(0, data.Sauce.length - 1)];
    const sprinkle = data.Sprinkles[getRandomInt(0, data.Sprinkles.length - 1)];

    const iceCreamQty = getRandomInt(1, 3);  // Random quantity between 1 and 3
    const sauceQty = getRandomInt(1, 2);     // Random quantity between 1 and 2
    const sprinkleQty = getRandomInt(1, 2);  // Random quantity between 1 and 2

    return {
      iceCream: { item: iceCream, quantity: iceCreamQty },
      sauce: { item: sauce, quantity: sauceQty },
      sprinkle: { item: sprinkle, quantity: sprinkleQty }
    };
  }




  export function displayCustomerOrder() {
    // Filter customers who are currently ordering
    let orderingCustomers = customers.filter(customer => customer.state == "ordering");

    // Iterate over each ordering customer
    orderingCustomers.forEach(customer => {
      // Check if the order display has already been created for this customer
      if (!displayedCustomers.has(customer.id)) { // Assuming customers have a unique 'id'
        // Create order display only if the customer has a valid position
        if (customer.positionX !== undefined && customer.positionY !== undefined) {

          // Get random order details
          const orderDetails = getRandomOrder(data);

          // Create a new div element with the order details
          let order = document.createElement("div");
          order.classList.add("order-item");

          // Create HTML content for the order
          order.innerHTML = `
            <p>${orderDetails.iceCream.item.name} (x${orderDetails.iceCream.quantity})</p>
            <p>${orderDetails.sauce.item.name} (x${orderDetails.sauce.quantity})</p>
            <p>${orderDetails.sprinkle.item.name} (x${orderDetails.sprinkle.quantity})</p>
          `;

          // Calculate position based on customer's coordinates
          let customerOrderDiv = document.createElement("div");
          customerOrderDiv.classList.add("customerOrder");
          customerOrderDiv.style.position = "absolute";
          customerOrderDiv.style.left = `${customer.positionX - 170}px`;
          customerOrderDiv.style.top = `${customer.positionY}px`;

          // Append the new order div to the customerOrderDiv
          customerOrderDiv.appendChild(order);

          // Add click event listener to the customerOrderDiv
          customerOrderDiv.addEventListener("click", () => {
            checkOrder(); // Call checkOrder when this div is clicked
          });

          // Append the customerOrderDiv to the document body or another appropriate parent element
          document.body.appendChild(customerOrderDiv);

          // Add the customer ID to the set of displayed customers
          displayedCustomers.add(customer.id);
        }
      }
    });
  }

  function checkOrder() {
    console.log("checkOrder was called");
    // for (let customer of customers) {
    //   // customer.state = "eating";
    //   break;
    // }
  }

}