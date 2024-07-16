namespace Endabgabe_Eisdealer {

  export interface Item {
    name: string;
    price: number;
    color: string;
  }

  export interface Data {
    [category: string]: Item[];
  }

  export let data: Data = {
    IceCream: [
      { name: "Strawberry Ice Cream", price: 1, color: "pink" },
      { name: "Chocolate Ice Cream", price: 1, color: "rgb(171,109,71)" },
      { name: "Yoghurt Ice Cream", price: 1, color: "white" },
      { name: "Mochi Ice Cream", price: 1.5, color: "yellow" },
      { name: "Kiwi Ice Cream", price: 1.5, color: "green" },
    ],
    Sauce: [
      { name: "Strawberry Sauce", price: 0.60, color: "pink" },
      { name: "Chocolate Sauce", price: 0.60, color: "rgb(171,109,71)" },
      { name: "Vanilla Sauce", price: 0.50, color: "yellow" },
    ],
    Sprinkles: [
      { name: "Chocolate Sprinkles", price: 0.50, color: "rgb(171,109,71)" },
      { name: "Cookie Sprinkles", price: 0.60, color: "orange" },
      { name: "Blueberry Sprinkles", price: 0.70, color: "blue" },
    ]
  };

}