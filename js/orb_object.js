
class OrbObject {
  constructor(params) {
    this.pos = params.pos;
    this.color = params.color;
    this.img = params.img;
    this.dragging = false;
  }

  remove() {
    this.game.remove(this);
  }
}

module.exports = OrbObject;
