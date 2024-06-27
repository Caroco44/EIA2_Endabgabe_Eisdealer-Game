namespace Endabgabe_Eisdealer {

export abstract class Food {

  public positionX: number;
  public positionY: number;
  protected color: string;

  constructor(_positionX: number, _positionY: number, _color: string) {
    this.positionX = _positionX;
    this.positionY = _positionY;
    this.color = _color;

    this.draw();
  }

  public move(): void {}


  public draw(): void {}

}

}

