namespace Endabgabe_Eisdealer {

  export interface Item {
    name: string;
    price: number;
  }

  export interface Data {
    [category: string]: Item[];
  }

  export let data: Data = {
    IceCream: [
      { name: "Strawberry", price: 1 },
      { name: "Chocolate", price: 1 },
      { name: "Yoghurt", price: 1 },
      { name: "Mochi", price: 1.5 },
      { name: "Kiwi", price: 1.5 },
    ],
    Sauce: [
      { name: "StrawberrySauce", price: 0.60 },
      { name: "ChocolateSauce", price: 0.60 },
      { name: "VanillaSauce", price: 0.50 },
    ],
    Sprinkles: [
      { name: "ChocolateSprinkles", price: 0.50 },
      { name: "CookieSprinkles", price: 0.60 },
      { name: "BlueberrySprinkles", price: 0.70 },
    ]
  };

  export function createData() {
    for (let category in data) {
      // console.log(category);
      let items: Item[] = data[category];

      switch (category) {
        case "IceCream":
          for (let iceCream of items) {
            // console.log(`IceCream: ${iceCream.name}, Price: ${iceCream.price}`);
            createIceCreamData(iceCream);
          }
          break;

        case "Sauce":
          for (let sauce of items) {
            // console.log(`Sauce: ${sauce.name}, Price: ${sauce.price}`);
            createSauceData();
          }
          break;

        case "Sprinkles":
          for (let sprinkle of items) {
            // console.log(`Sprinkles: ${sprinkle.name}, Price: ${sprinkle.price}`);
            createSprinklesData();
          }
          break;

        default:
          break;
      }
    }
  }

  function createIceCreamData(iceCream: Item) {
    // Variablen für die Elemente, Bestimmen des Attributes
    let IceCreamCheckbox = document.createElement("input");
    IceCreamCheckbox.setAttribute("type", "checkbox")

    let IceCreamNumber = document.createElement("input");
    IceCreamNumber.setAttribute("type", "number")
    
    let IceCreamLabel = document.createElement("label");

    // Write Text
    let text = document.createElement("p");
    IceCreamLabel.appendChild(text)
    text.innerHTML = iceCream.name;

    IceCreamLabel.appendChild(IceCreamCheckbox)
    IceCreamLabel.appendChild(IceCreamNumber)

    document.getElementById("FieldsetIceCream")?.appendChild(IceCreamLabel)

  

    IceCreamCheckbox.name = iceCream.name
  }

  function createSauceData() {

  }

  function createSprinklesData() {

  }

}