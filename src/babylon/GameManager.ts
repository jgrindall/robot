import GameEntityMaker from './GameEntityMaker';
import GameEntity from './GameEntity';
import _ from 'underscore';

class GameManager {
    private _entityMaker:GameEntityMaker
    private _entities = []

    constructor(entityMaker:GameEntityMaker) {
      this._entityMaker = entityMaker;
    }
    addUsing(fn, defn){
      const e = fn(defn);
      this._entities.push(e);
      return e;
    }
    addPig(defn){
      return this.addUsing(this._entityMaker.makePig.bind(this._entityMaker), defn);
    }
    addBlob(defn:string):GameEntity{
      return this.addUsing(this._entityMaker.makeBlob.bind(this._entityMaker), defn);
    }
    addBox(i){
      return this.addUsing(this._entityMaker.makeBox.bind(this._entityMaker), i);
    }
    addGround(){
      return this.addUsing(this._entityMaker.makeGround.bind(this._entityMaker));
    }
    destroyAll(){
      while(this._entities.length >= 1){
        const en = this._entities.pop();
        en.remove();
      }
    }
}

export default GameManager;
