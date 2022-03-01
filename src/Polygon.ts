import Shape, { ShapeAttrs } from './Shape';

export interface PolygonAttrs extends ShapeAttrs {
  radius: number;
  sides: number;
  anticlockwise?: boolean;
}

export default class Polygon extends Shape<PolygonAttrs> {
  type = 'polygon';
  /**
   * Creates an instance of Polygon shape.
   * @param {PolygonAttrs} attrs
   * @memberof Polygon
   */
  constructor(attrs: PolygonAttrs) {
    super(attrs);
  }
  private makePolygonPath = () => {
    const { sides } = this.attrs();
    this.path = new Path2D();
    for (let index = 0; index < sides; index++) {
      const angle = ((Math.PI * 2) / sides) * index;
      const point = this._getPolygonPoint(angle);
      this.path.lineTo(...point);
    }
    this.path.closePath();
  };
  private _getPolygonPoint = (angle: number): [number, number] => {
    const { radius, sides, x, y } = this.attrs();
    const px = Math.sin(angle) * radius + x;
    const py = y - Math.cos(angle) * radius;
    return [px, py];
  };
  render(ctx: CanvasRenderingContext2D) {
    const { strokeStyle, fillStyle } = this.attrs();
    this.makePolygonPath();
    if (!this.path) return;
    if (strokeStyle) {
      ctx.stroke(this.path);
    }
    if (fillStyle) {
      ctx.fill(this.path);
    }
  }
  renderHit(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    if (!this.path) return
    ctx.fill(this.path)
  }
}
