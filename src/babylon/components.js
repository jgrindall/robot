export class Collisionable {
  reset(){
  }
}
export class Collider {
  reset(){
  }
}
export class Recovering {
  reset(){
  }
}
export class Moving {
  reset(){
  }
}

export class PulsatingScale {
  constructor() {
    this.offset = 0;
  }
  reset(){
    this.offset = 0;
  }
}

export class Object3D {
  constructor() {
    this.object = null;
  }
  reset(){
    this.object = null;
  }
}

export class Timeout {
  constructor() {
    this.timer = 0;
    this.addComponents = [];
    this.removeComponents = [];
  }
}

export class Colliding {
  constructor() {
    this.value = false;
  }
  reset(){
    this.value = false;
  }
}

export class Rotating {
  constructor() {
    this.enabled = true;
    this.rotatingSpeed = 0;
    this.decreasingSpeed = 0.001;
  }
  reset(){
    this.enabled = false;
    this.rotatingSpeed = 0;
    this.decreasingSpeed = 0;
  }
}
