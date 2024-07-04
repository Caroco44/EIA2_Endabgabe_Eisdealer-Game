namespace Endabgabe_Eisdealer {

  export abstract class Sortiment {

    public positionX: number;
    public positionY: number;
    public color: string;

    // zusätzliche Eigenschaften
    // public state: string;
    // public price: number;
    // public name: string;

    constructor(_positionX: number, _positionY: number, _color: string) {
      this.positionX = _positionX;
      this.positionY = _positionY;
      this.color = _color;

      this.draw();
    }

    public move(): void { }


    public draw(): void { }

  }

}

