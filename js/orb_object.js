
class OrbObject {
  constructor(params) {
    this.pos = options.pos;
  }

  remove() {
    this.game.remove(this);
  }
}

module.exports = OrbObject;
